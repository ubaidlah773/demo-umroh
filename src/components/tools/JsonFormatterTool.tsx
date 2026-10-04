'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function JsonFormatterTool() {
  const [input, setInput] = useState('{"name":"AdminTools","version":2.0,"features":["pdf","qr","convert"]}');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (spaces: number) => {
    if (!input.trim()) return;
    try {
      setError(null);
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, spaces));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Format JSON tidak valid.');
      }
    }
  };

  const minifyJson = () => {
    if (!input.trim()) return;
    try {
      setError(null);
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Format JSON tidak valid.');
      }
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 text-left">
      {/* Controls toolbar */}
      <div className="flex items-center justify-between p-2 rounded bg-subtle border border-border flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Button size="sm" variant="primary" onClick={() => formatJson(2)}>
            Format (2 Spaces)
          </Button>
          <Button size="sm" variant="outline" onClick={() => formatJson(4)}>
            Format (4 Spaces)
          </Button>
          <Button size="sm" variant="outline" onClick={minifyJson}>
            Minify (1 Line)
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            disabled={!output}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-success mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
            {copied ? 'Copied' : 'Copy Result'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDownload}
            disabled={!output}
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            Download .json
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded bg-danger/10 border border-danger/30 text-xs text-danger flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Error parsing JSON: {error}</span>
        </div>
      )}

      {/* 2-column input/output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Input */}
        <div className="border border-border rounded-lg bg-white overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-3 py-2 bg-subtle border-b border-border">
            <span className="text-xs font-semibold text-dark">Raw JSON Input</span>
            <button
              type="button"
              onClick={() => {
                setInput('');
                setOutput('');
                setError(null);
              }}
              className="text-xs text-muted hover:text-danger"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={14}
            className="w-full p-3 text-xs text-dark placeholder:text-muted/60 focus:outline-none resize-none font-mono"
            placeholder="Paste raw JSON here..."
          />
        </div>

        {/* Right Output */}
        <div className="border border-border rounded-lg bg-white overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-3 py-2 bg-subtle border-b border-border">
            <span className="text-xs font-semibold text-dark">Formatted Output</span>
            <span className="text-[11px] text-muted">
              {output ? `${output.length} characters` : 'Ready'}
            </span>
          </div>
          <textarea
            readOnly
            value={output}
            rows={14}
            className="w-full p-3 text-xs text-dark bg-subtle/30 placeholder:text-muted/50 focus:outline-none resize-none font-mono"
            placeholder="Formatted JSON will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
