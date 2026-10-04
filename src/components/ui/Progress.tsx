import React from 'react';

export interface ProgressProps {
  value: number; // 0 to 100
  label?: string;
  showPercent?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  label,
  showPercent = true,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center text-xs text-muted">
          {label && <span className="font-medium text-dark">{label}</span>}
          {showPercent && <span>{Math.round(clamped)}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-subtle border border-border rounded overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-200"
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default Progress;
