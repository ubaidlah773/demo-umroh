"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Cpu,
  GraduationCap,
  FileText,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Code2,
  ShieldCheck,
} from "lucide-react";

const navigationItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Skills", href: "/admin/skills", icon: Cpu },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "About & Hero", href: "/admin/about", icon: FileText },
  { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<{ name: string; username: string } | null>(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          const data = await res.json();
          setUser(data.user);
          setCheckingAuth(false);
        }
      } catch {
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center text-[#5D536B] font-mono text-xs">
        <div className="flex items-center gap-3 bg-white p-6 rounded-2xl border border-[#7D6B91]/15 shadow-card-subtle">
          <div className="w-5 h-5 border-2 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
          <span className="font-semibold">Verifying administrator session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#5D536B] flex flex-col md:flex-row font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#7D6B91]/15 shrink-0 shadow-card-subtle">
        {/* Brand Area */}
        <div className="p-6 border-b border-[#7D6B91]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/20 flex items-center justify-center p-1.5 shadow-card-subtle">
              <img
                src="/brand/ubai-logo-dark.png"
                alt="UBAI Logo"
                className="w-auto h-5 object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-[#272838] block">
                UBAI CMS
              </span>
              <span className="text-[10px] font-mono text-[#5D536B]">
                Ahmad Ubai Dullah
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Admin Sidebar">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-accent-blue text-white shadow-sm"
                    : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#5D536B]"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-[#7D6B91]/15 space-y-2">
          <div className="p-3 rounded-xl bg-[#F7F8FC] border border-[#7D6B91]/15 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-blue/10 text-accent-blue border border-accent-blue/20 flex items-center justify-center text-xs font-bold">
              AU
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#272838] truncate">
                {user?.name || "Ahmad Ubai"}
              </span>
              <span className="text-[10px] font-mono text-accent-blue flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
                Administrator
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#7D6B91]/15 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden p-2 rounded-xl bg-[#F7F8FC] text-[#5D536B] hover:text-[#272838] border border-[#7D6B91]/15"
              aria-label="Toggle Navigation Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#5D536B] font-mono">
              <ShieldCheck className="w-4 h-4 text-accent-blue" />
              <span>Admin Dashboard</span>
              <span>/</span>
              <span className="text-[#272838] font-bold capitalize">
                {pathname.replace("/admin", "").replace("/", "") || "Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#EEF0F8] text-[#272838] text-xs font-semibold border border-[#7D6B91]/20 shadow-card-subtle transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-accent-blue" />
            </a>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden flex"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-64 bg-white h-full p-4 flex flex-col justify-between border-r border-[#7D6B91]/20 shadow-card-elevated">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#7D6B91]/15 mb-4">
                <span className="font-extrabold text-sm text-[#272838]">UBAI CMS</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-[#5D536B] hover:text-[#272838]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-accent-blue text-white"
                          : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-xs text-red-600 hover:bg-red-50 border border-red-200 font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
