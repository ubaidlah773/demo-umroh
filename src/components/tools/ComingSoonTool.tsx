'use client';

import React from 'react';
import { Clock, ShieldAlert } from 'lucide-react';
import { ToolItem } from '@/data/tools';
import ToolWorkspace from '@/components/ui/ToolWorkspace';

export interface ComingSoonToolProps {
  tool: ToolItem;
}

export const ComingSoonTool: React.FC<ComingSoonToolProps> = ({ tool }) => {
  const leftContent = (
    <div className="border border-border rounded-lg bg-subtle p-8 text-left space-y-4">
      <div className="w-10 h-10 rounded border border-border bg-white flex items-center justify-center text-amber-700">
        <Clock className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-dark">
          {tool.name} — Dalam Pengembangan Aktif
        </h3>
        <p className="text-xs text-body mt-1.5 leading-relaxed max-w-lg">
          Operasi {tool.name} memerlukan mesin tata letak dokumen dan OCR tingkat server yang terisolasi. Demi menjaga prinsip privasi tanpa tombol tiruan, fitur ini ditandai sebagai <strong>Coming Soon</strong> hingga backend berlisensi resmi siap diluncurkan.
        </p>
      </div>
      <div className="pt-2 flex items-center gap-2 text-xs text-muted">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>AdminTools tidak menggunakan tombol konversi palsu atau mock generator.</span>
      </div>
    </div>
  );

  const rightContent = (
    <div className="space-y-3 text-left">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
        Status Modul
      </h3>
      <div className="p-3 rounded bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
        <p className="font-semibold">Engine Status: Scheduled</p>
        <p className="text-[11px] text-amber-800 leading-relaxed">
          Fitur ini akan segera tersedia begitu integrasi converter berbasis headless sandbox selesai diuji.
        </p>
      </div>
    </div>
  );

  return <ToolWorkspace leftContent={leftContent} rightContent={rightContent} />;
};

export default ComingSoonTool;
