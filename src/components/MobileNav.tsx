'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Table, Trophy } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const items = [
    { href: '/', label: 'Home', icon: Home, exact: true },
    { href: '/learn', label: 'Learn', icon: BookOpen },
    { href: '/practice', label: 'Practice', icon: Table },
    { href: '/progress', label: 'Progress', icon: Trophy },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E7EB] px-2 py-1.5">
      <div className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 rounded-[6px] transition-colors ${
                isActive
                  ? 'text-[#171717] font-semibold'
                  : 'text-[#6B7280] hover:text-[#171717]'
              }`}
            >
              <Icon className="w-5 h-5 stroke-[1.8]" />
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
