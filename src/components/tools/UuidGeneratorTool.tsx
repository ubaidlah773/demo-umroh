'use client';

import React, { useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

export default function UuidGeneratorTool() {
  const [count, setCount] = useState('5');
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const qty = parseInt(count, 10) || 5;
    const list: string[] = [];
    for (let i = 0; i < qty; i++) {
      if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
        list.push(window.crypto.randomUUID());
      } else {
        // Fallback RFC4122 v4
        list.push(
          'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          })
        );
      }
    }
    setUuids(list);
  };

  React.useEffect(() => {
    generate();
  }, [count]);

  const handleCopyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySingle = (id: string) => {
    navigator.clipboard.writeText(id);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-left border border-border rounded-lg bg-white p-6 shadow-xs">
      <div>
        <h3 className="text-base font-bold text-dark">UUID v4 Generator</h3>
        <p className="text-xs text-muted mt-1">
          Menghasilkan UUID versi 4 standar RFC 4122 secara massal.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 p-3 bg-subtle border border-border rounded">
        <div className="w-36">
          <Select
            label="Jumlah UUID"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          >
            <option value="1">1 UUID</option>
            <option value="5">5 UUID</option>
            <option value="10">10 UUID</option>
            <option value="25">25 UUID</option>
            <option value="50">50 UUID</option>
          </Select>
        </div>

        <div className="flex items-end gap-2 pt-4">
          <Button size="sm" variant="outline" onClick={generate}>
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Regenerate
          </Button>
          <Button size="sm" variant="primary" onClick={handleCopyAll}>
            {copied ? <Check className="w-3.5 h-3.5 text-white mr-1" /> : <Copy className="w-3.5 h-3.5 text-white mr-1" />}
            {copied ? 'Copied All' : 'Copy All'}
          </Button>
        </div>
      </div>

      {/* UUID list */}
      <div className="space-y-1.5 max-h-80 overflow-y-auto">
        {uuids.map((uuid, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2.5 rounded bg-subtle/50 border border-border hover:bg-subtle text-xs font-mono text-dark"
          >
            <span className="truncate mr-2">{uuid}</span>
            <button
              type="button"
              onClick={() => handleCopySingle(uuid)}
              className="text-muted hover:text-primary p-1 rounded"
              title="Copy this UUID"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
