'use client';

import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  PieChart, 
  Filter, 
  RefreshCw, 
  CheckCircle2, 
  ArrowUpRight,
  Layers,
  Calendar,
  MapPin
} from 'lucide-react';

interface Transaction {
  id: string;
  month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  region: 'DKI Jakarta' | 'Surabaya' | 'Bandung' | 'Medan';
  category: 'Elektronik' | 'Gadget & IT' | 'Aksesoris' | 'Office Supply';
  product: string;
  revenue: number;
  cost: number;
  orders: number;
}

// 48 simulated aggregated data rows across 4 quarters, 4 regions, 4 categories
const RAW_SIMULATED_DATA: Transaction[] = [
  // Q1
  { id: '1', month: 'Jan', quarter: 'Q1', region: 'DKI Jakarta', category: 'Elektronik', product: 'Smart TV 55 Inch 4K', revenue: 64000000, cost: 44000000, orders: 12 },
  { id: '2', month: 'Jan', quarter: 'Q1', region: 'DKI Jakarta', category: 'Gadget & IT', product: 'Laptop Ultra 14 Slim', revenue: 78000000, cost: 55000000, orders: 15 },
  { id: '3', month: 'Jan', quarter: 'Q1', region: 'Surabaya', category: 'Aksesoris', product: 'Wireless Mechanical Keyboard', revenue: 18500000, cost: 11000000, orders: 38 },
  { id: '4', month: 'Jan', quarter: 'Q1', region: 'Bandung', category: 'Office Supply', product: 'Ergonomic Mesh Chair V2', revenue: 24000000, cost: 15000000, orders: 16 },
  { id: '5', month: 'Feb', quarter: 'Q1', region: 'DKI Jakarta', category: 'Elektronik', product: 'Air Purifier Pro HEPA', revenue: 42000000, cost: 28000000, orders: 28 },
  { id: '6', month: 'Feb', quarter: 'Q1', region: 'Surabaya', category: 'Gadget & IT', product: 'Tablet Pro 11 Inch 128GB', revenue: 54000000, cost: 38000000, orders: 18 },
  { id: '7', month: 'Feb', quarter: 'Q1', region: 'Medan', category: 'Aksesoris', product: 'ANC Bluetooth Headphone', revenue: 22000000, cost: 13000000, orders: 24 },
  { id: '8', month: 'Feb', quarter: 'Q1', region: 'Bandung', category: 'Office Supply', product: 'Smart Height Desk Electric', revenue: 36000000, cost: 23000000, orders: 12 },
  { id: '9', month: 'Mar', quarter: 'Q1', region: 'DKI Jakarta', category: 'Gadget & IT', product: 'Laptop Ultra 14 Slim', revenue: 92000000, cost: 64000000, orders: 18 },
  { id: '10', month: 'Mar', quarter: 'Q1', region: 'Surabaya', category: 'Elektronik', product: 'Smart TV 55 Inch 4K', revenue: 48000000, cost: 33000000, orders: 9 },
  { id: '11', month: 'Mar', quarter: 'Q1', region: 'Bandung', category: 'Aksesoris', product: 'Wireless Mechanical Keyboard', revenue: 16000000, cost: 9500000, orders: 32 },
  { id: '12', month: 'Mar', quarter: 'Q1', region: 'Medan', category: 'Office Supply', product: 'Ergonomic Mesh Chair V2', revenue: 19500000, cost: 12000000, orders: 13 },
  // Q2
  { id: '13', month: 'Apr', quarter: 'Q2', region: 'DKI Jakarta', category: 'Elektronik', product: 'Smart TV 55 Inch 4K', revenue: 72000000, cost: 49000000, orders: 14 },
  { id: '14', month: 'Apr', quarter: 'Q2', region: 'Surabaya', category: 'Gadget & IT', product: 'Laptop Ultra 14 Slim', revenue: 65000000, cost: 45000000, orders: 13 },
  { id: '15', month: 'Apr', quarter: 'Q2', region: 'Bandung', category: 'Aksesoris', product: 'ANC Bluetooth Headphone', revenue: 26000000, cost: 15500000, orders: 29 },
  { id: '16', month: 'Apr', quarter: 'Q2', region: 'Medan', category: 'Office Supply', product: 'Smart Height Desk Electric', revenue: 28000000, cost: 18000000, orders: 9 },
  { id: '17', month: 'May', quarter: 'Q2', region: 'DKI Jakarta', category: 'Gadget & IT', product: 'Tablet Pro 11 Inch 128GB', revenue: 84000000, cost: 58000000, orders: 28 },
  { id: '18', month: 'May', quarter: 'Q2', region: 'Surabaya', category: 'Elektronik', product: 'Air Purifier Pro HEPA', revenue: 38000000, cost: 25000000, orders: 25 },
  { id: '19', month: 'May', quarter: 'Q2', region: 'Bandung', category: 'Office Supply', product: 'Ergonomic Mesh Chair V2', revenue: 31000000, cost: 19500000, orders: 21 },
  { id: '20', month: 'May', quarter: 'Q2', region: 'Medan', category: 'Aksesoris', product: 'Wireless Mechanical Keyboard', revenue: 14500000, cost: 8500000, orders: 30 },
  { id: '21', month: 'Jun', quarter: 'Q2', region: 'DKI Jakarta', category: 'Elektronik', product: 'Smart TV 55 Inch 4K', revenue: 88000000, cost: 60000000, orders: 17 },
  { id: '22', month: 'Jun', quarter: 'Q2', region: 'Surabaya', category: 'Gadget & IT', product: 'Laptop Ultra 14 Slim', revenue: 76000000, cost: 53000000, orders: 15 },
  { id: '23', month: 'Jun', quarter: 'Q2', region: 'Bandung', category: 'Aksesoris', product: 'ANC Bluetooth Headphone', revenue: 29000000, cost: 17000000, orders: 32 },
  { id: '24', month: 'Jun', quarter: 'Q2', region: 'Medan', category: 'Office Supply', product: 'Smart Height Desk Electric', revenue: 33000000, cost: 21000000, orders: 11 },
  // Q3
  { id: '25', month: 'Jul', quarter: 'Q3', region: 'DKI Jakarta', category: 'Gadget & IT', product: 'Laptop Ultra 14 Slim', revenue: 98000000, cost: 68000000, orders: 19 },
  { id: '26', month: 'Jul', quarter: 'Q3', region: 'Surabaya', category: 'Elektronik', product: 'Smart TV 55 Inch 4K', revenue: 58000000, cost: 40000000, orders: 11 },
  { id: '27', month: 'Jul', quarter: 'Q3', region: 'Bandung', category: 'Office Supply', product: 'Ergonomic Mesh Chair V2', revenue: 34000000, cost: 21000000, orders: 23 },
  { id: '28', month: 'Jul', quarter: 'Q3', region: 'Medan', category: 'Aksesoris', product: 'Wireless Mechanical Keyboard', revenue: 17000000, cost: 10000000, orders: 35 },
  { id: '29', month: 'Aug', quarter: 'Q3', region: 'DKI Jakarta', category: 'Elektronik', product: 'Air Purifier Pro HEPA', revenue: 52000000, cost: 35000000, orders: 35 },
  { id: '30', month: 'Aug', quarter: 'Q3', region: 'Surabaya', category: 'Gadget & IT', product: 'Tablet Pro 11 Inch 128GB', revenue: 68000000, cost: 47000000, orders: 23 },
  { id: '31', month: 'Aug', quarter: 'Q3', region: 'Bandung', category: 'Aksesoris', product: 'ANC Bluetooth Headphone', revenue: 31000000, cost: 18000000, orders: 34 },
  { id: '32', month: 'Aug', quarter: 'Q3', region: 'Medan', category: 'Office Supply', product: 'Smart Height Desk Electric', revenue: 38000000, cost: 24000000, orders: 12 },
  { id: '33', month: 'Sep', quarter: 'Q3', region: 'DKI Jakarta', category: 'Gadget & IT', product: 'Laptop Ultra 14 Slim', revenue: 110000000, cost: 76000000, orders: 22 },
  { id: '34', month: 'Sep', quarter: 'Q3', region: 'Surabaya', category: 'Elektronik', product: 'Smart TV 55 Inch 4K', revenue: 64000000, cost: 44000000, orders: 12 },
  { id: '35', month: 'Sep', quarter: 'Q3', region: 'Bandung', category: 'Office Supply', product: 'Ergonomic Mesh Chair V2', revenue: 39000000, cost: 24000000, orders: 26 },
  { id: '36', month: 'Sep', quarter: 'Q3', region: 'Medan', category: 'Aksesoris', product: 'Wireless Mechanical Keyboard', revenue: 19000000, cost: 11000000, orders: 39 },
  // Q4
  { id: '37', month: 'Oct', quarter: 'Q4', region: 'DKI Jakarta', category: 'Elektronik', product: 'Smart TV 55 Inch 4K', revenue: 95000000, cost: 65000000, orders: 19 },
  { id: '38', month: 'Oct', quarter: 'Q4', region: 'Surabaya', category: 'Gadget & IT', product: 'Laptop Ultra 14 Slim', revenue: 84000000, cost: 58000000, orders: 17 },
  { id: '39', month: 'Oct', quarter: 'Q4', region: 'Bandung', category: 'Aksesoris', product: 'ANC Bluetooth Headphone', revenue: 35000000, cost: 20000000, orders: 39 },
  { id: '40', month: 'Oct', quarter: 'Q4', region: 'Medan', category: 'Office Supply', product: 'Smart Height Desk Electric', revenue: 42000000, cost: 27000000, orders: 14 },
  { id: '41', month: 'Nov', quarter: 'Q4', region: 'DKI Jakarta', category: 'Gadget & IT', product: 'Laptop Ultra 14 Slim', revenue: 125000000, cost: 86000000, orders: 25 },
  { id: '42', month: 'Nov', quarter: 'Q4', region: 'Surabaya', category: 'Elektronik', product: 'Air Purifier Pro HEPA', revenue: 58000000, cost: 38000000, orders: 38 },
  { id: '43', month: 'Nov', quarter: 'Q4', region: 'Bandung', category: 'Office Supply', product: 'Ergonomic Mesh Chair V2', revenue: 44000000, cost: 27000000, orders: 29 },
  { id: '44', month: 'Nov', quarter: 'Q4', region: 'Medan', category: 'Aksesoris', product: 'Wireless Mechanical Keyboard', revenue: 21000000, cost: 12500000, orders: 42 },
  { id: '45', month: 'Dec', quarter: 'Q4', region: 'DKI Jakarta', category: 'Elektronik', product: 'Smart TV 55 Inch 4K', revenue: 140000000, cost: 96000000, orders: 28 },
  { id: '46', month: 'Dec', quarter: 'Q4', region: 'Surabaya', category: 'Gadget & IT', product: 'Laptop Ultra 14 Slim', revenue: 105000000, cost: 72000000, orders: 21 },
  { id: '47', month: 'Dec', quarter: 'Q4', region: 'Bandung', category: 'Aksesoris', product: 'ANC Bluetooth Headphone', revenue: 42000000, cost: 24000000, orders: 46 },
  { id: '48', month: 'Dec', quarter: 'Q4', region: 'Medan', category: 'Office Supply', product: 'Smart Height Desk Electric', revenue: 51000000, cost: 33000000, orders: 17 }
];

