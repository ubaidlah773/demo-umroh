'use client';

import React, { useRef, useState } from 'react';
import { Upload, Plus } from 'lucide-react';
import Button from './Button';

export interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  title?: string;
  subtitle?: string;
  maxSizeMB?: number;
  className?: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFilesSelected,
  accept,
  multiple = true,
  title = 'Drop files here',
  subtitle = 'or choose files from your computer',
  maxSizeMB = 50,
  className = '',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selected = Array.from(e.dataTransfer.files);
      onFilesSelected(selected);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      onFilesSelected(selected);
      // Reset input value so same files can be re-selected if needed
      e.target.value = '';
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative min-h-[200px] border border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-center transition-colors cursor-pointer select-none ${
        isDragOver
          ? 'border-primary bg-primary/5 text-primary'
          : 'border-border bg-white hover:bg-subtle/60 text-muted'
      } ${className}`.trim()}
      role="region"
      aria-label="File upload dropzone"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
        aria-hidden="true"
      />

      <div className="w-10 h-10 rounded border border-border flex items-center justify-center mb-3 bg-subtle text-dark">
        <Plus className="w-5 h-5" />
      </div>

      <div className="space-y-1 mb-4">
        <p className="text-sm font-medium text-dark">{title}</p>
        <p className="text-xs text-muted">{subtitle}</p>
      </div>

      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        <Upload className="w-3.5 h-3.5 mr-1" />
        Select files
      </Button>

      {accept && (
        <span className="text-[11px] text-muted/70 mt-3 block">
          Accepts {accept} • Max {maxSizeMB}MB
        </span>
      )}
    </div>
  );
};

export default FileDropzone;
