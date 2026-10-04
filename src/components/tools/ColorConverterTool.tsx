'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ColorConverterTool() {
  const [hex, setHex] = useState('#1D4ED8');
  const [copied, setCopied] = useState<string | null>(null);

  // Convert HEX to RGB
  const hexToRgb = (hexStr: string) => {
    let clean = hexStr.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    const num = parseInt(clean, 16);
    if (isNaN(num) || clean.length !== 6) return { r: 29, g: 78, b: 216 };
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgb = hexToRgb(hex);

  // RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const copyVal = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-left border border-border rounded-lg bg-white p-6 shadow-xs">
      <div>
        <h3 className="text-base font-bold text-dark">Color Converter</h3>
        <p className="text-xs text-muted mt-1">
          Konversi instan antara kode warna HEX, RGB, dan HSL.
        </p>
      </div>

      {/* Visual Color Preview Swatch */}
      <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-subtle">
        <div
          className="w-16 h-16 rounded-md border border-border shrink-0 shadow-inner"
          style={{ backgroundColor: hex }}
        />
        <div className="flex-1 space-y-2">
          <Input
            label="HEX Color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="#1D4ED8"
          />
        </div>
      </div>

      {/* Value conversions display */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between p-3 bg-subtle rounded border border-border text-xs">
          <div>
            <span className="text-muted block text-[11px]">RGB</span>
            <span className="font-mono text-dark font-semibold mt-0.5 block">{rgbString}</span>
          </div>
          <Button size="sm" variant="outline" onClick={() => copyVal(rgbString, 'rgb')}>
            {copied === 'rgb' ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>
        </div>

        <div className="flex items-center justify-between p-3 bg-subtle rounded border border-border text-xs">
          <div>
            <span className="text-muted block text-[11px]">HSL</span>
            <span className="font-mono text-dark font-semibold mt-0.5 block">{hslString}</span>
          </div>
          <Button size="sm" variant="outline" onClick={() => copyVal(hslString, 'hsl')}>
            {copied === 'hsl' ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
