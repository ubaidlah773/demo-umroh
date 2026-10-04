'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import FileDropzone from '@/components/ui/FileDropzone';
import FileList from '@/components/ui/FileList';
import ToolWorkspace from '@/components/ui/ToolWorkspace';
import Button from '@/components/ui/Button';
import { SuccessState, ErrorState } from '@/components/ui/StatusStates';
import Progress from '@/components/ui/Progress';
import Input from '@/components/ui/Input';
import { RadioGroup } from '@/components/ui/Radio';

export default function SplitPDFTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [splitMode, setSplitMode] = useState<'range' | 'all'>('range');
  const [rangeInput, setRangeInput] = useState('1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState('split.pdf');
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = async (files: File[]) => {
    const selected = files[0];
    if (!selected || (!selected.type.includes('pdf') && !selected.name.endsWith('.pdf'))) {
      setError('Pilih berkas dokumen PDF yang valid.');
      return;
    }

    try {
      setError(null);
      const arrayBuffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const total = pdf.getPageCount();
      setFile(selected);
      setPageCount(total);
      setRangeInput(`1-${Math.min(total, 2)}`);
    } catch {
      setError('Tidak dapat membaca PDF. Berkas mungkin terkunci atau rusak.');
    }
  };

  const parseRanges = (input: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = input.split(',').map((p) => p.trim());
    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const from = Math.max(1, Math.min(start, end));
          const to = Math.min(maxPages, Math.max(start, end));
          for (let i = from; i <= to; i++) {
            pages.add(i - 1); // 0-based
          }
        }
      } else {
        const single = parseInt(part, 10);
        if (!isNaN(single) && single >= 1 && single <= maxPages) {
          pages.add(single - 1);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!file || !pageCount) return;

    try {
      setIsProcessing(true);
      setError(null);
      setProgress(20);

      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);

      if (splitMode === 'range') {
        const pageIndices = parseRanges(rangeInput, pageCount);
        if (pageIndices.length === 0) {
          setError('Rentang halaman tidak valid. Contoh: 1-3 atau 2,4,6.');
          setIsProcessing(false);
          return;
        }

        const newPdf = await PDFDocument.create();
        const copied = await newPdf.copyPages(srcPdf, pageIndices);
        copied.forEach((p) => newPdf.addPage(p));

        setProgress(80);
        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        setDownloadFilename(`${file.name.replace(/\.pdf$/i, '')}-pages-${rangeInput}.pdf`);
        setResultSize(blob.size);
        setDownloadUrl(url);
      } else {
        // Split every page into separate files packaged in ZIP
        const zip = new JSZip();
        for (let i = 0; i < pageCount; i++) {
          const singlePdf = await PDFDocument.create();
          const [copiedPage] = await singlePdf.copyPages(srcPdf, [i]);
          singlePdf.addPage(copiedPage);
          const bytes = await singlePdf.save();
          zip.file(`page-${i + 1}.pdf`, bytes);
          setProgress(Math.round(20 + ((i + 1) / pageCount) * 60));
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipBlob);
        setDownloadFilename(`${file.name.replace(/\.pdf$/i, '')}-all-pages.zip`);
        setResultSize(zipBlob.size);
        setDownloadUrl(url);
      }

      setProgress(100);
      setIsProcessing(false);
    } catch {
      setIsProcessing(false);
      setError('Gagal memecah PDF. Silakan coba lagi.');
    }
  };

  const handleReset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFile(null);
    setPageCount(null);
    setDownloadUrl(null);
    setResultSize(null);
    setError(null);
    setProgress(0);
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
          message={`Dokumen PDF berhasil dipecah.`}
          downloadUrl={downloadUrl}
          downloadFilename={downloadFilename}
          originalSize={file.size}
          resultSize={resultSize}
          onReset={handleReset}
          resetLabel="Pecah file lain"
        />
      ) : !file ? (
        <FileDropzone
          accept="application/pdf"
          title="Drop single PDF here"
          subtitle="or choose a PDF from your computer"
          multiple={false}
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-4">
          <FileList
            files={[file]}
            allowReorder={false}
            onRemove={handleReset}
          />
          {pageCount && (
            <div className="p-3 bg-subtle rounded border border-border text-xs text-muted flex items-center justify-between">
              <span>Total halaman terdeteksi:</span>
              <span className="font-semibold text-dark">{pageCount} Halaman</span>
            </div>
          )}
          {isProcessing && <Progress value={progress} label="Memproses pecahan PDF..." />}
        </div>
      )}
    </div>
  );

  const rightContent = (
    <div className="space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
        Opsi Pemecahan
      </h3>

      <RadioGroup
        name="splitMode"
        value={splitMode}
        onChange={(v) => setSplitMode(v as 'range' | 'all')}
        options={[
          {
            value: 'range',
            label: 'Ekstrak Rentang Halaman',
            description: 'Simpan halaman tertentu ke dalam satu file PDF baru.',
          },
          {
            value: 'all',
            label: 'Pecah Setiap Halaman (ZIP)',
            description: 'Simpan setiap lembar sebagai file PDF individual dalam arsip ZIP.',
          },
        ]}
      />

      {splitMode === 'range' && (
        <Input
          label="Rentang Halaman"
          value={rangeInput}
          onChange={(e) => setRangeInput(e.target.value)}
          placeholder="contoh: 1-3, 5, 7"
          helperText={`Masukkan angka antara 1 dan ${pageCount || 'total'}.`}
        />
      )}

      <div className="pt-2">
        <Button
          className="w-full"
          size="lg"
          variant="primary"
          onClick={handleSplit}
          disabled={!file || isProcessing || Boolean(downloadUrl)}
          isLoading={isProcessing}
        >
          Split PDF
        </Button>
      </div>
    </div>
  );

  return <ToolWorkspace leftContent={leftContent} rightContent={rightContent} />;
}
