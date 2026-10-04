'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Trash2, ArrowRight } from 'lucide-react';
import { useTools } from '@/context/ToolsContext';
import { TOOLS } from '@/data/tools';
import ToolIcon from '@/components/ui/ToolIcon';
import Button from '@/components/ui/Button';

export default function HistoryPage() {
  const { recentTools, clearRecent } = useTools();

  // Group entries by Today, Yesterday, Older
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterdayStart = todayStart - 86400000;

  const todayEntries = recentTools.filter((e) => e.timestamp >= todayStart);
  const yesterdayEntries = recentTools.filter(
    (e) => e.timestamp >= yesterdayStart && e.timestamp < todayStart
  );
  const olderEntries = recentTools.filter((e) => e.timestamp < yesterdayStart);

  const renderGroup = (title: string, list: typeof recentTools) => {
    if (list.length === 0) return null;

    return (
      <div className="space-y-2 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted px-1">
          {title}
        </h3>
        <div className="divide-y divide-border border border-border rounded-lg bg-white overflow-hidden shadow-xs">
          {list.map((item, idx) => {
            const tool = TOOLS.find((t) => t.id === item.toolId);
            if (!tool) return null;
            const timeStr = new Date(item.timestamp).toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <Link
                key={`${item.toolId}-${idx}`}
                href={`/tools/${tool.slug}`}
                className="flex items-center justify-between p-3.5 hover:bg-subtle transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded border border-border bg-white flex items-center justify-center text-dark group-hover:text-primary transition-colors">
                    <ToolIcon name={tool.icon} className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-dark group-hover:text-primary transition-colors">
                      {tool.name}
                    </h4>
                    <span className="text-[11px] text-muted">{tool.categoryLabel}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="font-mono">{timeStr}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[760px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-border pb-5 text-left">
        <div>
          <h1 className="text-2xl font-bold text-dark">Riwayat Penggunaan</h1>
          <p className="text-xs text-muted mt-1">
            Daftar perkakas utilitas yang baru saja Anda buka pada peramban ini.
          </p>
        </div>

        {recentTools.length > 0 && (
          <Button size="sm" variant="outline" onClick={clearRecent}>
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Hapus Riwayat
          </Button>
        )}
      </div>

      {recentTools.length === 0 ? (
        <div className="p-12 text-center border border-border rounded-lg bg-subtle text-muted text-xs space-y-2">
          <Clock className="w-6 h-6 mx-auto text-muted/60" />
          <p className="font-medium text-dark">Belum ada riwayat aktivitas</p>
          <p className="max-w-xs mx-auto">
            Tools yang Anda gunakan akan tercatat di sini untuk akses kilat.
          </p>
          <div className="pt-2">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center h-8 px-3 rounded text-xs font-medium bg-primary text-white"
            >
              Jelajahi Tools
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {renderGroup('Hari Ini', todayEntries)}
          {renderGroup('Kemarin', yesterdayEntries)}
          {renderGroup('Sebelumnya', olderEntries)}
        </div>
      )}

      <p className="text-[11px] text-muted text-left border-t border-border pt-4">
        Catatan Privasi: Hanya nama tools dan stempel waktu yang disimpan di LocalStorage perangkat Anda. Berkas atau dokumen Anda tidak pernah disimpan.
      </p>
    </div>
  );
}
