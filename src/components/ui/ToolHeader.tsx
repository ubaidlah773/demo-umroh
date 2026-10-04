import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { ToolItem } from '@/data/tools';

export interface ToolHeaderProps {
  tool: ToolItem;
  className?: string;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ tool, className = '' }) => {
  return (
    <div className={`space-y-3 pb-6 border-b border-border text-left ${className}`}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-dark transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <Link href={`/tools?category=${tool.category}`} className="hover:text-dark transition-colors">
          {tool.categoryLabel}
        </Link>
        <ChevronRight className="w-3 h-3 text-muted/60" />
        <span className="text-dark font-medium">{tool.name}</span>
      </nav>

      {/* Main Title and Description */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark tracking-tight">
            {tool.name}
          </h1>
          <p className="text-sm text-muted mt-1 max-w-2xl leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Privacy UX Badge (Section 34) */}
        {tool.clientSide && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-subtle border border-border text-[11px] text-muted shrink-0 self-start">
            <ShieldCheck className="w-3.5 h-3.5 text-success" />
            <span>Files processed locally in browser</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolHeader;
