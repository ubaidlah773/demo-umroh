import React from "react";
import Image from "next/image";
import { ProgramItem } from "@/types";
import { ArrowRight, Clock, Calendar, CheckSquare } from "lucide-react";

interface ProgramCardProps {
  program: ProgramItem;
  onSelect: (program: ProgramItem) => void;
}

export default function ProgramCard({ program, onSelect }: ProgramCardProps) {
  return (
    <div
      onClick={() => onSelect(program)}
      className="group bg-white rounded-lg border border-slate-200 hover:border-navy-900 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      <div>
        {/* Thumbnail Image */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
          <Image
            src={program.image}
            alt={program.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-navy-950 text-white">
              {program.category}
            </span>
            {program.badge && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-crimson-700 text-white">
                {program.badge}
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-navy-950 mb-1 group-hover:text-crimson-700 transition-colors">
            {program.title}
          </h3>

          <p className="text-xs font-medium text-slate-500 mb-3">
            {program.tagline}
          </p>

          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {program.description}
          </p>

          {/* Structured Key Facts */}
          <div className="space-y-2 py-3 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Durasi:
              </span>
              <span className="font-semibold text-navy-950">{program.duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Jadwal:
              </span>
              <span className="font-semibold text-navy-950 truncate max-w-[140px] text-right">
                {program.schedule}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-navy-950 group-hover:text-crimson-700 transition-colors">
        <span>Rincian & Persyaratan</span>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-crimson-700 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}
