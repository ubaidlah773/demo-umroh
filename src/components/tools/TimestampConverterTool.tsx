'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function TimestampConverterTool() {
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [inputEpoch, setInputEpoch] = useState<string>(String(Math.floor(Date.now() / 1000)));
  const [inputDate, setInputDate] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const parsedEpoch = parseInt(inputEpoch, 10);
  const epochDate = !isNaN(parsedEpoch)
    ? new Date(inputEpoch.length > 11 ? parsedEpoch : parsedEpoch * 1000)
    : null;

  const handleDateToEpoch = (dateStr: string) => {
    setInputDate(dateStr);
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      setInputEpoch(String(Math.floor(d.getTime() / 1000)));
    }
  };

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-left border border-border rounded-lg bg-white p-6 shadow-xs">
      {/* Current live epoch */}
      <div className="flex items-center justify-between p-3.5 bg-subtle border border-border rounded">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs text-muted">Current Unix Epoch:</span>
          <span className="text-sm font-mono font-bold text-dark">{currentEpoch}</span>
        </div>
        <Button size="sm" variant="outline" onClick={() => handleCopy(String(currentEpoch))}>
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      {/* Epoch to Date */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
          Timestamp ke Tanggal
        </h4>
        <Input
          label="Epoch Timestamp (Detik atau Milidetik)"
          value={inputEpoch}
          onChange={(e) => setInputEpoch(e.target.value)}
          placeholder="1710000000"
        />

        {epochDate && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-subtle rounded border border-border text-xs">
            <div>
              <span className="text-muted block text-[11px]">Waktu Lokal</span>
              <span className="font-semibold text-dark mt-0.5 block">
                {epochDate.toLocaleString('id-ID')}
              </span>
            </div>
            <div>
              <span className="text-muted block text-[11px]">UTC / ISO 8601</span>
              <span className="font-mono text-dark mt-0.5 block">
                {epochDate.toISOString()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Date to Epoch */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
          Tanggal ke Timestamp
        </h4>
        <Input
          label="Pilih Tanggal & Waktu"
          type="datetime-local"
          value={inputDate}
          onChange={(e) => handleDateToEpoch(e.target.value)}
        />
      </div>
    </div>
  );
}
