'use client';

import React, { useRef } from 'react';
import { GripVertical, Trash2, ChevronUp, ChevronDown, Plus } from 'lucide-react';
import Button from './Button';

export interface FileItemInfo {
  file: File;
  id?: string;
}

export interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onAddMore?: (files: File[]) => void;
  accept?: string;
  allowReorder?: boolean;
  className?: string;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onRemove,
  onMoveUp,
  onMoveDown,
  onAddMore,
  accept,
  allowReorder = true,
  className = '',
}) => {
  const addInputRef = useRef<HTMLInputElement>(null);

  const handleAddMoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onAddMore) {
      onAddMore(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  if (files.length === 0) return null;

  return (
    <div className={`border border-border rounded-lg bg-white overflow-hidden text-left ${className}`}>
      {/* List Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-subtle border-b border-border">
        <span className="text-xs font-semibold text-dark">
          Files <span className="text-muted font-normal">({files.length})</span>
        </span>
        {onAddMore && (
          <div>
            <input
              ref={addInputRef}
              type="file"
              accept={accept}
              multiple
              onChange={handleAddMoreChange}
              className="hidden"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => addInputRef.current?.click()}
              className="h-7 px-2 text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add files
            </Button>
          </div>
        )}
      </div>

      {/* List Items */}
      <div className="divide-y divide-border">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex items-center justify-between px-3 py-2.5 hover:bg-subtle/50 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-3">
              {allowReorder && (
                <div className="flex items-center text-muted">
                  <GripVertical className="w-4 h-4 cursor-grab" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-dark truncate">{file.name}</p>
                <p className="text-[11px] text-muted">{formatFileSize(file.size)}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              {allowReorder && onMoveUp && (
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => onMoveUp(index)}
                  className="p-1 rounded text-muted hover:text-dark disabled:opacity-20 hover:bg-border/30 transition-colors"
                  aria-label={`Move ${file.name} up`}
                  title="Move up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              )}
              {allowReorder && onMoveDown && (
                <button
                  type="button"
                  disabled={index === files.length - 1}
                  onClick={() => onMoveDown(index)}
                  className="p-1 rounded text-muted hover:text-dark disabled:opacity-20 hover:bg-border/30 transition-colors"
                  aria-label={`Move ${file.name} down`}
                  title="Move down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-1 rounded text-muted hover:text-danger hover:bg-danger/10 transition-colors ml-1"
                aria-label={`Remove ${file.name}`}
                title="Remove file"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
