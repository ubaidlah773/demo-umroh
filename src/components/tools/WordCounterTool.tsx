'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function WordCounterTool() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
    const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
    const readingTimeMinutes = Math.ceil(words / 200);

    return {
      chars,
      charsNoSpaces,
      words,
      lines,
      sentences,
      paragraphs,
      readingTimeMinutes,
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="border border-border rounded-lg bg-white overflow-hidden shadow-xs">
        <div className="flex items-center justify-between px-4 py-2.5 bg-subtle border-b border-border">
          <span className="text-xs font-semibold text-dark">Input Text</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="text-xs flex items-center gap-1 text-muted hover:text-dark disabled:opacity-40"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy text'}</span>
            </button>
            <button
              type="button"
              onClick={() => setText('')}
              disabled={!text}
              className="text-xs text-muted hover:text-danger disabled:opacity-40 ml-2"
            >
              Clear
            </button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={12}
          className="w-full p-4 text-sm text-dark placeholder:text-muted/60 focus:outline-none resize-y font-mono"
          placeholder="Paste or type your text here to inspect statistics..."
        />

        {/* Bottom statistics bar matching Section 20 */}
        <div className="border-t border-border px-4 py-3 bg-subtle grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <span className="text-muted block text-[11px]">Characters</span>
            <span className="font-semibold text-dark text-sm block">
              {stats.chars.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">Words</span>
            <span className="font-semibold text-dark text-sm block">
              {stats.words.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">Lines</span>
            <span className="font-semibold text-dark text-sm block">
              {stats.lines.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">No Spaces</span>
            <span className="font-semibold text-dark text-sm block">
              {stats.charsNoSpaces.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">Sentences</span>
            <span className="font-semibold text-dark text-sm block">
              {stats.sentences.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">Reading Time</span>
            <span className="font-semibold text-primary text-sm block">
              ~{stats.readingTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
