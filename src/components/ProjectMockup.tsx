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
  GraduationCap,
  Plane,
  Coffee,
  ShoppingBag,
  Users,
  Compass,
} from "lucide-react";

interface ProjectMockupProps {
  type: "belajar-cerdas" | "lapas-tuban" | "queue-system" | "demo-lpk" | "demo-umroh" | "coffee-shop" | string;
}

export default function ProjectMockup({ type }: ProjectMockupProps) {
  const [activeRole, setActiveRole] = useState("Teacher");
  const [activeTabLapas, setActiveTabLapas] = useState("Klinik");
  const [activeCourse, setActiveCourse] = useState("Web Dev");
  const [activeUmrohTab, setActiveUmrohTab] = useState("Paket 9 Hari");
  const [activeCoffeeItem, setActiveCoffeeItem] = useState("Espresso");

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
                  <span className="text-[#272838] font-semibold">10:00 - 11:30</span>
                  <span className="text-[#272838] font-medium">Algoritma &amp; Pemrograman</span>
                  <span>Ruang 304</span>
                  <span className="text-[#7D6B91] text-[10px]">Upcoming</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 text-[#5D536B] items-center">
                  <span className="text-[#272838] font-semibold">13:00 - 14:30</span>
                  <span className="text-[#272838] font-medium">Basis Data Relasional</span>
                  <span>Lab Komputer 1</span>
                  <span className="text-[#7D6B91] text-[10px]">Scheduled</span>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-[#7D6B91]/10 flex items-center justify-between text-[10px] text-[#5D536B]">
                <span>Room capacity: 36/36 students</span>
                <span className="text-[#347FC4] font-mono">Sync status: OK</span>
              </div>
            </div>

            {/* Academic Event Calendar */}
            <div className="sm:col-span-4 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[#272838] flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-[#347FC4]" />
                    Academic Milestones
                  </span>
                  <span className="text-[10px] font-mono text-[#5D536B]">June 2026</span>
                </div>

                <div className="space-y-2 mt-3">
                  <div className="p-2 rounded-lg bg-[#EEF0F8] border-l-2 border-[#347FC4] text-[11px]">
                    <span className="font-semibold text-[#272838] block">Ujian Akhir Semester</span>
                    <span className="text-[10px] text-[#5D536B]">15 - 22 Juni 2026</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#EEF0F8] border-l-2 border-[#7D6B91] text-[11px]">
                    <span className="font-semibold text-[#272838] block">Rapat Pleno Guru &amp; Yayasan</span>
                    <span className="text-[10px] text-[#5D536B]">26 Juni 2026</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#EEF0F8] border-l-2 border-[#989FCE] text-[11px]">
                    <span className="font-semibold text-[#272838] block">Pembagian Rapor Siswa</span>
                    <span className="text-[10px] text-[#5D536B]">30 Juni 2026</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/15 text-center text-[10px] font-mono text-[#347FC4] font-semibold">
                Calendar Synchronized
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
              <span className="text-[#272838]">lapastuban.kemenkumham.go.id/internal</span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#347FC4] font-semibold px-2 py-0.5 rounded bg-[#347FC4]/10 border border-[#347FC4]/25">
            Public Portal &amp; Admin Intranet
          </span>
        </div>

        {/* Dashboard Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col gap-4 bg-[#F7F8FC]">
          {/* Module Selector */}
          <div className="flex items-center justify-between bg-white p-1.5 rounded-xl border border-[#7D6B91]/15 shadow-2xs overflow-x-auto">
            <div className="flex items-center gap-1">
              {[
                { name: "Public Portal", icon: Building2 },
                { name: "Klinik", icon: Activity },
                { name: "Payroll", icon: FileText },
                { name: "Satbang", icon: Shield },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTabLapas(tab.name);
                    }}
                    className={`px-3 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1.5 transition-all ${
                      activeTabLapas === tab.name
                        ? "bg-[#347FC4] text-white shadow-xs"
                        : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
            <span className="text-[10px] font-mono text-[#5D536B] hidden sm:inline px-2">
              CRUD Security: <strong className="text-[#347FC4]">CSRF &amp; Sanitized</strong>
            </span>
          </div>

          {/* Medical Records / Module CRUD Table */}
          <div className="p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-semibold text-[#272838] text-xs block">
                    {activeTabLapas === "Klinik"
                      ? "Data Rekam Medis & Kesehatan Warga Binaan"
                      : activeTabLapas === "Payroll"
                      ? "Komputasi Gaji & Tunjangan Pegawai"
                      : activeTabLapas === "Satbang"
                      ? "Administrasi Kegiatan Kerja & Pembinaan"
                      : "Manajemen Publikasi Berita & Transparansi Layanan"}
                  </span>
                  <span className="text-[10px] text-[#5D536B]">
                    Database: <code className="text-[#347FC4] font-mono">db_lapas_tuban.mysql</code>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#347FC4] bg-[#347FC4]/10 px-2 py-0.5 rounded border border-[#347FC4]/20 font-medium">
                  Verified Records
                </span>
              </div>

              {/* Data Table Mock */}
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="grid grid-cols-5 gap-1.5 text-[#5D536B] text-[10px] pb-1 border-b border-[#7D6B91]/15 font-semibold">
                  <span>ID REKOR</span>
                  <span>NAMA / SUBJEK</span>
                  <span>DIAGNOSIS / ITEM</span>
                  <span>TANGGAL</span>
                  <span>STATUS</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 text-[#5D536B] items-center">
                  <span className="font-semibold text-[#272838]">#MED-0428</span>
                  <span className="text-[#272838]">WBP Blok B-03</span>
                  <span className="text-[#347FC4]">Pemeriksaan Tensi Rutin</span>
                  <span>28 Mei 2026</span>
                  <span className="text-[#347FC4] font-bold text-[10px]">Tercatat</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 text-[#5D536B] items-center">
                  <span className="font-semibold text-[#272838]">#MED-0429</span>
                  <span className="text-[#272838]">WBP Blok A-12</span>
                  <span className="text-[#272838]">Konsultasi Dokter Gigi</span>
                  <span>29 Mei 2026</span>
                  <span className="text-[#7D6B91] text-[10px]">Selesai</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 text-[#5D536B] items-center">
                  <span className="font-semibold text-[#272838]">#MED-0430</span>
                  <span className="text-[#272838]">WBP Blok C-07</span>
                  <span className="text-[#272838]">Pemberian Vitamin &amp; Obat</span>
                  <span>30 Mei 2026</span>
                  <span className="text-[#347FC4] font-bold text-[10px]">Terverifikasi</span>
                </div>
              </div>
            </div>

            {/* Bottom Database Footer */}
            <div className="mt-3 pt-2 border-t border-[#7D6B91]/10 flex items-center justify-between text-[10px] text-[#5D536B]">
              <span className="flex items-center gap-1 font-mono">
                <Database className="w-3 h-3 text-[#347FC4]" />
                Transactions: Atomicity &amp; Integrity Guaranteed
              </span>
              <span className="text-[#347FC4] font-mono">SEO: 98/100</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "demo-lpk") {
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
              <span className="text-[#272838]">app.demolpk.internal/courses</span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#347FC4] font-semibold px-2 py-0.5 rounded bg-[#347FC4]/10 border border-[#347FC4]/25">
            Vocational Training Platform
          </span>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col gap-4 bg-[#F7F8FC]">
          <div className="flex items-center justify-between bg-white p-1.5 rounded-xl border border-[#7D6B91]/15 shadow-2xs">
            <div className="flex items-center gap-1">
              {["Web Dev", "Office Admin", "Graphic Design", "Networking"].map((course) => (
                <button
                  key={course}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCourse(course);
                  }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    activeCourse === course
                      ? "bg-[#347FC4] text-white shadow-xs"
                      : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                  }`}
                >
                  {course}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-[#5D536B] hidden sm:inline px-2">
              Batch: <strong className="text-[#347FC4]">Batch 2026-B</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 flex-1">
            <div className="sm:col-span-7 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[#272838] text-xs flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#347FC4]" />
                    {activeCourse} — Program Curriculum
                  </span>
                  <span className="text-[10px] font-mono text-[#347FC4] bg-[#347FC4]/10 px-2 py-0.5 rounded">
                    120 Jam Pelatihan
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px] mt-3">
                  <div className="p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 flex items-center justify-between">
                    <span className="font-medium text-[#272838]">Modul 1: Fundamental HTML &amp; CSS Layout</span>
                    <span className="text-[#347FC4] font-mono text-[10px]">Lengkap</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 flex items-center justify-between">
                    <span className="font-medium text-[#272838]">Modul 2: JavaScript DOM &amp; Logic</span>
                    <span className="text-[#347FC4] font-mono text-[10px]">Berjalan</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 flex items-center justify-between">
                    <span className="font-medium text-[#272838]">Modul 3: Laravel &amp; MySQL Database</span>
                    <span className="text-[#7D6B91] font-mono text-[10px]">Terjadwal</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-[#7D6B91]/10 flex items-center justify-between text-[10px] text-[#5D536B]">
                <span>Kuota Peserta: 24/25 Terisi</span>
                <span className="text-[#347FC4] font-semibold">Status Pendaftaran: Buka</span>
              </div>
            </div>

            <div className="sm:col-span-5 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="font-semibold text-[#272838] text-xs block mb-2">
                  Formulir Pendaftaran Online
                </span>
                <div className="space-y-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-[#EEF0F8] text-[#5D536B] font-mono">
                    <div className="text-[10px] text-[#5D536B]">Calon Peserta</div>
                    <div className="font-semibold text-[#272838]">Ahmad Maulana</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#EEF0F8] text-[#5D536B] font-mono">
                    <div className="text-[10px] text-[#5D536B]">Program Pilihan</div>
                    <div className="font-semibold text-[#347FC4]">{activeCourse}</div>
                  </div>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-[#347FC4]/10 border border-[#347FC4]/25 text-center text-[#347FC4] font-mono text-[10px] font-semibold">
                Validasi Berkas Otomatis
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "demo-umroh") {
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
              <span className="text-[#272838]">umroh.portal.internal/packages</span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#347FC4] font-semibold px-2 py-0.5 rounded bg-[#347FC4]/10 border border-[#347FC4]/25">
            Travel &amp; Pilgrimage Portal
          </span>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col gap-4 bg-[#F7F8FC]">
          <div className="flex items-center justify-between bg-white p-1.5 rounded-xl border border-[#7D6B91]/15 shadow-2xs">
            <div className="flex items-center gap-1">
              {["Paket 9 Hari", "Paket 12 Hari", "Umroh Plus Turki", "Haji Khusus"].map((pkg) => (
                <button
                  key={pkg}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveUmrohTab(pkg);
                  }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    activeUmrohTab === pkg
                      ? "bg-[#347FC4] text-white shadow-xs"
                      : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                  }`}
                >
                  {pkg}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-[#5D536B] hidden sm:inline px-2">
              Hotel: <strong className="text-[#347FC4]">Bintang 5 Dekat Masjidil Haram</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 flex-1">
            <div className="sm:col-span-8 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[#272838] text-xs flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-[#347FC4]" />
                    {activeUmrohTab} — Rencana Perjalanan
                  </span>
                  <span className="text-[10px] font-mono text-[#347FC4] font-bold">
                    Penerbangan Langsung
                  </span>
                </div>
                <div className="space-y-2 text-[11px] mt-3">
                  <div className="p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#272838] block">Hari 1 - 3: Ziarah Madinah Al-Munawwarah</span>
                      <span className="text-[10px] text-[#5D536B]">Masjid Nabawi, Raudhah &amp; Jabal Uhud</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#347FC4] bg-[#347FC4]/10 px-2 py-0.5 rounded">Hari 1-3</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#272838] block">Hari 4 - 8: Ibadah Umroh di Makkah</span>
                      <span className="text-[10px] text-[#5D536B]">Thawaf, Sa&apos;i, Tahallul &amp; Ziarah Makkah</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#347FC4] bg-[#347FC4]/10 px-2 py-0.5 rounded">Hari 4-8</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#7D6B91]/10 flex items-center justify-between text-[10px] text-[#5D536B]">
                <span>Jadwal Keberangkatan Terdekat: 12 Oktober 2026</span>
                <span className="text-[#347FC4] font-mono font-bold">Sisa Kursi: 6</span>
              </div>
            </div>

            <div className="sm:col-span-4 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="font-semibold text-[#272838] text-xs block mb-2">
                  Konsultasi Langsung
                </span>
                <p className="text-[11px] text-[#5D536B] leading-relaxed mb-3">
                  Dapatkan rincian biaya, jadwal manasik, dan informasi visa resmi Kemenag.
                </p>
                <div className="p-2.5 rounded-xl bg-[#EEF0F8] border border-[#7D6B91]/15 space-y-1">
                  <span className="text-[10px] font-mono text-[#5D536B] block">Estimasi Paket</span>
                  <span className="text-sm font-bold text-[#272838]">Mulai Rp 28.500.000</span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#347FC4] text-center text-white font-mono text-[10px] font-semibold shadow-xs">
                Hubungi Konsultan Travel
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "coffee-shop") {
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
              <span className="text-[#272838]">coffeeshop.internal/menu</span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[#347FC4] font-semibold px-2 py-0.5 rounded bg-[#347FC4]/10 border border-[#347FC4]/25">
            Modern Café Experience
          </span>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col gap-4 bg-[#F7F8FC]">
          <div className="flex items-center justify-between bg-white p-1.5 rounded-xl border border-[#7D6B91]/15 shadow-2xs">
            <div className="flex items-center gap-1">
              {["Espresso", "Cold Brew", "Caramel Latte", "Pastries"].map((item) => (
                <button
                  key={item}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCoffeeItem(item);
                  }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    activeCoffeeItem === item
                      ? "bg-[#347FC4] text-white shadow-xs"
                      : "text-[#5D536B] hover:text-[#272838] hover:bg-[#EEF0F8]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-[#5D536B] hidden sm:inline px-2">
              Beans: <strong className="text-[#347FC4]">100% Single Origin Arabica</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 flex-1">
            <div className="sm:col-span-8 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-[#272838] text-xs flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-[#347FC4]" />
                    Signature Brew: {activeCoffeeItem}
                  </span>
                  <span className="text-[10px] font-mono text-[#347FC4] bg-[#347FC4]/10 px-2 py-0.5 rounded font-bold">
                    Freshly Roasted
                  </span>
                </div>
                <div className="space-y-2 text-[11px] mt-3">
                  <div className="p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#272838] block">Double Shot Espresso</span>
                      <span className="text-[10px] text-[#5D536B]">Notes: Dark chocolate, hazelnut, citrus finish</span>
                    </div>
                    <span className="text-[#347FC4] font-mono font-bold">Rp 24.000</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F7F8FC] border border-[#7D6B91]/10 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#272838] block">Nitro Cold Brew (16 Hours Steep)</span>
                      <span className="text-[10px] text-[#5D536B]">Silky crema, low acidity, naturally sweet</span>
                    </div>
                    <span className="text-[#347FC4] font-mono font-bold">Rp 28.000</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#7D6B91]/10 flex items-center justify-between text-[10px] text-[#5D536B]">
                <span>Frontend: HTML5 + CSS3 + Vanilla JavaScript</span>
                <span className="text-[#347FC4] font-semibold">100% Responsive Grid</span>
              </div>
            </div>

            <div className="sm:col-span-4 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="font-semibold text-[#272838] text-xs block mb-2 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#347FC4]" />
                  Order Summary
                </span>
                <div className="space-y-1.5 text-[11px] py-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#5D536B]">1x {activeCoffeeItem}</span>
                    <span className="text-[#272838]">Rp 28.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5D536B]">Takeaway Bag</span>
                    <span className="text-[#347FC4]">Free</span>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-[#347FC4] text-center text-white font-mono text-[10px] font-semibold shadow-xs">
                Checkout Online
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generic Queue System Mockup
  return (
    <div className="w-full h-full rounded-2xl bg-white border border-[#7D6B91]/15 shadow-sm overflow-hidden flex flex-col font-sans select-none text-xs">
      <div className="bg-[#EEF0F8] px-4 py-2.5 border-b border-[#7D6B91]/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7D6B91]/40"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#989FCE]/50"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#347FC4]/70"></span>
          <div className="ml-3 px-3 py-1 rounded-md bg-white border border-[#7D6B91]/15 text-[11px] font-mono text-[#5D536B] flex items-center gap-1.5 shadow-2xs">
            <span className="text-[#347FC4]">https://</span>
            <span className="text-[#272838]">antrian.lapastuban.id/live-calling</span>
          </div>
        </div>
        <span className="font-mono text-[10px] text-[#347FC4] font-semibold px-2 py-0.5 rounded bg-[#347FC4]/10 border border-[#347FC4]/25">
          Real-Time Public Intake
        </span>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-4 bg-[#F7F8FC]">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 flex-1">
          <div className="sm:col-span-7 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-[#7D6B91]/15">
              <span className="text-xs font-semibold text-[#272838]">Layar Pemanggil Antrean</span>
              <span className="text-[10px] font-mono text-[#347FC4] bg-[#347FC4]/10 px-2 py-0.5 rounded font-bold">
                Audio Bell Aktif
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#EEF0F8] border border-[#7D6B91]/15 text-center my-2">
              <span className="text-[10px] font-mono text-[#5D536B] block">NOMOR ANTREAN AKTIF</span>
              <span className="text-3xl font-extrabold text-[#347FC4] font-mono tracking-wider">A-042</span>
              <span className="text-xs text-[#272838] font-semibold block mt-1">LOKET PENDAFTARAN 1</span>
            </div>
            <div className="pt-2 border-t border-[#7D6B91]/10 flex items-center justify-between text-[10px] text-[#5D536B]">
              <span>Status: Memanggil pengunjung...</span>
              <Volume2 className="w-3.5 h-3.5 text-[#347FC4] animate-pulse" />
            </div>
          </div>

          <div className="sm:col-span-5 p-3.5 rounded-xl bg-white border border-[#7D6B91]/15 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 border-b border-[#7D6B91]/15">
              <span className="text-xs font-semibold text-[#272838]">E-Tiket Kunjungan</span>
              <QrCode className="w-4 h-4 text-[#347FC4]" />
            </div>
            <div className="space-y-1.5 font-mono text-[11px] py-2">
              <div className="flex justify-between">
                <span className="text-[#5D536B]">Nomor:</span>
                <span className="text-[#272838] font-bold">REG-2026-118</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5D536B]">Sesi:</span>
                <span className="text-[#272838]">Pagi (09:00 - 11:30)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5D536B]">Metode:</span>
                <span className="text-[#347FC4] font-semibold">Online Booking</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-[#EEF0F8] border border-[#7D6B91]/15 text-[10px] text-[#5D536B] flex items-center justify-between font-mono">
              <span>Status Kuota</span>
              <span className="text-[#347FC4] font-bold">Terkonfirmasi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
