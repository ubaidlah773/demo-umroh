"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface DatePickerProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
}

export default function DatePicker({ selectedDate, onSelectDate }: DatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (selectedDate) {
      const [y, m] = selectedDate.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Build grid days
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays = [];

  // Previous month filler days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    calendarDays.push({
      dateStr: "",
      dayNum: d,
      isCurrentMonth: false,
      isDisabled: true,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dateObj = new Date(year, month, d);
    dateObj.setHours(0, 0, 0, 0);
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const isDisabled = dateObj < today;

    calendarDays.push({
      dateStr,
      dayNum: d,
      isCurrentMonth: true,
      isDisabled,
    });
  }

  // Format nice selected label
  const formattedSelected = selectedDate
    ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-espresso-900/10">
        <h3 className="font-serif text-2xl text-espresso-900 font-normal">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevMonth}
            disabled={year === today.getFullYear() && month <= today.getMonth()}
            className="p-2 rounded-full hover:bg-ivory-200 text-espresso-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-ivory-200 text-espresso-900 transition-colors cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day, idx) => (
          <span
            key={idx}
            className="font-mono text-[11px] uppercase tracking-wider text-warmgray-500 font-medium py-1"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Calendar Day Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {calendarDays.map((item, idx) => {
          if (!item.isCurrentMonth) {
            return (
              <div
                key={`empty-${idx}`}
                className="h-10 sm:h-11 flex items-center justify-center text-xs text-warmgray-300 pointer-events-none"
              >
                {item.dayNum}
              </div>
            );
          }

          const isSelected = selectedDate === item.dateStr;

          return (
            <button
              key={item.dateStr}
              type="button"
              disabled={item.isDisabled}
              onClick={() => onSelectDate(item.dateStr)}
              className={`h-10 sm:h-11 rounded-full text-sm font-sans flex items-center justify-center transition-all cursor-pointer relative group ${
                item.isDisabled
                  ? "text-warmgray-300 opacity-40 cursor-not-allowed"
                  : isSelected
                  ? "bg-espresso-900 text-ivory-100 font-semibold shadow-md scale-105"
                  : "text-espresso-900 hover:bg-champagne-500/20 hover:text-espresso-950 font-normal"
              }`}
            >
              <span>{item.dayNum}</span>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 absolute bottom-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Date Indicator */}
      {selectedDate && (
        <div className="mt-6 pt-4 border-t border-espresso-900/10 flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-champagne-600 justify-center">
          <CalendarIcon className="w-4 h-4" />
          <span>{formattedSelected}</span>
        </div>
      )}
    </div>
  );
}
