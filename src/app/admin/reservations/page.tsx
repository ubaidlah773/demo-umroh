"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarCheck,
  Users,
  Clock,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Filter,
  RefreshCw,
  Phone,
  Mail,
  X,
} from "lucide-react";

interface ReservationItem {
  id: string;
  bookingCode: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guestCount: number;
  seating: string;
  specialRequest?: string | null;
  occasion?: string | null;
  status: "confirmed" | "pending" | "completed" | "cancelled" | "no_show";
  createdAt: string;
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [stats, setStats] = useState({
    todayCount: 0,
    todayGuests: 0,
    todayAvailable: 100,
  });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDetail, setSelectedDetail] = useState<ReservationItem | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/reservations?admin=true");
      const data = await res.json();
      if (data.success) {
        setReservations(data.data || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load admin reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus as any } : r))
        );
        if (selectedDetail && selectedDetail.id === id) {
          setSelectedDetail({ ...selectedDetail, status: newStatus as any });
        }
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = reservations.filter((r) => {
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    const matchSearch =
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-700 border-rose-500/20";
      case "no_show":
        return "bg-amber-500/10 text-amber-700 border-amber-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-espresso-900 font-semibold tracking-tight">
            Reservation Management
          </h1>
          <p className="text-sm text-warmgray-500 mt-1">
            Monitor real-time restaurant table bookings, capacity, and guest records.
          </p>
        </div>

        <button
          onClick={fetchReservations}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ivory-50 border border-espresso-900/10 hover:bg-ivory-200 text-espresso-900 text-xs font-mono transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>REFRESH</span>
        </button>
      </div>

      {/* KPI Stats Cards (Section 23 Requirements) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-ivory-50 border border-espresso-900/10 shadow-sm">
          <span className="font-mono text-[10px] uppercase tracking-wider text-champagne-600 block mb-1">
            TODAY&apos;S RESERVATIONS
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-4xl font-normal text-espresso-900">
              {stats.todayCount}
            </span>
            <span className="text-xs text-warmgray-500 font-mono">TABLES</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-ivory-50 border border-espresso-900/10 shadow-sm">
          <span className="font-mono text-[10px] uppercase tracking-wider text-champagne-600 block mb-1">
            TODAY&apos;S TOTAL GUESTS
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-4xl font-normal text-espresso-900">
              {stats.todayGuests}
            </span>
            <span className="text-xs text-warmgray-500 font-mono">PERSONS</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-ivory-50 border border-espresso-900/10 shadow-sm">
          <span className="font-mono text-[10px] uppercase tracking-wider text-champagne-600 block mb-1">
            AVAILABLE CAPACITY
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-4xl font-normal text-olive-700">
              {stats.todayAvailable}
            </span>
            <span className="text-xs text-warmgray-500 font-mono">/ 100 SEATS</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-ivory-50 border border-espresso-900/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-warmgray-400" />
          <input
            type="text"
            placeholder="Search guest, code, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-ivory-100 border border-espresso-900/10 text-xs text-espresso-900 placeholder:text-warmgray-400 outline-none focus:border-champagne-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {["all", "confirmed", "completed", "cancelled", "no_show"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === st
                  ? "bg-espresso-900 text-ivory-100 font-semibold"
                  : "bg-ivory-100 text-warmgray-600 hover:bg-ivory-200"
              }`}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-2xl border border-espresso-900/10 bg-ivory-50 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-ivory-200/60 font-mono text-[10px] uppercase tracking-wider text-warmgray-600 border-b border-espresso-900/10">
              <tr>
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Guest</th>
                <th className="py-3.5 px-4">People</th>
                <th className="py-3.5 px-4">Seating</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-espresso-900/5 font-sans">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-warmgray-400 font-mono text-xs">
                    NO RESERVATIONS FOUND
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-ivory-100/70 transition-colors">
                    <td className="py-4 px-4 font-mono text-xs font-semibold text-espresso-900">
                      {item.bookingCode}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs">
                      <div>{item.date}</div>
                      <div className="text-champagne-700 font-medium">{item.time} WIB</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-espresso-900">{item.customerName}</div>
                      <div className="text-xs text-warmgray-500 font-mono">{item.phone}</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-espresso-800">
                      {item.guestCount} {item.guestCount === 1 ? "Guest" : "Guests"}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-warmgray-600">
                      {item.seating}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider border font-medium ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedDetail(item)}
                          className="p-1.5 rounded-md hover:bg-ivory-200 text-espresso-900 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {item.status === "confirmed" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "completed")}
                              disabled={updatingId === item.id}
                              className="px-2 py-1 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 font-mono text-[10px] uppercase transition-colors cursor-pointer"
                              title="Mark Completed"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "no_show")}
                              disabled={updatingId === item.id}
                              className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 font-mono text-[10px] uppercase transition-colors cursor-pointer"
                              title="Mark No-Show"
                            >
                              No-Show
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "cancelled")}
                              disabled={updatingId === item.id}
                              className="px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 font-mono text-[10px] uppercase transition-colors cursor-pointer"
                              title="Cancel"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {item.status === "cancelled" && (
                          <button
                            onClick={() => handleUpdateStatus(item.id, "confirmed")}
                            disabled={updatingId === item.id}
                            className="px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 font-mono text-[10px] uppercase transition-colors cursor-pointer"
                            title="Reconfirm"
                          >
                            Re-Open
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso-950/60 backdrop-blur-sm">
          <div className="bg-ivory-50 border border-espresso-900/15 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-ivory-200 text-espresso-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-mono text-xs uppercase tracking-widest text-champagne-600 block mb-1">
              RESERVATION DOSSIER
            </span>
            <h3 className="font-serif text-2xl text-espresso-900 mb-6">
              {selectedDetail.bookingCode}
            </h3>

            <div className="space-y-4 text-sm font-sans mb-6">
              <div>
                <span className="font-mono text-[10px] uppercase text-warmgray-500 block">GUEST</span>
                <p className="font-medium text-espresso-900 text-base">{selectedDetail.customerName}</p>
                <p className="text-xs text-warmgray-600 font-mono">{selectedDetail.phone} · {selectedDetail.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase text-warmgray-500 block">DATE & TIME</span>
                  <p className="font-medium text-espresso-900">{selectedDetail.date}</p>
                  <p className="text-xs text-champagne-700 font-mono">{selectedDetail.time} WIB</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-warmgray-500 block">PARTY & SEATING</span>
                  <p className="font-medium text-espresso-900">{selectedDetail.guestCount} Guests</p>
                  <p className="text-xs text-warmgray-600 font-mono">{selectedDetail.seating}</p>
                </div>
              </div>

              {selectedDetail.occasion && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-warmgray-500 block">OCCASION</span>
                  <p className="text-espresso-900">{selectedDetail.occasion}</p>
                </div>
              )}

              {selectedDetail.specialRequest && (
                <div>
                  <span className="font-mono text-[10px] uppercase text-warmgray-500 block">SPECIAL REQUEST</span>
                  <p className="p-3 rounded-lg bg-ivory-200/50 text-espresso-800 italic text-xs">
                    &ldquo;{selectedDetail.specialRequest}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-espresso-900/10 flex items-center justify-between">
              <span className="font-mono text-[10px] text-warmgray-400">
                Created: {new Date(selectedDetail.createdAt).toLocaleString("id-ID")}
              </span>
              <button
                onClick={() => setSelectedDetail(null)}
                className="px-4 py-2 rounded-lg bg-espresso-900 text-ivory-100 font-mono text-xs uppercase cursor-pointer hover:bg-champagne-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
