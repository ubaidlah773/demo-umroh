'use client';

import React, { useEffect } from 'react';
import { ToolItem } from '@/data/tools';
import ToolHeader from '@/components/ui/ToolHeader';
import { useTools } from '@/context/ToolsContext';

// Dynamic / direct imports of tools
import MergePDFTool from './MergePDFTool';
import SplitPDFTool from './SplitPDFTool';
import CompressPDFTool from './CompressPDFTool';
import RotatePDFTool from './RotatePDFTool';
import WatermarkPDFTool from './WatermarkPDFTool';
import JpgToPdfTool from './JpgToPdfTool';
import CompressImageTool from './CompressImageTool';
import ResizeImageTool from './ResizeImageTool';
import QrGeneratorTool from './QrGeneratorTool';
import BarcodeGeneratorTool from './BarcodeGeneratorTool';
import WordCounterTool from './WordCounterTool';
import CaseConverterTool from './CaseConverterTool';
import TextCleanerTool from './TextCleanerTool';
import JsonFormatterTool from './JsonFormatterTool';
import CsvViewerTool from './CsvViewerTool';
import ZipCreatorTool from './ZipCreatorTool';
import PasswordGeneratorTool from './PasswordGeneratorTool';
import UuidGeneratorTool from './UuidGeneratorTool';
import TimestampConverterTool from './TimestampConverterTool';
import ColorConverterTool from './ColorConverterTool';
import FileInfoTool from './FileInfoTool';
import ComingSoonTool from './ComingSoonTool';

export interface ToolDispatcherProps {
  tool: ToolItem;
}

export default function ToolDispatcher({ tool }: ToolDispatcherProps) {
  const { addRecent } = useTools();

  useEffect(() => {
    addRecent(tool.id);
  }, [tool.id]);

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'merge-pdf':
        return <MergePDFTool />;
      case 'split-pdf':
      case 'extract-pages':
      case 'delete-pages':
        return <SplitPDFTool />;
      case 'compress-pdf':
        return <CompressPDFTool />;
      case 'rotate-pdf':
        return <RotatePDFTool />;
      case 'watermark-pdf':
        return <WatermarkPDFTool />;
      case 'jpg-to-pdf':
        return <JpgToPdfTool />;
      case 'compress-image':
        return <CompressImageTool />;
      case 'resize-image':
      case 'crop-image':
      case 'convert-image':
        return <ResizeImageTool />;
      case 'qr-generator':
      case 'wifi-qr':
      case 'whatsapp-qr':
      case 'vcard-qr':
        return <QrGeneratorTool />;
      case 'barcode-generator':
        return <BarcodeGeneratorTool />;
      case 'word-counter':
      case 'character-counter':
        return <WordCounterTool />;
      case 'case-converter':
        return <CaseConverterTool />;
      case 'text-cleaner':
        return <TextCleanerTool />;
      case 'json-formatter':
        return <JsonFormatterTool />;
      case 'csv-viewer':
      case 'csv-converter':
      case 'spreadsheet-converter':
        return <CsvViewerTool />;
      case 'zip-creator':
        return <ZipCreatorTool />;
      case 'password-generator':
        return <PasswordGeneratorTool />;
      case 'uuid-generator':
        return <UuidGeneratorTool />;
      case 'timestamp-converter':
        return <TimestampConverterTool />;
      case 'color-converter':
        return <ColorConverterTool />;
      case 'file-info':
        return <FileInfoTool />;
      default:
        return <ComingSoonTool tool={tool} />;
    }
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <ToolHeader tool={tool} />

      <main>{renderToolComponent()}</main>

      {/* Editorial documentation & How to use */}
      <section className="border-t border-border pt-10 text-left space-y-6 max-w-[720px]">
        <div className="space-y-2">
          <h2 className="text-base font-bold text-dark">
            Cara Menggunakan {tool.name}
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            Ikuti tiga langkah sederhana untuk menyelesaikan tugas Anda langsung di peramban:
          </p>
        </div>

        <ol className="list-decimal list-inside space-y-2 text-xs text-body leading-relaxed pl-1">
          <li>
            <strong>Pilih atau Masukkan Data:</strong> Tarik berkas ke area unggah atau masukkan parameter pada form yang tersedia.
          </li>
          <li>
            <strong>Atur Opsi Pemrosesan:</strong> Sesuaikan konfigurasi output pada panel samping sesuai kebutuhan spesifik Anda.
          </li>
          <li>
            <strong>Proses & Unduh:</strong> Klik tombol eksekusi dan unduh hasil olahan tanpa menunggu antrean server.
          </li>
        </ol>

        <div className="p-4 bg-subtle border border-border rounded-lg text-xs space-y-1">
          <span className="font-semibold text-dark block">Jaminan Privasi Data</span>
          <p className="text-muted leading-relaxed">
            Semua pemrosesan untuk tool ini dieksekusi secara lokal pada komputer atau perangkat ponsel Anda. Berkas tidak dikirim ke cloud dan tidak disimpan di pangkalan data mana pun.
          </p>
        </div>
      </section>
    </div>
  );
}
