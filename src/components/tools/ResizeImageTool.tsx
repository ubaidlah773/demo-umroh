'use client';

import React, { useState } from 'react';
import FileDropzone from '@/components/ui/FileDropzone';
import FileList from '@/components/ui/FileList';
import ToolWorkspace from '@/components/ui/ToolWorkspace';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Radio';
import { SuccessState, ErrorState } from '@/components/ui/StatusStates';
import Progress from '@/components/ui/Progress';

export default function ResizeImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [origWidth, setOrigWidth] = useState<number | null>(null);
  const [origHeight, setOrigHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState('90');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (files: File[]) => {
    const selected = files[0];
    if (!selected || !selected.type.startsWith('image/')) {
      setError('Hanya format gambar yang didukung.');
      return;
    }
    setError(null);
    setFile(selected);

    const objectUrl = URL.createObjectURL(selected);
    setPreviewUrl(objectUrl);

    const img = new Image();
    img.onload = () => {
      setOrigWidth(img.naturalWidth);
      setOrigHeight(img.naturalHeight);
      setWidth(String(img.naturalWidth));
      setHeight(String(img.naturalHeight));
    };
    img.src = objectUrl;
  };

  const handleWidthChange = (val: string) => {
    setWidth(val);
    const num = parseInt(val, 10);
    if (maintainAspect && origWidth && origHeight && !isNaN(num) && num > 0) {
      const calculatedH = Math.round((num / origWidth) * origHeight);
      setHeight(String(calculatedH));
    }
  };

  const handleHeightChange = (val: string) => {
    setHeight(val);
    const num = parseInt(val, 10);
    if (maintainAspect && origWidth && origHeight && !isNaN(num) && num > 0) {
      const calculatedW = Math.round((num / origHeight) * origWidth);
      setWidth(String(calculatedW));
    }
  };

  const handleProcess = async () => {
    if (!file || !previewUrl) return;
    const targetW = parseInt(width, 10);
    const targetH = parseInt(height, 10);

    if (isNaN(targetW) || isNaN(targetH) || targetW <= 0 || targetH <= 0) {
      setError('Dimensi lebar dan tinggi harus berupa angka positif.');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(30);

      const img = new Image();
      img.src = previewUrl;
      await new Promise((res) => {
        img.onload = res;
      });

      setProgress(60);
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetW, targetH);

      setProgress(85);
      const qNum = parseInt(quality, 10) / 100;
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, format, qNum));
      if (!blob) throw new Error('Blob generation failed');

      const url = URL.createObjectURL(blob);
      setResultSize(blob.size);
      setDownloadUrl(url);
      setProgress(100);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
      setError('Gagal mengubah ukuran gambar. Coba kurangi dimensi atau ganti format.');
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

  const extMap = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  };

  const leftContent = (
    <div className="space-y-4">
      {error && (
        <ErrorState
          title="Gagal memproses gambar"
          message={error}
          onRetry={() => setError(null)}
          retryLabel="Tutup"
        />
      )}

      {downloadUrl && resultSize !== null && file ? (
        <SuccessState
          title="Selesai"
          message={`Gambar berhasil diubah ke ukuran ${width}×${height}px.`}
          downloadUrl={downloadUrl}
          downloadFilename={`resized-${file.name.replace(/\.[^/.]+$/, '')}.${extMap[format]}`}
          originalSize={file.size}
          resultSize={resultSize}
          onReset={handleReset}
          resetLabel="Ubah ukuran gambar lain"
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
              <span className="text-[11px] text-muted block mb-2">
                Dimensi Asli: {origWidth} × {origHeight} px
              </span>
              <img
                src={previewUrl}
                alt="Original preview"
                className="max-h-72 max-w-full mx-auto object-contain rounded border border-border"
              />
            </div>
          )}
          {isProcessing && <Progress value={progress} label="Mengubah dimensi gambar..." />}
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
        Options
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Width (px)"
          type="number"
          value={width}
          onChange={(e) => handleWidthChange(e.target.value)}
          placeholder="1920"
        />
        <Input
          label="Height (px)"
          type="number"
          value={height}
          onChange={(e) => handleHeightChange(e.target.value)}
          placeholder="1080"
        />
      </div>

      <Checkbox
        label="Maintain aspect ratio"
        checked={maintainAspect}
        onChange={(e) => setMaintainAspect(e.target.checked)}
        description="Kunci proporsi gambar agar tidak gepeng"
      />

      <Select
        label="Format"
        value={format}
        onChange={(e) => setFormat(e.target.value as 'image/jpeg' | 'image/png' | 'image/webp')}
      >
        <option value="image/jpeg">JPEG (.jpg)</option>
        <option value="image/png">PNG (.png)</option>
        <option value="image/webp">WebP (.webp)</option>
      </Select>

      <Input
        label="Quality (%)"
        type="number"
        min={10}
        max={100}
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
        helperText="Rekomendasi: 85 - 95%"
      />

      <div className="pt-2">
        <Button
          className="w-full"
          size="lg"
          variant="primary"
          onClick={handleProcess}
          disabled={!file || isProcessing || Boolean(downloadUrl)}
          isLoading={isProcessing}
        >
          Process image
        </Button>
      </div>
    </div>
  );

  return <ToolWorkspace leftContent={leftContent} rightContent={rightContent} />;
}
