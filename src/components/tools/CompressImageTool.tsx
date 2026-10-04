'use client';

import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import FileDropzone from '@/components/ui/FileDropzone';
import FileList from '@/components/ui/FileList';
import ToolWorkspace from '@/components/ui/ToolWorkspace';
import Button from '@/components/ui/Button';
import { SuccessState, ErrorState } from '@/components/ui/StatusStates';
import Progress from '@/components/ui/Progress';
import { RadioGroup } from '@/components/ui/Radio';

export default function CompressImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [level, setLevel] = useState<'recommended' | 'strong' | 'extreme'>('recommended');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (files: File[]) => {
    const selected = files[0];
    if (!selected || !selected.type.startsWith('image/')) {
      setError('Hanya format gambar (JPG, PNG, WebP) yang didukung.');
      return;
    }
    setError(null);
    setFile(selected);
    const prev = URL.createObjectURL(selected);
    setPreviewUrl(prev);
  };

  const handleCompress = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(20);

      // Map level to browser-image-compression options
      const optionsMap = {
        recommended: {
          maxSizeMB: Math.max(0.5, (file.size / (1024 * 1024)) * 0.4),
          maxWidthOrHeight: 2048,
          useWebWorker: true,
          initialQuality: 0.8,
        },
        strong: {
          maxSizeMB: Math.max(0.2, (file.size / (1024 * 1024)) * 0.25),
          maxWidthOrHeight: 1600,
          useWebWorker: true,
          initialQuality: 0.65,
        },
        extreme: {
          maxSizeMB: Math.max(0.1, (file.size / (1024 * 1024)) * 0.15),
          maxWidthOrHeight: 1200,
          useWebWorker: true,
          initialQuality: 0.5,
        },
      };

      const options = {
        ...optionsMap[level],
        onProgress: (p: number) => {
          setProgress(Math.round(p));
        },
      };

      const compressedFile = await imageCompression(file, options);
      const url = URL.createObjectURL(compressedFile);

      setResultSize(compressedFile.size);
      setDownloadUrl(url);
      setProgress(100);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
      setError('Gagal mengompresi gambar. Format mungkin tidak didukung oleh browser.');
    }
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFile(null);
    setPreviewUrl(null);
    setDownloadUrl(null);
    setResultSize(null);
    setProgress(0);
    setError(null);
  };

  const leftContent = (
    <div className="space-y-4">
      {error && (
        <ErrorState
          title="Tidak dapat memproses gambar"
          message={error}
          onRetry={() => setError(null)}
          retryLabel="Tutup"
        />
      )}

      {downloadUrl && resultSize !== null && file ? (
        <SuccessState
          title="Selesai"
          message="Gambar berhasil dikompresi dengan kualitas visual optimal."
          downloadUrl={downloadUrl}
          downloadFilename={`compressed-${file.name}`}
          originalSize={file.size}
          resultSize={resultSize}
          onReset={handleReset}
          resetLabel="Kompres gambar lain"
        />
      ) : !file ? (
        <FileDropzone
          accept="image/*"
          title="Drop image here"
          subtitle="JPG, PNG, WebP supported"
          multiple={false}
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-4">
          <FileList files={[file]} allowReorder={false} onRemove={handleReset} />
          {previewUrl && (
            <div className="border border-border rounded-lg p-3 bg-subtle text-center">
              <span className="text-[11px] text-muted block mb-2">Pratinjau Gambar</span>
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-64 max-w-full mx-auto object-contain rounded border border-border"
              />
            </div>
          )}
          {isProcessing && <Progress value={progress} label="Mengompresi gambar dengan Web Worker..." />}
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
        Compression level
      </h3>

      <RadioGroup
        name="level"
        value={level}
        onChange={(v) => setLevel(v as 'recommended' | 'strong' | 'extreme')}
        options={[
          {
            value: 'recommended',
            label: 'Recommended',
            description: 'Balanced quality and file size (80% quality).',
          },
          {
            value: 'strong',
            label: 'Strong',
            description: 'Smaller file size, ideal for social media and web.',
          },
          {
            value: 'extreme',
            label: 'Extreme',
            description: 'Maximum compression with lower resolution.',
          },
        ]}
      />

      <div className="pt-2">
        <Button
          className="w-full"
          size="lg"
          variant="primary"
          onClick={handleCompress}
          disabled={!file || isProcessing || Boolean(downloadUrl)}
          isLoading={isProcessing}
        >
          Compress Image
        </Button>
      </div>
    </div>
  );

  return <ToolWorkspace leftContent={leftContent} rightContent={rightContent} />;
}
