'use client';

import React, { useState } from 'react';
import FileDropzone from '@/components/ui/FileDropzone';
import { FileText } from 'lucide-react';
import { formatFileSize } from '@/components/ui/FileList';
import Button from '@/components/ui/Button';

export default function FileInfoTool() {
  const [file, setFile] = useState<File | null>(null);
  const [sha256, setSha256] = useState<string | null>(null);
  const [isHashing, setIsHashing] = useState(false);

  const handleFilesSelected = async (files: File[]) => {
    const selected = files[0];
    if (!selected) return;
    setFile(selected);
    setSha256(null);

    // Compute SHA-256
    try {
      setIsHashing(true);
      const buffer = await selected.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setSha256(hashHex);
      setIsHashing(false);
    } catch {
      setIsHashing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setSha256(null);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-left">
      {!file ? (
        <FileDropzone
          title="Drop any file here"
          subtitle="Inspect size, MIME type, and SHA-256 checksum"
          multiple={false}
          onFilesSelected={handleFilesSelected}
        />
      ) : (
        <div className="border border-border rounded-lg bg-white p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold text-dark truncate max-w-sm">
                {file.name}
              </h3>
            </div>
            <Button size="sm" variant="outline" onClick={handleReset}>
              Pilih File Lain
            </Button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted">Ukuran Tepat</span>
              <span className="font-mono text-dark">{file.size.toLocaleString()} Bytes ({formatFileSize(file.size)})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted">Tipe Konten (MIME)</span>
              <span className="font-mono text-dark">{file.type || 'application/octet-stream'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted">Ekstensi</span>
              <span className="font-mono text-dark">
                {file.name.includes('.') ? file.name.split('.').pop()?.toUpperCase() : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-border/50">
              <span className="text-muted">Terakhir Dimodifikasi</span>
              <span className="text-dark">{new Date(file.lastModified).toLocaleString('id-ID')}</span>
            </div>
            <div className="pt-1">
              <span className="text-muted block mb-1">SHA-256 Hash Checksum</span>
              <div className="p-2.5 bg-subtle rounded border border-border font-mono text-[11px] text-dark break-all select-all">
                {isHashing ? 'Menghitung checksum kriptografi...' : sha256 || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
