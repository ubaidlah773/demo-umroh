'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function TextCleanerTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const cleanAction = (action: string) => {
    if (!input) return;

    const lines = input.split(/\r\n|\r|\n/);
    let result = '';

    switch (action) {
      case 'dedup': {
        const seen = new Set<string>();
        const filtered = lines.filter((line) => {
          if (seen.has(line)) return false;
          seen.add(line);
          return true;
        });
        result = filtered.join('\n');
        break;
      }
      case 'removeEmpty': {
        result = lines.filter((line) => line.trim().length > 0).join('\n');
        break;
      }
      case 'trim': {
        result = lines.map((line) => line.trim()).join('\n');
        break;
      }
      case 'sortAsc': {
        result = [...lines].sort((a, b) => a.localeCompare(b)).join('\n');
        break;
      }
      case 'sortDesc': {
        result = [...lines].sort((a, b) => b.localeCompare(a)).join('\n');
        break;
      }
      case 'stripExtraSpaces': {
        result = lines.map((line) => line.replace(/\s+/g, ' ').trim()).join('\n');
        break;
      }
      default:
        result = input;
    }

    setOutput(result);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 text-left">
      {/* Actions strip */}
      <div className="flex items-center gap-1.5 flex-wrap p-2 rounded bg-subtle border border-border">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider px-2">
          Actions:
        </span>
        <Button size="sm" variant="outline" onClick={() => cleanAction('dedup')}>
          Remove Duplicates
        </Button>
        <Button size="sm" variant="outline" onClick={() => cleanAction('removeEmpty')}>
          Remove Empty Lines
        </Button>
        <Button size="sm" variant="outline" onClick={() => cleanAction('trim')}>
          Trim Lines
        </Button>
        <Button size="sm" variant="outline" onClick={() => cleanAction('stripExtraSpaces')}>
          Strip Extra Spaces
        </Button>
        <Button size="sm" variant="outline" onClick={() => cleanAction('sortAsc')}>
          Sort A → Z
        </Button>
        <Button size="sm" variant="outline" onClick={() => cleanAction('sortDesc')}>
          Sort Z → A
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="border border-border rounded-lg bg-white overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-3 py-2 bg-subtle border-b border-border">
            <span className="text-xs font-semibold text-dark">Original Lines</span>
            <button
              type="button"
              onClick={() => {
                setInput('');
                setOutput('');
              }}
              className="text-xs text-muted hover:text-danger"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full p-3 text-sm text-dark placeholder:text-muted/60 focus:outline-none resize-none font-mono"
            placeholder="Paste list or messy lines here..."
          />
        </div>

        {/* Output */}
        <div className="border border-border rounded-lg bg-white overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-3 py-2 bg-subtle border-b border-border">
            <span className="text-xs font-semibold text-dark">Cleaned Output</span>
            <button
              type="button"
              onClick={handleCopy}
              disabled={!output}
              className="text-xs flex items-center gap-1 text-muted hover:text-dark disabled:opacity-40"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={12}
            className="w-full p-3 text-sm text-dark bg-subtle/30 placeholder:text-muted/50 focus:outline-none resize-none font-mono"
            placeholder="Cleaned lines will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
