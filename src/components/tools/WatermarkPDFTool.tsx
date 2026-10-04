'use client';

import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import FileDropzone from '@/components/ui/FileDropzone';
import FileList from '@/components/ui/FileList';
import ToolWorkspace from '@/components/ui/ToolWorkspace';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { SuccessState, ErrorState } from '@/components/ui/StatusStates';
import Progress from '@/components/ui/Progress';

export default function WatermarkPDFTool() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [opacity, setOpacity] = useState('0.3');
  const [fontSize, setFontSize] = useState('48');
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

  const handleAddWatermark = async () => {
    if (!file || !watermarkText.trim()) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(20);

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();

      const fSize = parseInt(fontSize, 10) || 48;
      const op = parseFloat(opacity) || 0.3;

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(watermarkText, fSize);
        const textHeight = font.heightAtSize(fSize);

        page.drawText(watermarkText, {
          x: width / 2 - textWidth / 2,
          y: height / 2 - textHeight / 2,
          size: fSize,
          font,
          color: rgb(0.7, 0.7, 0.7),
          opacity: op,
          rotate: degrees(45),
        });

        setProgress(Math.round(20 + ((i + 1) / pages.length) * 65));
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
      setError('Gagal membubuhkan watermark ke PDF.');
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
          message="Watermark teks berhasil dibubuhkan ke seluruh halaman PDF."
          downloadUrl={downloadUrl}
          downloadFilename={`watermarked-${file.name}`}
          originalSize={file.size}
          resultSize={resultSize}
          onReset={handleReset}
          resetLabel="Beri watermark file lain"
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
          {isProcessing && <Progress value={progress} label="Membubuhkan watermark pada halaman..." />}
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
        Pengaturan Watermark
      </h3>

      <Input
        label="Teks Watermark"
        value={watermarkText}
        onChange={(e) => setWatermarkText(e.target.value)}
        placeholder="CONFIDENTIAL"
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Ukuran Font (px)"
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
        <Input
          label="Transparansi (0.1 - 1)"
          type="number"
          step="0.1"
          min="0.1"
          max="1"
          value={opacity}
          onChange={(e) => setOpacity(e.target.value)}
        />
      </div>

      <div className="pt-2">
        <Button
          className="w-full"
          size="lg"
          variant="primary"
          onClick={handleAddWatermark}
          disabled={!file || !watermarkText.trim() || isProcessing || Boolean(downloadUrl)}
          isLoading={isProcessing}
        >
          Watermark PDF
        </Button>
      </div>
    </div>
  );

  return <ToolWorkspace leftContent={leftContent} rightContent={rightContent} />;
}
