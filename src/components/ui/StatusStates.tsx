import React from 'react';
import { AlertCircle, CheckCircle2, FileQuestion, Download, RotateCcw } from 'lucide-react';
import Button from './Button';
import { formatFileSize } from './FileList';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No files yet',
  description = 'Add files to start processing.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`border border-border rounded-lg bg-subtle/50 p-8 text-center space-y-3 ${className}`}>
      <div className="w-9 h-9 rounded border border-border bg-white flex items-center justify-center mx-auto text-muted">
        <FileQuestion className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-dark">{title}</h3>
        <p className="text-xs text-muted mt-1 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <div className="pt-1">
          <Button size="sm" variant="outline" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Could not process this file',
  message = 'The uploaded file appears to be corrupted or unsupported.',
  onRetry,
  retryLabel = 'Try another file',
  className = '',
}) => {
  return (
    <div className={`border border-danger/30 bg-danger/5 rounded-lg p-5 text-left space-y-3 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="p-1 rounded bg-danger/10 text-danger shrink-0 mt-0.5">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-dark">{title}</h4>
          <p className="text-xs text-body mt-1 leading-relaxed">{message}</p>
          {onRetry && (
            <div className="mt-3">
              <Button size="sm" variant="outline" onClick={onRetry} className="h-8 text-xs border-danger/40 text-danger hover:bg-danger/10">
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                {retryLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export interface SuccessStateProps {
  title?: string;
  message?: string;
  downloadUrl?: string;
  downloadFilename?: string;
  onDownload?: () => void;
  onReset?: () => void;
  resetLabel?: string;
  originalSize?: number;
  resultSize?: number;
  className?: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title = 'Done',
  message = 'Your file has been processed successfully.',
  downloadUrl,
  downloadFilename = 'processed-file',
  onDownload,
  onReset,
  resetLabel = 'Process another',
  originalSize,
  resultSize,
  className = '',
}) => {
  const percentSaved =
    originalSize && resultSize && originalSize > resultSize
      ? Math.round(((originalSize - resultSize) / originalSize) * 100)
      : null;

  return (
    <div className={`border border-border rounded-lg bg-white p-6 text-left space-y-5 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded bg-success/10 text-success shrink-0 mt-0.5">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-dark">{title}</h3>
          <p className="text-xs text-muted mt-0.5">{message}</p>
        </div>
      </div>

      {/* File statistics (if applicable) */}
      {originalSize !== undefined && resultSize !== undefined && (
        <div className="grid grid-cols-3 gap-3 p-3 rounded bg-subtle border border-border text-xs">
          <div>
            <span className="text-muted block text-[11px]">Original size</span>
            <span className="font-semibold text-dark mt-0.5 block">
              {formatFileSize(originalSize)}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">New size</span>
            <span className="font-semibold text-dark mt-0.5 block">
              {formatFileSize(resultSize)}
            </span>
          </div>
          <div>
            <span className="text-muted block text-[11px]">Saved</span>
            <span className="font-semibold text-success mt-0.5 block">
              {percentSaved !== null ? `${percentSaved}%` : '0%'}
            </span>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
        {downloadUrl ? (
          <a
            href={downloadUrl}
            download={downloadFilename}
            className="inline-flex items-center justify-center h-10 px-4 rounded text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4 mr-1.5" />
            Download file
          </a>
        ) : onDownload ? (
          <Button size="md" variant="primary" onClick={onDownload}>
            <Download className="w-4 h-4 mr-1.5" />
            Download file
          </Button>
        ) : null}

        {onReset && (
          <Button size="md" variant="outline" onClick={onReset}>
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            {resetLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
