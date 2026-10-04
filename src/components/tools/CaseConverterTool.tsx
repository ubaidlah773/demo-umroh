'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CaseConverterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertCase = (type: string) => {
    if (!input) return;

    let res = '';
    switch (type) {
      case 'upper':
        res = input.toUpperCase();
        break;
      case 'lower':
        res = input.toLowerCase();
        break;
      case 'sentence':
        res = input
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case 'title':
        res = input
          .toLowerCase()
          .split(' ')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        break;
      case 'camel':
        res = input
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case 'kebab':
        res = input
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9-]/g, '');
        break;
      case 'snake':
        res = input
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-zA-Z0-9_]/g, '');
        break;
      default:
        res = input;
    }
    setOutput(res);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 text-left">
      {/* Transformation buttons strip */}
      <div className="flex items-center gap-1.5 flex-wrap p-2 rounded bg-subtle border border-border">
        <span className="text-xs font-semibold text-muted uppercase tracking-wider px-2">
          Convert to:
        </span>
        <Button size="sm" variant="outline" onClick={() => convertCase('upper')}>
          UPPERCASE
        </Button>
        <Button size="sm" variant="outline" onClick={() => convertCase('lower')}>
          lowercase
        </Button>
        <Button size="sm" variant="outline" onClick={() => convertCase('title')}>
          Title Case
        </Button>
        <Button size="sm" variant="outline" onClick={() => convertCase('sentence')}>
          Sentence case
        </Button>
        <Button size="sm" variant="outline" onClick={() => convertCase('camel')}>
          camelCase
        </Button>
        <Button size="sm" variant="outline" onClick={() => convertCase('kebab')}>
          kebab-case
        </Button>
        <Button size="sm" variant="outline" onClick={() => convertCase('snake')}>
          snake_case
        </Button>
      </div>

      {/* 2-column input/output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Input */}
        <div className="border border-border rounded-lg bg-white overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-3 py-2 bg-subtle border-b border-border">
            <span className="text-xs font-semibold text-dark">Input Text</span>
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
            rows={10}
            className="w-full p-3 text-sm text-dark placeholder:text-muted/60 focus:outline-none resize-none font-mono"
            placeholder="Paste text here to convert casing..."
          />
        </div>

        {/* Right: Output */}
        <div className="border border-border rounded-lg bg-white overflow-hidden shadow-xs">
          <div className="flex items-center justify-between px-3 py-2 bg-subtle border-b border-border">
            <span className="text-xs font-semibold text-dark">Result</span>
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
            rows={10}
            className="w-full p-3 text-sm text-dark bg-subtle/30 placeholder:text-muted/50 focus:outline-none resize-none font-mono"
            placeholder="Converted text will appear here..."
          />
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="p-3 bg-subtle rounded border border-border flex items-center gap-6 text-xs text-muted">
        <span>Characters: <strong className="text-dark">{(output || input).length}</strong></span>
        <span>Words: <strong className="text-dark">{(output || input).trim() ? (output || input).trim().split(/\s+/).length : 0}</strong></span>
        <span>Lines: <strong className="text-dark">{(output || input) ? (output || input).split('\n').length : 0}</strong></span>
      </div>
    </div>
  );
}
