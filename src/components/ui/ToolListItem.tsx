'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { ToolItem } from '@/data/tools';
import ToolIcon from './ToolIcon';
import { useTools } from '@/context/ToolsContext';

export interface ToolListItemProps {
  tool: ToolItem;
  showCategory?: boolean;
}

export const ToolListItem: React.FC<ToolListItemProps> = ({ tool, showCategory = false }) => {
  const { isFavorite, toggleFavorite, addRecent } = useTools();
  const favorited = isFavorite(tool.id);

  const handleClick = () => {
    addRecent(tool.id);
  };

  return (
    <div className="relative group border border-border rounded-lg bg-white hover:bg-subtle hover:border-gray-400 transition-colors duration-150 p-3.5 text-left flex items-start justify-between gap-3">
      <Link
        href={`/tools/${tool.slug}`}
        onClick={handleClick}
        className="flex items-start gap-3.5 flex-1 min-w-0"
      >
        <div className="w-8 h-8 rounded border border-border bg-white flex items-center justify-center text-dark shrink-0 group-hover:border-primary/40 group-hover:text-primary transition-colors">
          <ToolIcon name={tool.icon} className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-dark group-hover:text-primary transition-colors truncate">
              {tool.name}
            </h3>
            {showCategory && (
              <span className="text-[11px] font-normal px-1.5 py-0.5 rounded bg-subtle border border-border text-muted">
                {tool.categoryLabel}
              </span>
            )}
            {tool.status === 'coming-soon' && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800">
                Coming soon
              </span>
            )}
          </div>
          <p className="text-xs text-muted mt-0.5 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-1 shrink-0 pt-0.5">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(tool.id);
          }}
          className={`p-1 rounded transition-colors ${
            favorited
              ? 'text-amber-500 hover:text-amber-600'
              : 'text-muted/40 hover:text-muted hover:bg-border/30'
          }`}
          aria-label={favorited ? `Unfavorite ${tool.name}` : `Favorite ${tool.name}`}
          title={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star className={`w-3.5 h-3.5 ${favorited ? 'fill-amber-500' : ''}`} />
        </button>
        <Link
          href={`/tools/${tool.slug}`}
          onClick={handleClick}
          className="text-muted/60 group-hover:text-primary transition-colors p-1"
          aria-hidden="true"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default ToolListItem;
