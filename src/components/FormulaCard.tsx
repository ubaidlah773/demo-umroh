'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { FormulaCard as FormulaCardType } from '@/types';
import { useProgress } from '@/context/ProgressContext';

interface FormulaCardProps {
  data: FormulaCardType;
}

export default function FormulaCard({ data }: FormulaCardProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useProgress();

  const handleCopy = () => {
    navigator.clipboard.writeText(data.formula);
    setCopied(true);
    showToast({
      type: 'success',
      title: 'Formula Copied',
      message: `${data.formula} copied to clipboard.`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 my-4 font-sans">
      {/* Code-style block for syntax */}
      <div className="flex items-center justify-between bg-[#F3F4F6] border border-[#E5E7EB] rounded-[6px] px-3.5 py-2 font-mono text-sm text-[#171717]">
        <code>{data.formula}</code>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] border border-[#D1D5DB] bg-white hover:bg-[#F9FAFB] text-xs font-sans text-[#374151] transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {data.syntax && (
        <div className="text-xs text-[#6B7280]">
          <span className="font-semibold text-[#171717]">Syntax: </span>
          <code className="font-mono bg-[#F3F4F6] px-1.5 py-0.5 rounded">{data.syntax}</code>
          <p className="mt-1">{data.explanation}</p>
        </div>
      )}

      {/* Example Simple Table */}
      {data.tableData && (
        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-[#171717] block">Contoh:</span>
          <div className="border border-[#E5E7EB] rounded-[6px] overflow-hidden bg-white text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] font-medium text-[#6B7280]">
                  {data.tableData.headers.map((h, i) => (
                    <th key={i} className="px-3 py-2 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {data.tableData.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-3 py-2 text-[#374151]">
                        {typeof cell === 'number'
                          ? `Rp${cell.toLocaleString('id-ID')}`
                          : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.resultText && (
            <div className="text-xs font-semibold text-[#171717] pt-1">
              <strong>{data.resultText}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
