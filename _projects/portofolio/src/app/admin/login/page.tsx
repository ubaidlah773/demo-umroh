"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-[#5D536B] font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-16 h-16 rounded-2xl bg-white border border-[#7D6B91]/20 flex items-center justify-center p-2.5 mx-auto mb-4 shadow-card-subtle">
          <img
            src="/brand/ubai-logo-dark.png"
            alt="UBAI Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-center text-2xl font-extrabold tracking-tight text-[#272838]">
          UBAI CMS Portal
        </h1>
        <p className="mt-2 text-center text-xs sm:text-sm text-[#5D536B] font-medium">
          Sign in to manage projects, documentation images, and portfolio content.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-[#7D6B91]/15 shadow-card-elevated">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-[#272838] mb-1.5"
              >
                Username or Email
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5D536B]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white transition-all font-medium"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#272838] mb-1.5"
              >
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5D536B]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-[#F7F8FC] border border-[#7D6B91]/25 rounded-xl text-sm text-[#272838] placeholder-[#5D536B]/50 focus:outline-none focus:border-accent-blue focus:bg-white transition-all font-medium"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white text-sm font-semibold shadow-accent-sm focus:outline-none disabled:opacity-50 transition-all active:scale-[0.99] cursor-pointer"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#7D6B91]/15 text-center">
            <span className="text-[11px] font-mono text-[#5D536B]">
              Default credential for setup: <code className="text-accent-blue font-bold">admin123password</code>
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs text-[#5D536B] hover:text-accent-blue font-semibold transition-colors"
          >
            ← Return to Public Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
