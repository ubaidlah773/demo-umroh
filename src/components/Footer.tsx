import React from 'react';
import Link from 'next/link';
import { BookOpen, Award, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] mt-20 pt-12 pb-16 text-xs text-[#6B7280]">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-bold tracking-tight text-[#171717] block text-base">
              OfficeMaster
            </span>
            <p className="text-[#4B5563] max-w-sm leading-relaxed">
              Platform edukasi interaktif untuk belajar Microsoft Office dari level paling dasar hingga mahir. Dirancang bersih, modern, dan berorientasi pada latihan nyata di dunia kerja.
            </p>
            <div className="flex items-center gap-2 text-[#059669] font-medium pt-1 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Progres belajar tersimpan otomatis secara lokal di browser Anda.</span>
            </div>
          </div>

          {/* Kurikulum Aplikasi */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-[#171717] text-xs uppercase tracking-wider">
              Aplikasi & Modul
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/fundamentals" className="hover:text-[#171717] transition-colors">
                  0. Computer Fundamentals
                </Link>
              </li>
              <li>
                <Link href="/word" className="hover:text-[#171717] transition-colors">
                  1. Microsoft Word
                </Link>
              </li>
              <li>
                <Link href="/excel" className="hover:text-[#171717] transition-colors">
                  2. Microsoft Excel
                </Link>
              </li>
              <li>
                <Link href="/powerpoint" className="hover:text-[#171717] transition-colors">
                  3. Microsoft PowerPoint
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#059669] font-semibold text-[#059669] transition-colors">
                  📊 Dashboard Academy (16 Level)
                </Link>
              </li>
            </ul>
          </div>

          {/* Latihan & Sertifikasi */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-[#171717] text-xs uppercase tracking-wider">
              Latihan & Ujian
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/challenges" className="hover:text-[#171717] transition-colors">
                  105+ Formula Challenges
                </Link>
              </li>
              <li>
                <Link href="/shortcuts" className="hover:text-[#171717] transition-colors">
                  Shortcut Keyboard Trainer
                </Link>
              </li>
              <li>
                <Link href="/tips" className="hover:text-[#171717] transition-colors">
                  100+ Tips & Trik Rahasia
                </Link>
              </li>
              <li>
                <Link href="/errors" className="hover:text-[#171717] transition-colors">
                  Excel Error Troubleshooting
                </Link>
              </li>
              <li>
                <Link href="/exam" className="hover:text-[#171717] transition-colors font-medium text-[#2563EB]">
                  Ujian Sertifikasi 100 Soal 🏆
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-[#171717] transition-colors">
                  Library File Latihan (.xlsx)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
          <p>© {new Date().getFullYear()} OfficeMaster. Learn Microsoft Office from Zero to Hero.</p>
          <div className="flex items-center gap-4">
            <Link href="/learn" className="hover:text-[#171717] transition-colors">
              Kurikulum
            </Link>
            <Link href="/dashboard" className="hover:text-[#171717] transition-colors">
              Dashboard
            </Link>
            <Link href="/progress" className="hover:text-[#171717] transition-colors">
              Progress
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
