"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Briefcase,
  Cpu,
  Image as ImageIcon,
  Plus,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Settings,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    totalExperience: 0,
    totalSkills: 0,
    totalMedia: 0,
    recentProjects: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projRes, expRes, skillRes, mediaRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/experience"),
          fetch("/api/skills"),
          fetch("/api/media"),
        ]);

        const projData = await projRes.json();
        const expData = await expRes.json();
        const skillData = await skillRes.json();
        const mediaData = await mediaRes.json();

        const projects = projData.projects || [];
        const publishedCount = projects.filter((p: any) => p.published).length;

        let skillCount = 0;
        if (skillData.categories) {
          skillData.categories.forEach((cat: any) => {
            skillCount += cat.skills?.length || 0;
          });
        }

        setStats({
          totalProjects: projects.length,
          publishedProjects: publishedCount,
          totalExperience: expData.experiences?.length || 0,
          totalSkills: skillCount,
          totalMedia: mediaData.media?.length || 0,
          recentProjects: projects.slice(0, 5),
        });
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-palette-lavender/70 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
          <span>Loading dashboard analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#7D6B91]/15 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#272838] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#5D536B] mt-1 font-medium">
            Manage your personal portfolio content, project documentation, and site settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-accent-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/media"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-[#EEF0F8] text-[#272838] text-xs font-semibold border border-[#7D6B91]/20 shadow-card-subtle transition-colors"
          >
            <ImageIcon className="w-4 h-4 text-accent-blue" />
            <span>Upload Media</span>
          </Link>
        </div>
      </div>

      {/* Real Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#5D536B] font-semibold block mb-1">PROJECTS</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#272838]">{stats.totalProjects}</span>
              <span className="text-xs font-mono text-accent-blue font-bold">
                ({stats.publishedProjects} live)
              </span>
            </div>
            <Link
              href="/admin/projects"
              className="text-[11px] text-accent-blue font-semibold hover:underline mt-2 inline-flex items-center gap-1"
            >
              <span>Manage projects</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
            <FolderKanban className="w-6 h-6" />
          </div>
        </div>

        {/* Experience Entries Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#5D536B] font-semibold block mb-1">CAREER TIMELINE</span>
            <span className="text-3xl font-extrabold text-[#272838]">{stats.totalExperience}</span>
            <span className="text-xs text-[#5D536B] block mt-1">Verified CV Positions</span>
            <Link
              href="/admin/experience"
              className="text-[11px] text-accent-blue font-semibold hover:underline mt-2 inline-flex items-center gap-1"
            >
              <span>Manage experience</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#EEF0F8] border border-[#7D6B91]/20 flex items-center justify-center text-[#5D536B]">
            <Briefcase className="w-6 h-6 text-accent-blue" />
          </div>
        </div>

        {/* Skills Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#5D536B] font-semibold block mb-1">TECHNICAL STACK</span>
            <span className="text-3xl font-extrabold text-[#272838]">{stats.totalSkills}</span>
            <span className="text-xs text-[#5D536B] block mt-1">Across 5 Categories</span>
            <Link
              href="/admin/skills"
              className="text-[11px] text-accent-blue font-semibold hover:underline mt-2 inline-flex items-center gap-1"
            >
              <span>Manage skills</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#EEF0F8] border border-[#7D6B91]/20 flex items-center justify-center text-accent-blue">
            <Cpu className="w-6 h-6" />
          </div>
        </div>

        {/* Media Library Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#5D536B] font-semibold block mb-1">MEDIA ASSETS</span>
            <span className="text-3xl font-extrabold text-[#272838]">{stats.totalMedia}</span>
            <span className="text-xs text-[#5D536B] block mt-1">Screenshots &amp; Mockups</span>
            <Link
              href="/admin/media"
              className="text-[11px] text-accent-blue font-semibold hover:underline mt-2 inline-flex items-center gap-1"
            >
              <span>Open media library</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
            <ImageIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Navigation & Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Recent Projects & Quick Edit */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#272838] flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-accent-blue" />
              <span>Projects In Content Repository</span>
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-accent-blue hover:underline font-semibold"
            >
              View All ({stats.totalProjects})
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#7D6B91]/15 shadow-card-subtle overflow-hidden divide-y divide-[#7D6B91]/10">
            {stats.recentProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F7F8FC] transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  <span className="font-mono text-xs font-bold text-accent-blue bg-[#F7F8FC] border border-[#7D6B91]/20 px-2 py-1 rounded-md">
                    {project.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#272838]">{project.title}</span>
                      {project.published ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-blue/10 text-accent-blue border border-accent-blue/20 font-semibold">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EEF0F8] text-[#5D536B] border border-[#7D6B91]/20">
                          Draft
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#5D536B] block mt-0.5 font-medium">
                      {project.subtitle} • {project.period}
                    </span>
                    <span className="text-[11px] font-mono text-[#5D536B]/70 mt-1 block">
                      {project.images?.length || 0} documentation images attached
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <a
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-[#5D536B] hover:text-[#272838] bg-[#F7F8FC] hover:bg-[#EEF0F8] border border-[#7D6B91]/20 transition-colors shadow-card-subtle"
                    title="View public case study"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-accent-blue hover:bg-[#2C6EA8] text-white text-xs font-semibold shadow-accent-sm transition-colors"
                  >
                    Edit Content &amp; Media
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: CMS Architecture & System Info */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-base font-bold text-[#272838] flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent-blue" />
            <span>CMS Architecture</span>
          </h2>

          <div className="p-5 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-[#7D6B91]/10">
              <span className="text-[#5D536B]">Database Engine</span>
              <span className="font-mono text-accent-blue font-bold">Prisma ORM • SQLite / Postgres</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-[#7D6B91]/10">
              <span className="text-[#5D536B]">Media Storage</span>
              <span className="font-mono text-accent-blue font-bold">Persistent Disk / Cloud Ready</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-[#7D6B91]/10">
              <span className="text-[#5D536B]">Public Layout Engine</span>
              <span className="font-mono text-[#272838] font-bold">Next.js 14 App Router</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#5D536B]">Session Security</span>
              <span className="font-mono text-accent-blue font-bold">HMAC-SHA256 Token</span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="p-5 rounded-2xl bg-white border border-[#7D6B91]/15 shadow-card-subtle space-y-3">
            <span className="text-xs font-mono text-[#272838] uppercase tracking-wider block font-bold">
              Management Shortcuts
            </span>
            <div className="space-y-1.5">
              <Link
                href="/admin/about"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8FC] text-[#5D536B] hover:text-[#272838] text-xs font-medium transition-colors"
              >
                <span>Edit Hero &amp; About Text</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#5D536B]/60" />
              </Link>
              <Link
                href="/admin/experience"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8FC] text-[#5D536B] hover:text-[#272838] text-xs font-medium transition-colors"
              >
                <span>Edit Work Experience Timeline</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#5D536B]/60" />
              </Link>
              <Link
                href="/admin/skills"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8FC] text-[#5D536B] hover:text-[#272838] text-xs font-medium transition-colors"
              >
                <span>Edit Technical Stack Skills</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#5D536B]/60" />
              </Link>
              <Link
                href="/admin/education"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8FC] text-[#5D536B] hover:text-[#272838] text-xs font-medium transition-colors"
              >
                <span>Edit Education &amp; Coursework</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#5D536B]/60" />
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8FC] text-[#5D536B] hover:text-[#272838] text-xs font-medium transition-colors"
              >
                <span>Edit Contact &amp; SEO Settings</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#5D536B]/60" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
