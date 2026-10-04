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

export default function MergePDFTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputName, setOutputName] = useState('merged-document.pdf');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [totalOriginalSize, setTotalOriginalSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    const pdfs = newFiles.filter((f) => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
    if (pdfs.length === 0) {
      setError('Hanya file format PDF yang didukung.');
      return;
    }
    setError(null);
    setFiles((prev) => [...prev, ...pdfs]);
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

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Silakan pilih minimal 2 file PDF untuk digabungkan.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(10);

      const totalBytes = files.reduce((acc, f) => acc + f.size, 0);
      setTotalOriginalSize(totalBytes);

      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));

        setProgress(Math.round(10 + ((i + 1) / files.length) * 75));
      }

      setProgress(90);
      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResultSize(blob.size);
      setDownloadUrl(url);
      setProgress(100);
      setIsProcessing(false);
    } catch (err: unknown) {
      setIsProcessing(false);
      setError('Gagal menggabungkan PDF. Pastikan file tidak terkunci password atau rusak.');
    }
  };

  const handleReset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFiles([]);
    setDownloadUrl(null);
    setResultSize(null);
    setTotalOriginalSize(null);
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
          retryLabel="Tutup pemberitahuan"
        />
      )}

      {downloadUrl && resultSize !== null ? (
        <SuccessState
          title="Selesai"
          message={`Berhasil menggabungkan ${files.length} file PDF menjadi satu dokumen.`}
          downloadUrl={downloadUrl}
          downloadFilename={outputName.endsWith('.pdf') ? outputName : `${outputName}.pdf`}
          originalSize={totalOriginalSize || undefined}
          resultSize={resultSize}
          onReset={handleReset}
          resetLabel="Gabungkan PDF lain"
        />
      ) : files.length === 0 ? (
        <FileDropzone
          accept="application/pdf"
          title="Drop PDF files here"
          subtitle="or choose files from your computer"
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-4">
          <FileList
            files={files}
            accept="application/pdf"
            onRemove={handleRemove}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onAddMore={handleFilesSelected}
          />
          {isProcessing && (
            <Progress value={progress} label="Menggabungkan dokumen PDF..." />
          )}
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
        label="Nama Berkas Keluaran"
        value={outputName}
        onChange={(e) => setOutputName(e.target.value)}
        placeholder="merged-document.pdf"
      />

      <div className="p-3 bg-subtle rounded border border-border text-xs text-muted space-y-1">
        <p className="font-semibold text-dark">Informasi Penggabungan</p>
        <p>• Urutan file dapat diatur dengan tombol panah naik/turun.</p>
        <p>• Seluruh halaman dari setiap file akan digabungkan berurutan.</p>
        <p>• Diproses langsung di browser (100% aman).</p>
      </div>

      <div className="pt-2">
        <Button
          className="w-full"
          size="lg"
          variant="primary"
          onClick={handleMerge}
          disabled={files.length < 2 || isProcessing || Boolean(downloadUrl)}
          isLoading={isProcessing}
        >
          {files.length < 2 ? 'Pilih minimal 2 file' : 'Merge PDF'}
        </Button>
      </div>
    </div>
  );

  return <ToolWorkspace leftContent={leftContent} rightContent={rightContent} />;
}
