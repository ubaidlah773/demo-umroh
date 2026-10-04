'use client';

import React, { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';

interface ExcelSimulatorProps {
  initialCells?: Record<string, string | number>;
  initialFormula?: string;
  targetCell?: string; // where the formula lives, default B5
  title?: string;
  description?: string;
}

const DEFAULT_CELLS: Record<string, string | number> = {
  A1: 'Product',
  B1: 'Price',
  A2: 'Laptop',
  B2: 8000000,
  A3: 'Mouse',
  B3: 250000,
  A4: 'Keyboard',
  B4: 500000,
  A5: 'Total',
  B5: '=SUM(B2:B4)',
};

export default function ExcelSimulator({
  initialCells,
  initialFormula = '=SUM(B2:B4)',
  targetCell = 'B5',
  title,
  description,
}: ExcelSimulatorProps) {
  const [cells, setCells] = useState<Record<string, string | number>>(() => ({
    ...DEFAULT_CELLS,
    ...(initialCells || {}),
  }));

  const [activeCell, setActiveCell] = useState<string>('B2');
  const [formulaInput, setFormulaInput] = useState<string>(initialFormula);

  const handleCellChange = (cellKey: string, val: string) => {
    const num = Number(val);
    setCells((prev) => ({
      ...prev,
      [cellKey]: !isNaN(num) && val.trim() !== '' ? num : val,
    }));
  };

  const resetData = () => {
    setCells({
      ...DEFAULT_CELLS,
      ...(initialCells || {}),
    });
    setFormulaInput(initialFormula);
  };

  // Evaluate formula in real time
  const evaluatedTotal = useMemo(() => {
    const f = formulaInput.trim().toUpperCase();

    // 1. SUM
    if (f.startsWith('=SUM(') && f.endsWith(')')) {
      const range = f.substring(5, f.length - 1);
      if (range.includes(':')) {
        const [start, end] = range.split(':');
        const startRow = parseInt(start.substring(1), 10);
        const endRow = parseInt(end.substring(1), 10);
        const col = start.charAt(0);

        let sum = 0;
        for (let r = startRow; r <= endRow; r++) {
          const val = cells[`${col}${r}`];
          const n = typeof val === 'number' ? val : parseFloat(String(val));
          if (!isNaN(n)) sum += n;
        }
        return sum;
      }
    }

    // 2. AVERAGE
    if (f.startsWith('=AVERAGE(') && f.endsWith(')')) {
      const range = f.substring(9, f.length - 1);
      if (range.includes(':')) {
        const [start, end] = range.split(':');
        const startRow = parseInt(start.substring(1), 10);
        const endRow = parseInt(end.substring(1), 10);
        const col = start.charAt(0);

        let sum = 0;
        let count = 0;
        for (let r = startRow; r <= endRow; r++) {
          const val = cells[`${col}${r}`];
          const n = typeof val === 'number' ? val : parseFloat(String(val));
          if (!isNaN(n)) {
            sum += n;
            count++;
          }
        }
        return count > 0 ? Math.round(sum / count) : 0;
      }
    }

    // 3. Simple addition
    const rawSum =
      (Number(cells['B2']) || 0) +
      (Number(cells['B3']) || 0) +
      (Number(cells['B4']) || 0);
    return rawSum;
  }, [cells, formulaInput]);

  const columns = ['A', 'B', 'C'];
  const rows = [1, 2, 3, 4, 5];

  // Active cell display value for formula bar
  const activeValue =
    activeCell === targetCell ? formulaInput : String(cells[activeCell] ?? '');

  return (
    <div className="w-full my-6 bg-white border border-[#D1D5DB] rounded-[6px] overflow-hidden font-sans text-xs select-none">
      {/* Title / Description Bar if provided */}
      {(title || description) && (
        <div className="px-3 py-2 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            {title && <span className="font-semibold text-[#171717]">{title}</span>}
            {description && (
              <span className="text-[#6B7280] ml-2 text-[11px]">{description}</span>
            )}
          </div>
          <button
            onClick={resetData}
            className="flex items-center gap-1 text-[11px] text-[#6B7280] hover:text-[#171717]"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      )}

      {/* Real Excel Formula Bar */}
      <div className="flex items-center border-b border-[#E5E7EB] bg-[#F9FAFB] px-2 py-1 gap-2">
        {/* Name box */}
        <div className="w-12 h-6 flex items-center justify-center font-mono font-medium text-[11px] text-[#374151] border border-[#D1D5DB] bg-white rounded-[3px]">
          {activeCell}
        </div>

        {/* fx symbol */}
        <span className="font-serif italic font-bold text-[#6B7280] text-[13px] px-1">
          fx
        </span>

        {/* Formula Input */}
        <input
          type="text"
          value={activeCell === targetCell ? formulaInput : activeValue}
          onChange={(e) => {
            if (activeCell === targetCell) {
              setFormulaInput(e.target.value);
            } else {
              handleCellChange(activeCell, e.target.value);
            }
          }}
          className="flex-1 h-6 px-2 bg-white border border-[#D1D5DB] rounded-[3px] font-mono text-xs text-[#171717] focus:outline-none focus:border-[#16A34A]"
        />
      </div>

      {/* Spreadsheet Table Grid */}
      <div className="overflow-x-auto bg-white">
        <table className="w-full border-collapse text-left table-fixed">
          <thead>
            <tr className="bg-[#F3F4F6] text-[#6B7280] font-medium text-[11px]">
              <th className="w-10 border border-[#D1D5DB] text-center py-1"></th>
              <th className="border border-[#D1D5DB] px-3 py-1 text-center w-1/2 font-mono">
                A
              </th>
              <th className="border border-[#D1D5DB] px-3 py-1 text-center w-1/2 font-mono">
                B
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row}>
                {/* Row number header */}
                <td className="bg-[#F3F4F6] border border-[#D1D5DB] text-center font-mono text-[11px] text-[#6B7280] py-1 select-none">
                  {row}
                </td>

                {/* Column A */}
                {(() => {
                  const keyA = `A${row}`;
                  const isTargetA = keyA === targetCell;
                  const isActiveA = activeCell === keyA;
                  const valA = cells[keyA] ?? '';

                  return (
                    <td
                      onClick={() => setActiveCell(keyA)}
                      className={`border border-[#D1D5DB] p-0 relative h-7 ${
                        isActiveA ? 'outline outline-2 outline-[#16A34A] z-10' : ''
                      } ${row === 1 || row === 5 ? 'font-semibold text-[#171717]' : 'text-[#374151]'}`}
                    >
                      <input
                        type="text"
                        value={valA}
                        onChange={(e) => handleCellChange(keyA, e.target.value)}
                        className={`w-full h-full px-2.5 bg-transparent border-0 focus:outline-none text-xs ${
                          row === 1 ? 'font-semibold text-[#171717]' : 'text-[#374151]'
                        } ${row === 5 ? 'font-semibold' : ''}`}
                      />
                    </td>
                  );
                })()}

                {/* Column B */}
                {(() => {
                  const keyB = `B${row}`;
                  const isTargetB = keyB === targetCell;
                  const isActiveB = activeCell === keyB;
                  const valB = isTargetB
                    ? evaluatedTotal.toLocaleString('id-ID')
                    : cells[keyB] ?? '';

                  return (
                    <td
                      onClick={() => setActiveCell(keyB)}
                      className={`border border-[#D1D5DB] p-0 relative h-7 ${
                        isActiveB ? 'outline outline-2 outline-[#16A34A] z-10' : ''
                      } ${row === 5 ? 'bg-[#F0FDF4] font-bold text-[#16A34A]' : 'text-[#374151]'}`}
                    >
                      <input
                        type="text"
                        disabled={isTargetB}
                        value={valB}
                        onChange={(e) => handleCellChange(keyB, e.target.value)}
                        className={`w-full h-full px-2.5 text-right bg-transparent border-0 focus:outline-none font-mono text-xs ${
                          row === 1 ? 'text-left font-sans font-semibold text-[#171717]' : ''
                        } ${row === 5 ? 'font-bold text-[#16A34A] cursor-pointer' : ''}`}
                      />
                    </td>
                  );
                })()}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Spreadsheet Status Footer */}
      <div className="bg-[#F9FAFB] border-t border-[#E5E7EB] px-3 py-1 flex items-center justify-between text-[11px] text-[#6B7280]">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-white border border-[#D1D5DB] border-b-0 rounded-t-[3px] font-medium text-[#171717]">
            Sheet1
          </span>
          <span className="text-[10px]">Ready</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span>Ubah angka di atas untuk uji rumus</span>
          <span className="text-[#16A34A] font-semibold">
            Total: Rp{evaluatedTotal.toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </div>
  );
}
