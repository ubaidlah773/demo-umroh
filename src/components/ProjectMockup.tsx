"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Building2,
  FileText,
  Volume2,
  QrCode,
  Shield,
  Activity,
  ChevronRight,
  Database,
} from "lucide-react";

interface ProjectMockupProps {
  type: "belajar-cerdas" | "lapas-tuban" | "queue-system" | string;
}

export default function ProjectMockup({ type }: ProjectMockupProps) {
  const [activeRole, setActiveRole] = useState("Teacher");
  const [activeTabLapas, setActiveTabLapas] = useState("Klinik");

  if (type === "belajar-cerdas") {
    return (
      <div className="w-full h-full rounded-2xl bg-white border border-[#7D6B91]/15 shadow-sm overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* Browser Top Navigation Bar */}
        <div className="bg-[#EEF0F8] px-4 py-2.5 border-b border-[#7D6B91]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7D6B91]/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#989FCE]/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#347FC4]/70"></span>
            <div className="ml-3 px-3 py-1 rounded-md bg-white border border-[#7D6B91]/15 text-[11px] font-mono text-[#5D536B] flex items-center gap-1.5 shadow-2xs">
              <span className="text-[#347FC4]">https://</span>
              <span className="text-[#272838]">app.belajarcerdas.id/schedule</span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#347FC4] font-semibold px-2 py-0.5 rounded bg-[#347FC4]/10 border border-[#347FC4]/25">
            RBAC • 5 User Roles
          </span>
        </div>

        {/* Dashboard Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col gap-4 bg-[#F7F8FC]">
          {/* Multi-Role Switcher Bar */}
          <div className="flex items-center justify-between bg-white p-1.5 rounded-xl border border-[#7D6B91]/15 shadow-2xs overflow-x-auto">
            <div className="flex items-center gap-1">
              {["Teacher", "Student", "Principal", "Parent", "Foundation"].map((role) => (
                <button
                  key={role}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveRole(role);
                  }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    activeRole === role
                      ? "bg-[#347FC4] text-white shadow-xs"
                      : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-[#5D536B] hidden sm:inline px-2">
              Role: <strong className="text-[#347FC4]">{activeRole}</strong>
            </span>
          </div>

          {/* Main Grid: Schedule Timetable & Event Calendar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 flex-1">
            {/* Timetable Matrix */}
            <div className="sm:col-span-8 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[#272838] flex items-center gap-1.5 text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#347FC4]" />
                  Weekly Lesson Timetable
                </span>
                <span className="text-[10px] font-mono text-[#347FC4] bg-[#347FC4]/10 px-2 py-0.5 rounded border border-[#347FC4]/20 font-medium">
                  Collisions: 0
                </span>
              </div>

              {/* Matrix Schedule Slots */}
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="grid grid-cols-4 gap-1.5 text-[#5D536B] text-[10px] pb-1 border-b border-[#7D6B91]/15 font-semibold">
                  <span>TIME</span>
                  <span>SUBJECT</span>
                  <span>ROOM</span>
                  <span>STATUS</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 text-[#5D536B] items-center">
                  <span className="text-[#272838] font-semibold">08:00 - 09:30</span>
                  <span className="text-[#347FC4] font-medium">Informatika XI</span>
                  <span>Lab A2</span>
                  <span className="text-[#347FC4] text-[10px] font-bold">Active</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 text-[#5D536B] items-center">
                  <span className="text-[#272838] font-semibold">09:45 - 11:15</span>
                  <span className="text-[#272838] font-medium">Matematika Wajib</span>
                  <span>R. 204</span>
                  <span className="text-[#5D536B]/70 text-[10px]">Upcoming</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 text-[#5D536B] items-center">
                  <span className="text-[#272838] font-semibold">13:00 - 14:30</span>
                  <span className="text-[#5D536B] font-medium">Basis Data XII</span>
                  <span>Lab RPL</span>
                  <span className="text-[#5D536B]/70 text-[10px]">Scheduled</span>
                </div>
              </div>
            </div>

            {/* Academic Event Calendar Widget */}
            <div className="sm:col-span-4 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[#272838] flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#347FC4]" />
                    Academic Calendar
                  </span>
                  <span className="text-[10px] text-[#5D536B] font-mono">Term 2</span>
                </div>
                <div className="space-y-2 mt-2">
                  <div className="p-2 rounded-lg bg-[#EEF0F8] border border-[#347FC4]/25">
                    <span className="text-[10px] font-mono text-[#347FC4] font-bold block">JUN 12 - 19</span>
                    <span className="text-[#272838] text-[11px] font-medium block">
                      Penilaian Akhir Semester
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/15">
                    <span className="text-[10px] font-mono text-[#5D536B] block">JUN 24</span>
                    <span className="text-[#5D536B] text-[11px] block">
                      Rapat Yayasan & Guru
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#7D6B91]/15 flex items-center justify-between text-[10px] text-[#5D536B] font-mono">
                <span>Sync Status</span>
                <span className="text-[#347FC4] font-semibold">All Roles Synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "lapas-tuban") {
    return (
      <div className="w-full h-full rounded-2xl bg-white border border-[#7D6B91]/15 shadow-sm overflow-hidden flex flex-col font-sans select-none text-xs">
        {/* Browser Top Navigation Bar */}
        <div className="bg-[#EEF0F8] px-4 py-2.5 border-b border-[#7D6B91]/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7D6B91]/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#989FCE]/50"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#347FC4]/70"></span>
            <div className="ml-3 px-3 py-1 rounded-md bg-white border border-[#7D6B91]/15 text-[11px] font-mono text-[#5D536B] flex items-center gap-1.5 shadow-2xs">
              <span className="text-[#347FC4]">https://</span>
              <span className="text-[#272838]">lapastuban.kemenkumham.go.id/portal</span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#347FC4] font-semibold px-2 py-0.5 rounded bg-[#347FC4]/10 border border-[#347FC4]/25 flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Security & Auth Active
          </span>
        </div>

        {/* Dashboard Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col gap-4 bg-[#F7F8FC]">
          {/* Module Selector */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: "Portal", label: "Public Website", icon: Building2 },
              { id: "Payroll", label: "Digital Payroll", icon: FileText },
              { id: "Klinik", label: "Clinic Patient Data", icon: Activity },
              { id: "Satbang", label: "Satbang Admin", icon: Database },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTabLapas === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTabLapas(tab.id);
                  }}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                    isSelected
                      ? "bg-[#347FC4] text-white border-[#347FC4] shadow-xs"
                      : "bg-white border-[#7D6B91]/15 text-[#5D536B] hover:text-[#272838] hover:border-[#347FC4]/30"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-[#5D536B]"}`} />
                  <span className="text-[11px] font-medium truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Module View: Dynamic Schema & Data Table */}
          <div className="p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#7D6B91]/15">
              <span className="font-mono text-[11px] text-[#272838] flex items-center gap-1.5 font-semibold">
                <Database className="w-3.5 h-3.5 text-[#347FC4]" />
                Table:{" "}
                <span className="text-[#347FC4]">
                  {activeTabLapas === "Klinik"
                    ? "clinic_patient_records"
                    : activeTabLapas === "Payroll"
                    ? "payroll_disbursements"
                    : activeTabLapas === "Satbang"
                    ? "satbang_activities"
                    : "portal_announcements"}
                </span>
              </span>
              <span className="text-[10px] font-mono text-[#5D536B]">CRUD: Eloquent ORM</span>
            </div>

            {/* Table Mockup */}
            <div className="space-y-2 font-mono text-[11px] overflow-hidden">
              <div className="grid grid-cols-4 gap-2 text-[#5D536B] text-[10px] px-2 font-semibold">
                <span>RECORD_ID</span>
                <span>ENTRY_CATEGORY</span>
                <span>AUDIT_TIMESTAMP</span>
                <span>STATUS</span>
              </div>
              <div className="grid grid-cols-4 gap-2 p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 text-[#5D536B] items-center">
                <span className="text-[#272838] font-bold">#REC-2026-081</span>
                <span className="text-[#347FC4] font-medium">Rutin Checkup</span>
                <span className="text-[#5D536B] text-[10px]">2026-05-14 09:20</span>
                <span className="text-[#347FC4] text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 text-[#5D536B] items-center">
                <span className="text-[#272838] font-bold">#REC-2026-082</span>
                <span className="text-[#272838]">Konsultasi Medis</span>
                <span className="text-[#5D536B] text-[10px]">2026-05-14 10:45</span>
                <span className="text-[#347FC4] text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Logged
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 text-[#5D536B] items-center">
                <span className="text-[#272838] font-bold">#REC-2026-083</span>
                <span className="text-[#5D536B]">Farmasi & Resep</span>
                <span className="text-[#5D536B] text-[10px]">2026-05-14 11:30</span>
                <span className="text-[#347FC4] text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Dispatched
                </span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#7D6B91]/15 flex items-center justify-between text-[10px] font-mono text-[#5D536B]">
              <span>Database Optimization: Indexed Queries</span>
              <span className="text-[#347FC4] font-semibold">MySQL 8.0 • InnoDB</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Queue System Mockup
  return (
    <div className="w-full h-full rounded-2xl bg-white border border-[#7D6B91]/15 shadow-sm overflow-hidden flex flex-col font-sans select-none text-xs">
      {/* Browser Top Navigation Bar */}
      <div className="bg-[#EEF0F8] px-4 py-2.5 border-b border-[#7D6B91]/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7D6B91]/40"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#989FCE]/50"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#347FC4]/70"></span>
          <div className="ml-3 px-3 py-1 rounded-md bg-white border border-[#7D6B91]/15 text-[11px] font-mono text-[#5D536B] flex items-center gap-1.5 shadow-2xs">
            <span className="text-[#347FC4]">https://</span>
            <span className="text-[#272838]">antrian.lapastuban.id/display</span>
          </div>
        </div>
        <span className="font-mono text-[10px] text-[#347FC4] font-semibold px-2 py-0.5 rounded bg-[#347FC4]/10 border border-[#347FC4]/25 flex items-center gap-1">
          <Volume2 className="w-3 h-3" />
          Real-Time Audio Calling
        </span>
      </div>

      {/* Dashboard Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3.5 bg-[#F7F8FC]">
        {/* Real-Time Queue Monitor Board */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Active Call Big Number */}
          <div className="sm:col-span-7 p-4 rounded-xl bg-white border border-[#347FC4]/30 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#347FC4] font-bold">
                Sedang Dipanggil / Currently Calling
              </span>
              <span className="px-2 py-0.5 rounded bg-[#347FC4]/10 text-[#347FC4] font-mono text-[10px] font-bold">
                LIVE DISPLAY
              </span>
            </div>

            <div className="my-2 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-[#5D536B] font-mono block">NOMOR ANTRIAN</span>
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#272838] tracking-tight">
                  A-042
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#5D536B] font-mono block">TUJUAN</span>
                <span className="font-display font-bold text-2xl text-[#347FC4]">LOKET 1</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#7D6B91]/15 flex items-center justify-between text-[10px] font-mono text-[#5D536B]">
              <span className="flex items-center gap-1 text-[#347FC4] font-semibold">
                <Volume2 className="w-3 h-3" /> Bell Broadcast Triggered
              </span>
              <span>Visitor: Terverifikasi</span>
            </div>
          </div>

          {/* Visitor Electronic Ticket Preview */}
          <div className="sm:col-span-5 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-[#7D6B91]/15">
              <span className="text-xs font-semibold text-[#272838]">E-Tiket Kunjungan</span>
              <QrCode className="w-4 h-4 text-[#347FC4]" />
            </div>

            <div className="space-y-1.5 font-mono text-[11px] py-2">
              <div className="flex justify-between">
                <span className="text-[#5D536B]">Nomor Registrasi:</span>
                <span className="text-[#272838] font-bold">REG-2026-118</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5D536B]">Sesi Kunjungan:</span>
                <span className="text-[#272838]">Pagi (09:00 - 11:30)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5D536B]">Metode:</span>
                <span className="text-[#347FC4] font-semibold">Registrasi Online</span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-[#EEF0F8] border border-[#7D6B91]/15 text-[10px] text-[#5D536B] flex items-center justify-between font-mono">
              <span>Status Kuota</span>
              <span className="text-[#347FC4] font-bold">Terkonfirmasi</span>
            </div>
          </div>
        </div>

        {/* Counter Rows & Queue Calling Triggers */}
        <div className="grid grid-cols-3 gap-2">
          {["Loket 1", "Loket 2", "Loket 3"].map((counter, idx) => (
            <div
              key={counter}
              className={`p-2.5 rounded-xl border flex items-center justify-between ${
                idx === 0
                  ? "bg-[#EEF0F8] border-[#347FC4]/40 text-[#272838]"
                  : "bg-white border-[#7D6B91]/15 text-[#5D536B]"
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-[#5D536B] block">{counter}</span>
                <span className="text-xs font-bold text-[#272838]">
                  {idx === 0 ? "A-042 (Serving)" : idx === 1 ? "B-018 (Next)" : "A-043 (Wait)"}
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#347FC4] opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
