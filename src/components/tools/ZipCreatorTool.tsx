'use client';

import React, { useState } from 'react';
import JSZip from 'jszip';
import FileDropzone from '@/components/ui/FileDropzone';
import FileList from '@/components/ui/FileList';
import ToolWorkspace from '@/components/ui/ToolWorkspace';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { SuccessState, ErrorState } from '@/components/ui/StatusStates';
import Progress from '@/components/ui/Progress';

export default function ZipCreatorTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [zipName, setZipName] = useState('archive.zip');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [totalOriginalSize, setTotalOriginalSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    if (newFiles.length === 0) return;
    setError(null);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreateZip = async () => {
    if (files.length === 0) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(15);

      const totalBytes = files.reduce((acc, f) => acc + f.size, 0);
      setTotalOriginalSize(totalBytes);

      const zip = new JSZip();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        zip.file(file.name, file);
        setProgress(Math.round(15 + ((i + 1) / files.length) * 65));
      }

      setProgress(85);
      const zipBlob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      });

      const url = URL.createObjectURL(zipBlob);
      setResultSize(zipBlob.size);
      setDownloadUrl(url);
      setProgress(100);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
      setError('Gagal membuat arsip ZIP.');
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
          title="Gagal memproses"
          message={error}
          onRetry={() => setError(null)}
          retryLabel="Tutup"
        />
      )}

      {downloadUrl && resultSize !== null ? (
        <SuccessState
          title="Selesai"
          message={`Berhasil mengompresi ${files.length} berkas ke dalam arsip ZIP.`}
          downloadUrl={downloadUrl}
          downloadFilename={zipName.endsWith('.zip') ? zipName : `${zipName}.zip`}
          originalSize={totalOriginalSize || undefined}
          resultSize={resultSize}
          onReset={handleReset}
          resetLabel="Buat arsip lain"
        />
      ) : files.length === 0 ? (
        <FileDropzone
          title="Drop any files here"
          subtitle="or choose files from your computer"
          multiple={true}
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-4">
          <FileList
            files={files}
            allowReorder={false}
            onRemove={handleRemove}
            onAddMore={handleFilesSelected}
          />
          {isProcessing && <Progress value={progress} label="Mengompresi ke format ZIP..." />}
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
        label="Nama File ZIP"
        value={zipName}
        onChange={(e) => setZipName(e.target.value)}
        placeholder="archive.zip"
      />

      <div className="p-3 bg-subtle rounded border border-border text-xs text-muted">
        <p className="font-semibold text-dark">Informasi Kompresi</p>
        <p className="mt-0.5">• Menggunakan algoritma standar Deflate (Level 6).</p>
        <p>• Seluruh berkas diproses secara lokal tanpa batas ukuran cloud.</p>
      </div>

      <div className="pt-2">
        <Button
          className="w-full"
          size="lg"
          variant="primary"
          onClick={handleCreateZip}
          disabled={files.length === 0 || isProcessing || Boolean(downloadUrl)}
          isLoading={isProcessing}
        >
          ZIP Files
        </Button>
      </div>
    </div>
  );

  return <ToolWorkspace leftContent={leftContent} rightContent={rightContent} />;
}
