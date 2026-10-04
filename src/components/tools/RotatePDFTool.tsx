'use client';

import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import FileDropzone from '@/components/ui/FileDropzone';
import FileList from '@/components/ui/FileList';
import ToolWorkspace from '@/components/ui/ToolWorkspace';
import Button from '@/components/ui/Button';
import { SuccessState, ErrorState } from '@/components/ui/StatusStates';
import Progress from '@/components/ui/Progress';
import { RadioGroup } from '@/components/ui/Radio';

export default function RotatePDFTool() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<'90' | '180' | '270'>('90');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (files: File[]) => {
    const selected = files[0];
    if (!selected || (!selected.type.includes('pdf') && !selected.name.endsWith('.pdf'))) {
      setError('Hanya format PDF yang didukung.');
      return;
    }
    setError(null);
    setFile(selected);
  };

  const handleRotate = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(20);

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      const rotDeg = parseInt(angle, 10);
      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + rotDeg) % 360));
      });

      setProgress(80);
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResultSize(blob.size);
      setDownloadUrl(url);
      setProgress(100);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
      setError('Gagal memutar PDF. Pastikan file tidak rusak.');
    }
  };

  const handleReset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFile(null);
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

      {downloadUrl && resultSize !== null && file ? (
        <SuccessState
          title="Selesai"
          message={`Seluruh halaman PDF berhasil diputar ${angle}°.`}
          downloadUrl={downloadUrl}
          downloadFilename={`rotated-${file.name}`}
          originalSize={file.size}
          resultSize={resultSize}
          onReset={handleReset}
          resetLabel="Putar file lain"
        />
      ) : !file ? (
        <FileDropzone
          accept="application/pdf"
          title="Drop PDF file here"
          subtitle="or choose a PDF from your computer"
          multiple={false}
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-4">
          <FileList files={[file]} allowReorder={false} onRemove={handleReset} />
          {isProcessing && <Progress value={progress} label="Memutar halaman PDF..." />}
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
        Arah Putaran
      </h3>

      <RadioGroup
        name="angle"
        value={angle}
        onChange={(v) => setAngle(v as '90' | '180' | '270')}
        options={[
          { value: '90', label: '90° Searah Jarum Jam', description: 'Putar ke kanan satu kali.' },
          { value: '180', label: '180° Terbalik', description: 'Putar setengah lingkaran penuh.' },
          { value: '270', label: '90° Berlawanan Jarum Jam', description: 'Putar ke kiri satu kali.' },
        ]}
      />

      <div className="pt-2">
        <Button
          className="w-full"
          size="lg"
          variant="primary"
          onClick={handleRotate}
          disabled={!file || isProcessing || Boolean(downloadUrl)}
          isLoading={isProcessing}
        >
          Rotate PDF
        </Button>
      </div>
    </div>
  );

  return <ToolWorkspace leftContent={leftContent} rightContent={rightContent} />;
}
