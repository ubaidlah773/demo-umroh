'use client';

import React, { useState, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ToolWorkspace from '@/components/ui/ToolWorkspace';

export default function BarcodeGeneratorTool() {
  const [barcodeType, setBarcodeType] = useState('CODE128');
  const [value, setValue] = useState('ADMINTOOLS12345');
  const [error, setError] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!svgRef.current || !value) return;

    try {
      setError(null);
      JsBarcode(svgRef.current, value, {
        format: barcodeType,
        width: 2,
        height: 80,
        displayValue: true,
        fontSize: 14,
        margin: 10,
        background: '#FFFFFF',
        lineColor: '#111827',
      });

      // Also render to hidden canvas for easy PNG export
      if (canvasRef.current) {
        JsBarcode(canvasRef.current, value, {
          format: barcodeType,
          width: 2,
          height: 80,
          displayValue: true,
          fontSize: 14,
          margin: 10,
          background: '#FFFFFF',
          lineColor: '#111827',
        });
      }
    } catch {
      setError(`Nilai barcode tidak valid untuk tipe ${barcodeType}.`);
    }
  }, [barcodeType, value]);

  const handleDownloadPng = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `barcode-${value}.png`;
    a.click();
  };

  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barcode-${value}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const leftContent = (
    <div className="space-y-4 text-left">
      <Select
        label="Barcode Type"
        value={barcodeType}
        onChange={(e) => {
          setBarcodeType(e.target.value);
          if (e.target.value === 'EAN13' && value.length !== 13) {
            setValue('1234567890128');
          } else if (e.target.value === 'EAN8' && value.length !== 8) {
            setValue('12345670');
          } else if (e.target.value === 'UPC' && value.length !== 12) {
            setValue('123456789012');
          }
        }}
      >
        <option value="CODE128">CODE128 (Umum, Alfanumerik)</option>
        <option value="EAN13">EAN-13 (Produk Ritel Internasional - 13 digit)</option>
        <option value="EAN8">EAN-8 (Kemasan Kecil - 8 digit)</option>
        <option value="UPC">UPC-A (Ritel Amerika - 12 digit)</option>
        <option value="CODE39">CODE39 (Industri & Manufaktur)</option>
        <option value="ITF14">ITF-14 (Karton Pengiriman)</option>
      </Select>

      <Input
        label="Barcode Value (Data)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Masukkan teks atau angka..."
        error={error || undefined}
        helperText={
          barcodeType === 'EAN13'
            ? 'Harus terdiri dari tepat 13 digit angka.'
            : barcodeType === 'EAN8'
            ? 'Harus terdiri dari tepat 8 digit angka.'
            : barcodeType === 'UPC'
            ? 'Harus terdiri dari tepat 12 digit angka.'
            : 'Mendukung huruf kapital dan angka.'
        }
      />

      <div className="p-3 bg-subtle rounded border border-border text-xs text-muted">
        <p className="font-semibold text-dark">Informasi Standar</p>
        <p className="mt-0.5">
          Barcode yang dihasilkan sepenuhnya mematuhi standar pemindaian laser optik global.
        </p>
      </div>
    </div>
  );

  const rightContent = (
    <div className="space-y-5 text-center">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted text-left">
        Preview Barcode
      </h3>

      <div className="p-4 bg-white border border-border rounded-lg inline-flex items-center justify-center mx-auto overflow-x-auto max-w-full">
        <svg ref={svgRef} className="max-w-full h-auto" />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="space-y-2 pt-2">
        <Button
          type="button"
          size="md"
          variant="primary"
          className="w-full"
          onClick={handleDownloadPng}
          disabled={Boolean(error) || !value}
        >
          <Download className="w-4 h-4 mr-1.5" />
          Download PNG
        </Button>
        <Button
          type="button"
          size="md"
          variant="outline"
          className="w-full"
          onClick={handleDownloadSvg}
          disabled={Boolean(error) || !value}
        >
          <Download className="w-4 h-4 mr-1.5" />
          Download SVG
        </Button>
      </div>
    </div>
  );

  return <ToolWorkspace leftContent={leftContent} rightContent={rightContent} />;
}
