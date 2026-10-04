'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Download, Search, FileSpreadsheet } from 'lucide-react';
import FileDropzone from '@/components/ui/FileDropzone';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ErrorState } from '@/components/ui/StatusStates';

export default function CsvViewerTool() {
  const [data, setData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      setError(null);
      setFileName(file.name);
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];
      const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

      if (rows.length === 0) {
        setError('Berkas kosong.');
        return;
      }

      setHeaders(rows[0].map(String));
      setData(rows.slice(1).map((r) => r.map(String)));
    } catch {
      setError('Gagal membaca data CSV/Excel. Pastikan format tabel valid.');
    }
  };

  const filteredData = data.filter((row) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return row.some((cell) => cell.toLowerCase().includes(q));
  });

  const handleExportJson = () => {
    if (data.length === 0) return;
    const objects = data.map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => {
        obj[h || `col_${idx}`] = row[idx] || '';
      });
      return obj;
    });

    const jsonStr = JSON.stringify(objects, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.replace(/\.[^/.]+$/, '')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setData([]);
    setHeaders([]);
    setFileName('');
    setSearch('');
    setError(null);
  };

  return (
    <div className="space-y-4 text-left">
      {error && (
        <ErrorState
          title="Tidak dapat membaca tabel"
          message={error}
          onRetry={handleReset}
          retryLabel="Pilih file lain"
        />
      )}

      {data.length === 0 ? (
        <FileDropzone
          accept=".csv,.tsv,.xlsx,.xls"
          title="Drop CSV or Excel file here"
          subtitle="Supports .csv, .tsv, .xlsx, .xls"
          multiple={false}
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="space-y-4">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-subtle border border-border rounded-lg">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-primary shrink-0" />
              <div className="min-w-0">
                <span className="text-xs font-semibold text-dark block truncate">{fileName}</span>
                <span className="text-[11px] text-muted">
                  {data.length} baris • {headers.length} kolom
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari baris..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 pl-7 pr-3 text-xs bg-white text-dark border border-border rounded focus:border-primary focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-muted absolute left-2 top-2.5" />
              </div>

              <Button size="sm" variant="outline" onClick={handleExportJson}>
                <Download className="w-3.5 h-3.5 mr-1" />
                Export JSON
              </Button>

              <Button size="sm" variant="outline" onClick={handleReset}>
                Ganti File
              </Button>
            </div>
          </div>

          {/* Table Container */}
          <div className="border border-border rounded-lg bg-white overflow-x-auto max-h-[500px]">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-subtle text-dark font-semibold sticky top-0 border-b border-border z-10">
                <tr>
                  <th className="py-2.5 px-3 border-r border-border text-muted w-10 text-center">#</th>
                  {headers.map((h, i) => (
                    <th key={i} className="py-2.5 px-3 border-r border-border truncate max-w-xs">
                      {h || `Column ${i + 1}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.slice(0, 100).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-subtle/40 transition-colors">
                    <td className="py-2 px-3 border-r border-border text-muted text-center font-mono text-[11px]">
                      {rIdx + 1}
                    </td>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2 px-3 border-r border-border truncate max-w-xs">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length > 100 && (
            <p className="text-[11px] text-muted text-center">
              Menampilkan 100 baris pertama dari {filteredData.length} baris.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
