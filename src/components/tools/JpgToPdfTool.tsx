'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import FileDropzone from '@/components/ui/FileDropzone';
import FileList from '@/components/ui/FileList';
import ToolWorkspace from '@/components/ui/ToolWorkspace';
import Button from '@/components/ui/Button';
import { SuccessState, ErrorState } from '@/components/ui/StatusStates';
import Progress from '@/components/ui/Progress';
import Input from '@/components/ui/Input';

export default function JpgToPdfTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputName, setOutputName] = useState('images-combined.pdf');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    const images = newFiles.filter((f) => f.type.startsWith('image/'));
    if (images.length === 0) {
      setError('Hanya berkas gambar (JPG, PNG, WebP) yang didukung.');
      return;
    }
    setError(null);
    setFiles((prev) => [...prev, ...images]);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    setFiles((prev) => {
      if (index === prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(10);

      const pdfDoc = await PDFDocument.create();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const bytes = await file.arrayBuffer();

        let embeddedImage;
        if (file.type === 'image/png') {
          embeddedImage = await pdfDoc.embedPng(bytes);
        } else {
          // If JPEG or other format, convert via canvas to JPEG bytes if needed
          try {
            embeddedImage = await pdfDoc.embedJpg(bytes);
          } catch {
            // Fallback for WebP or non-standard JPEG: render onto canvas and export to JPEG
            const imgBitmap = await createImageBitmap(new Blob([bytes]));
            const canvas = document.createElement('canvas');
            canvas.width = imgBitmap.width;
            canvas.height = imgBitmap.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(imgBitmap, 0, 0);
            const jpegBlob = await new Promise<Blob | null>((resolve) =>
              canvas.toBlob(resolve, 'image/jpeg', 0.92)
            );
            if (jpegBlob) {
              const jpegBytes = await jpegBlob.arrayBuffer();
              embeddedImage = await pdfDoc.embedJpg(jpegBytes);
            }
          }
        }

        if (embeddedImage) {
          const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
          page.drawImage(embeddedImage, {
            x: 0,
            y: 0,
            width: embeddedImage.width,
            height: embeddedImage.height,
          });
        }

        setProgress(Math.round(10 + ((i + 1) / files.length) * 80));
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResultSize(blob.size);
      setDownloadUrl(url);
      setProgress(100);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
      setError('Gagal mengonversi gambar ke PDF. Silakan coba lagi.');
    }
  };

  const handleReset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFiles([]);
    setDownloadUrl(null);
    setResultSize(null);
    setProgress(0);
    setError(null);
  };

  const leftContent = (
    <div className="space-y-4">
      {error && (
        <ErrorState
          title="Tidak dapat memproses file"
          message={error}
          onRetry={() => setError(null)}
          retryLabel="Tutup"
        />
      )}

      {downloadUrl && resultSize !== null ? (
        <SuccessState
          title="Selesai"
          message={`Berhasil mengubah ${files.length} gambar menjadi berkas PDF.`}
          downloadUrl={downloadUrl}
          downloadFilename={outputName.endsWith('.pdf') ? outputName : `${outputName}.pdf`}
          resultSize={resultSize}
          onReset={handleReset}
          resetLabel="Konversi gambar lain"
        />
      ) : files.length === 0 ? (
        <FileDropzone
          accept="image/*"
          title="Drop image files here"
          subtitle="JPG, PNG, WebP supported"
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-4">
          <FileList
            files={files}
            accept="image/*"
            onRemove={handleRemove}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onAddMore={handleFilesSelected}
          />
          {isProcessing && <Progress value={progress} label="Membuat berkas PDF..." />}
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
        Options
      </h3>

      <Input
        label="Nama File PDF"
        value={outputName}
        onChange={(e) => setOutputName(e.target.value)}
        placeholder="images.pdf"
      />

      <div className="p-3 bg-subtle rounded border border-border text-xs text-muted">
        <p className="font-semibold text-dark">Informasi Tata Letak</p>
        <p className="mt-0.5">• Setiap gambar akan menjadi satu halaman PDF.</p>
        <p>• Dimensi halaman otomatis menyesuaikan rasio asli foto.</p>
      </div>

      <div className="pt-2">
        <Button
          className="w-full"
          size="lg"
          variant="primary"
          onClick={handleConvert}
          disabled={files.length === 0 || isProcessing || Boolean(downloadUrl)}
          isLoading={isProcessing}
        >
          Convert to PDF
        </Button>
      </div>
    </div>
  );

  return <ToolWorkspace leftContent={leftContent} rightContent={rightContent} />;
}