export default function InteractiveDashboardSimulator() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('All');
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const regions = ['All', 'DKI Jakarta', 'Surabaya', 'Bandung', 'Medan'];
  const categories = ['All', 'Elektronik', 'Gadget & IT', 'Aksesoris', 'Office Supply'];
  const quarters = ['All', 'Q1', 'Q2', 'Q3', 'Q4'];

  // Filtered dataset
  const filteredData = useMemo(() => {
    return RAW_SIMULATED_DATA.filter((row) => {
      const matchRegion = selectedRegion === 'All' || row.region === selectedRegion;
      const matchCategory = selectedCategory === 'All' || row.category === selectedCategory;
      const matchQuarter = selectedQuarter === 'All' || row.quarter === selectedQuarter;
      return matchRegion && matchCategory && matchQuarter;
    });
  }, [selectedRegion, selectedCategory, selectedQuarter]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    const totalRev = filteredData.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalCost = filteredData.reduce((acc, curr) => acc + curr.cost, 0);
    const totalProfit = totalRev - totalCost;
    const profitMargin = totalRev > 0 ? (totalProfit / totalRev) * 100 : 0;
    const totalOrders = filteredData.reduce((acc, curr) => acc + curr.orders, 0);
    const aov = totalOrders > 0 ? totalRev / totalOrders : 0;
    
    // Growth simulation (proportional based on quarter and filter)
    const baseGrowth = 14.8;
    const growthAdjustment = selectedRegion === 'DKI Jakarta' ? 4.2 : selectedRegion === 'Surabaya' ? 2.1 : 0.5;
    const growth = (baseGrowth + growthAdjustment).toFixed(1);

    return {
      revenue: totalRev,
      profit: totalProfit,
      profitMargin: profitMargin.toFixed(1),
      orders: totalOrders,
      aov: Math.round(aov),
      growth: `+${growth}%`
    };
  }, [filteredData, selectedRegion]);

  // Monthly trend aggregation
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyTrend = useMemo(() => {
    return months.map((m) => {
      const rows = filteredData.filter((r) => r.month === m);
      const rev = rows.reduce((acc, r) => acc + r.revenue, 0);
      const cost = rows.reduce((acc, r) => acc + r.cost, 0);
      const profit = rev - cost;
      return {
        month: m,
        revenue: rev,
        profit: profit
      };
    });
  }, [filteredData]);

  const maxMonthRev = useMemo(() => {
    const max = Math.max(...monthlyTrend.map((t) => t.revenue), 10000000);
    return max;
  }, [monthlyTrend]);

  // Category Breakdown
  const categoryBreakdown = useMemo(() => {
    const cats = ['Elektronik', 'Gadget & IT', 'Aksesoris', 'Office Supply'];
    const total = filteredData.reduce((acc, r) => acc + r.revenue, 0) || 1;
    return cats.map((cat) => {
      const rev = filteredData
        .filter((r) => r.category === cat)
        .reduce((acc, r) => acc + r.revenue, 0);
      const pct = (rev / total) * 100;
      return {
        category: cat,
        revenue: rev,
        percent: pct.toFixed(1)
      };
    }).sort((a, b) => b.revenue - a.revenue);
  }, [filteredData]);

  // Regional breakdown
  const regionalBreakdown = useMemo(() => {
    const regs = ['DKI Jakarta', 'Surabaya', 'Bandung', 'Medan'];
    const total = filteredData.reduce((acc, r) => acc + r.revenue, 0) || 1;
    return regs.map((reg) => {
      const rev = filteredData
        .filter((r) => r.region === reg)
        .reduce((acc, r) => acc + r.revenue, 0);
      const pct = (rev / total) * 100;
      return {
        region: reg,
        revenue: rev,
        percent: pct.toFixed(1)
      };
    }).sort((a, b) => b.revenue - a.revenue);
  }, [filteredData]);

  // Top Products Table
  const topProducts = useMemo(() => {
    const productMap: Record<string, { product: string; category: string; units: number; revenue: number; profit: number }> = {};
    filteredData.forEach((row) => {
      if (!productMap[row.product]) {
        productMap[row.product] = {
          product: row.product,
          category: row.category,
          units: 0,
          revenue: 0,
          profit: 0
        };
      }
      productMap[row.product].units += row.orders;
      productMap[row.product].revenue += row.revenue;
      productMap[row.product].profit += (row.revenue - row.cost);
    });

    return Object.values(productMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [filteredData]);

  const formatRupiahMiliar = (val: number) => {
    if (val >= 1000000000) {
      return `Rp ${(val / 1000000000).toFixed(2)} M`;
    }
    return `Rp ${(val / 1000000).toFixed(1)} Jt`;
  };

  const resetFilters = () => {
    setSelectedRegion('All');
    setSelectedCategory('All');
    setSelectedQuarter('All');
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-4 sm:p-6 shadow-sm space-y-6">
      {/* Dashboard Top Header & Slicer Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              Live Dynamic Simulator
            </span>
            <span className="text-xs text-[#6B7280]">Excel Slicers Engine Demo</span>
          </div>
          <h3 className="text-xl font-bold text-[#171717] mt-1">
            Sales Performance Interactive Dashboard
          </h3>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Klik tombol Slicer di bawah untuk melihat bagaimana seluruh KPI, grafik, dan tabel bereaksi secara real-time.
          </p>
        </div>

        {/* Reset Filter Button */}
        {(selectedRegion !== 'All' || selectedCategory !== 'All' || selectedQuarter !== 'All') && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4B5563] bg-[#F3F4F6] hover:bg-[#E5E7EB] rounded-[6px] transition-colors self-start lg:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Filter
          </button>
        )}
      </div>

      {/* Slicers Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F8F9FA] p-3 sm:p-4 rounded-[6px] border border-[#E5E7EB]">
        {/* Slicer 1: Region */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#374151]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB]" />
              Slicer 1: Wilayah Regional
            </span>
            <span className="text-[11px] text-[#6B7280] font-normal">{selectedRegion}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-1 text-xs rounded-[4px] font-medium transition-all ${
                  selectedRegion === reg
                    ? 'bg-[#1E3A8A] text-white shadow-xs'
                    : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6]'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Slicer 2: Category */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#374151]">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#16A34A]" />
              Slicer 2: Kategori Produk
            </span>
            <span className="text-[11px] text-[#6B7280] font-normal">{selectedCategory}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded-[4px] font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#15803D] text-white shadow-xs'
                    : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Slicer 3: Timeline Quarter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[#374151]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#EA580C]" />
              Timeline: Periode Kuartal
            </span>
            <span className="text-[11px] text-[#6B7280] font-normal">{selectedQuarter}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {quarters.map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuarter(q)}
                className={`px-2.5 py-1 text-xs rounded-[4px] font-medium transition-all ${
                  selectedQuarter === q
                    ? 'bg-[#C2410C] text-white shadow-xs'
                    : 'bg-white text-[#4B5563] border border-[#E5E7EB] hover:bg-[#F3F4F6]'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row of 5 Dynamic KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* KPI 1: Revenue */}
        <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-[6px] p-3 sm:p-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B21A8] uppercase tracking-wider">
            <span>Total Omzet</span>
            <DollarSign className="w-3.5 h-3.5 text-[#9333EA]" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-[#171717] mt-1.5">
            {formatRupiahMiliar(metrics.revenue)}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#16A34A] mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>{metrics.growth} vs prior</span>
          </div>
        </div>

        {/* KPI 2: Net Profit */}
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-[6px] p-3 sm:p-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#065F46] uppercase tracking-wider">
            <span>Laba Bersih</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#059669]" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-[#171717] mt-1.5">
            {formatRupiahMiliar(metrics.profit)}
          </div>
          <div className="text-[11px] font-medium text-[#047857] mt-1">
            Margin: <span className="font-bold">{metrics.profitMargin}%</span>
          </div>
        </div>

        {/* KPI 3: Total Orders */}
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[6px] p-3 sm:p-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#1E40AF] uppercase tracking-wider">
            <span>Total Orders</span>
            <ShoppingBag className="w-3.5 h-3.5 text-[#2563EB]" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-[#171717] mt-1.5">
            {metrics.orders.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-[#4B5563] mt-1">
            Transaksi aktif
          </div>
        </div>

        {/* KPI 4: AOV */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[6px] p-3 sm:p-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#92400E] uppercase tracking-wider">
            <span>Rata-Rata Order (AOV)</span>
            <PieChart className="w-3.5 h-3.5 text-[#D97706]" />
          </div>
          <div className="text-lg sm:text-xl font-bold text-[#171717] mt-1.5">
            {formatRupiahMiliar(metrics.aov)}
          </div>
          <div className="text-[11px] text-[#78350F] mt-1">
            Per transaksi
          </div>
        </div>

        {/* KPI 5: Health Status */}
        <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-[6px] p-3 sm:p-4 col-span-2 lg:col-span-1">
          <div className="text-[11px] font-semibold text-[#475569] uppercase tracking-wider">
            Status Target Bisnis
          </div>
          <div className="flex items-center gap-1.5 text-base sm:text-lg font-bold text-[#15803D] mt-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span>104.2% On Track</span>
          </div>
          <div className="text-[11px] text-[#64748B] mt-1">
            Di atas target tahunan
          </div>
        </div>
      </div>

      {/* Charts Grid: Left Monthly Trend, Right Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Monthly Sales & Profit Trend SVG Bar Chart */}
        <div className="lg:col-span-2 border border-[#E5E7EB] rounded-[6px] p-4 bg-white">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <div>
              <h4 className="text-sm font-bold text-[#171717]">
                Tren Penjualan & Laba Bulanan (2026)
              </h4>
              <p className="text-xs text-[#6B7280]">
                Batang Biru = Omzet | Garis Hijau = Laba Bersih
              </p>
            </div>
            <span className="text-xs font-mono bg-[#F3F4F6] text-[#4B5563] px-2 py-0.5 rounded">
              Total {formatRupiahMiliar(metrics.revenue)}
            </span>
          </div>

          {/* SVG Bar & Line Trend Chart */}
          <div className="mt-4 pt-2">
            <div className="relative h-48 w-full flex items-end justify-between gap-1 sm:gap-2 px-2 border-b border-[#E5E7EB]">
              {monthlyTrend.map((item) => {
                const heightPct = maxMonthRev > 0 ? (item.revenue / maxMonthRev) * 100 : 0;
                const profitHeightPct = maxMonthRev > 0 ? (item.profit / maxMonthRev) * 100 : 0;
                const isHovered = hoveredMonth === item.month;

                return (
                  <div
                    key={item.month}
                    className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    onMouseEnter={() => setHoveredMonth(item.month)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="absolute -top-12 z-20 bg-[#171717] text-white text-[10px] py-1 px-2 rounded shadow-md pointer-events-none whitespace-nowrap">
                        <div className="font-bold">{item.month}: {formatRupiahMiliar(item.revenue)}</div>
                        <div className="text-[#A7F3D0]">Laba: {formatRupiahMiliar(item.profit)}</div>
                      </div>
                    )}

                    {/* Bar Stack Container */}
                    <div className="w-full max-w-[28px] flex items-end justify-center h-full">
                      <div
                        style={{ height: `${Math.max(heightPct, 4)}%` }}
                        className={`w-full rounded-t transition-all duration-300 relative ${
                          isHovered ? 'bg-[#1E3A8A]' : 'bg-[#3B82F6]'
                        }`}
                      >
                        {/* Nested Profit bar indicator */}
                        <div
                          style={{ height: `${profitHeightPct > 0 ? (profitHeightPct / heightPct) * 100 : 0}%` }}
                          className="w-full bg-[#10B981] opacity-75 rounded-t absolute bottom-0"
                        />
                      </div>
                    </div>
                    {/* Month Label */}
                    <span className="text-[10px] text-[#6B7280] font-medium mt-1">
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-[#4B5563]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#3B82F6]"></span>
                <span>Total Omzet Penjualan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#10B981]"></span>
                <span>Laba Bersih (Profit)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Category & Regional Breakdown */}
        <div className="border border-[#E5E7EB] rounded-[6px] p-4 bg-white space-y-4">
          <div>
            <h4 className="text-sm font-bold text-[#171717]">
              Kontribusi per Kategori
            </h4>
            <p className="text-xs text-[#6B7280]">
              Peringkat pangsa omzet produk
            </p>
          </div>

          <div className="space-y-3">
            {categoryBreakdown.map((cat, idx) => (
              <div key={cat.category} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[#374151]">
                    {idx + 1}. {cat.category}
                  </span>
                  <span className="font-semibold text-[#171717]">
                    {cat.percent}% ({formatRupiahMiliar(cat.revenue)})
                  </span>
                </div>
                {/* Horizontal Progress Bar */}
                <div className="w-full bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${cat.percent}%` }}
                    className={`h-full rounded-full transition-all duration-300 ${
                      idx === 0 ? 'bg-[#2563EB]' : idx === 1 ? 'bg-[#10B981]' : idx === 2 ? 'bg-[#F59E0B]' : 'bg-[#6B7280]'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Regional Share Pills */}
          <div className="pt-3 border-t border-[#E5E7EB]">
            <h5 className="text-xs font-semibold text-[#374151] mb-2">
              Sebaran Wilayah Cabang
            </h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {regionalBreakdown.map((reg) => (
                <div key={reg.region} className="bg-[#F8F9FA] p-2 rounded border border-[#E5E7EB]">
                  <div className="text-[11px] text-[#6B7280] truncate">{reg.region}</div>
                  <div className="font-bold text-[#171717]">{reg.percent}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table: Top 5 Best Selling Products */}
      <div className="border border-[#E5E7EB] rounded-[6px] overflow-hidden bg-white">
        <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-[#171717]">
              Top Produk Unggulan Terlaris (Filtered)
            </h4>
            <p className="text-xs text-[#6B7280]">
              Diperbarui otomatis berdasarkan filter Slicer yang aktif
            </p>
          </div>
          <span className="text-xs text-[#4B5563] font-medium">
            Menampilkan 5 Produk
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9FAFB] text-[#4B5563] font-semibold border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-2.5">No</th>
                <th className="px-4 py-2.5">Nama Produk</th>
                <th className="px-4 py-2.5">Kategori</th>
                <th className="px-4 py-2.5 text-right">Unit Terjual</th>
                <th className="px-4 py-2.5 text-right">Total Omzet</th>
                <th className="px-4 py-2.5 text-right">Margin Laba</th>
                <th className="px-4 py-2.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {topProducts.map((p, index) => {
                const margin = p.revenue > 0 ? ((p.profit / p.revenue) * 100).toFixed(1) : '0';
                return (
                  <tr key={p.product} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-4 py-2.5 font-medium text-[#6B7280]">{index + 1}</td>
                    <td className="px-4 py-2.5 font-semibold text-[#171717]">{p.product}</td>
                    <td className="px-4 py-2.5 text-[#4B5563]">{p.category}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-[#171717]">{p.units} unit</td>
                    <td className="px-4 py-2.5 text-right font-mono font-medium text-[#171717]">
                      {formatRupiahMiliar(p.revenue)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-[#059669] font-medium">
                      {margin}%
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold rounded bg-[#ECFDF5] text-[#047857]">
                        Fast Moving
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Educational Insight Callout */}
      <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[6px] p-3 sm:p-4 text-xs text-[#166534] flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">
            Insight Bisnis Otomatis:
          </p>
          <p className="text-[#15803D] leading-relaxed">
            Ketika Slicer Wilayah diubah ke <strong>{selectedRegion}</strong> dan Kategori ke <strong>{selectedCategory}</strong>, 
            perhatikan bagaimana formula agregasi (SUMIFS dan PivotTable) langsung mengkalkulasi ulang seluruh nilai KPI di atas tanpa perlu me-refresh lembar kerja Excel secara manual!
          </p>
        </div>
      </div>
    </div>
  );
}
