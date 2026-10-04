'use client';

import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Radio';

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState('16');
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const len = parseInt(length, 10) || 16;
    let chars = '';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) return;

    const array = new Uint32Array(len);
    window.crypto.getRandomValues(array);

    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars[array[i] % chars.length];
    }
    setPassword(res);
  };

  React.useEffect(() => {
    generate();
  }, []);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-left border border-border rounded-lg bg-white p-6 shadow-xs">
      <div>
        <h3 className="text-base font-bold text-dark">Password Generator</h3>
        <p className="text-xs text-muted mt-1">
          Dibuat secara kriptografis menggunakan window.crypto API perangkat Anda.
        </p>
      </div>

      {/* Generated password display */}
      <div className="flex items-center gap-2 p-3 bg-subtle border border-border rounded">
        <input
          readOnly
          type="text"
          value={password}
          className="flex-1 bg-transparent font-mono text-base text-dark tracking-wider focus:outline-none"
        />
        <Button size="sm" variant="outline" onClick={generate} title="Generate new password">
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>
        <Button size="sm" variant="primary" onClick={handleCopy}>
          {copied ? <Check className="w-3.5 h-3.5 text-white mr-1" /> : <Copy className="w-3.5 h-3.5 text-white mr-1" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      {/* Controls */}
      <div className="space-y-4 pt-2">
        <Input
          label={`Panjang Karakter (${length})`}
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
            setTimeout(generate, 50);
          }}
          className="h-2 cursor-pointer p-0"
        />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Checkbox
            label="Huruf Besar (A-Z)"
            checked={includeUpper}
            onChange={(e) => setIncludeUpper(e.target.checked)}
          />
          <Checkbox
            label="Huruf Kecil (a-z)"
            checked={includeLower}
            onChange={(e) => setIncludeLower(e.target.checked)}
          />
          <Checkbox
            label="Angka (0-9)"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          <Checkbox
            label="Simbol Khusus (!@#$)"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}
