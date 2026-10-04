'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wrench, Clock, Star } from 'lucide-react';
import { useTools } from '@/context/ToolsContext';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { recentTools, favorites } = useTools();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Tools', href: '/tools', icon: Wrench },
    { label: 'History', href: '/history', icon: Clock, badge: recentTools.length || undefined },
    { label: 'Favorites', href: '/favorites', icon: Star, badge: favorites.length || undefined },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border h-14 flex items-center justify-around px-2"
      aria-label="Mobile navigation"
    >
      {navItems.map((item) => {
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-medium transition-colors relative ${
              isActive ? 'text-primary' : 'text-muted hover:text-dark'
            }`}
          >
            <item.icon className="w-4 h-4 mb-0.5" />
            <span>{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute top-1 right-1/4 w-3.5 h-3.5 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
