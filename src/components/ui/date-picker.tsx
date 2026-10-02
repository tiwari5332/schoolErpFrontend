import React, { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "./utils";

export interface DatePickerProps {
  value?: string; // Expecting YYYY-MM-DD
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  minYear?: number;
  maxYear?: number;
  error?: boolean;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const DatePicker: React.FC<DatePickerProps> = ({
  value = "",
  onChange,
  placeholder = "Select date",
  className,
  disabled = false,
  id,
  minYear = 1950,
  maxYear = 2035,
  error = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");
  const [openUpward, setOpenUpward] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const yearsListRef = useRef<HTMLDivElement>(null);

  // Auto detect if calendar should open upward when space below is tight
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 340 && rect.top > 340) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [isOpen]);

  // Close popup on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setViewMode("days");
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setViewMode("days");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Parse initial date
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month, day);
      }
    }
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  };

  const selectedDate = parseDate(value);

  // Viewport month & year state
  const [viewYear, setViewYear] = useState<number>(
    selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()
  );
  const [viewMonth, setViewMonth] = useState<number>(
    selectedDate ? selectedDate.getMonth() : new Date().getMonth()
  );

  // Sync view state when value changes externally
  useEffect(() => {
    if (selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
    }
  }, [value]);

  // Auto-scroll selected year into view when years mode opens
  useEffect(() => {
    if (viewMode === "years" && yearsListRef.current) {
      const selectedYearBtn = yearsListRef.current.querySelector('[data-selected="true"]');
      if (selectedYearBtn) {
        selectedYearBtn.scrollIntoView({ block: "center" });
      }
    }
  }, [viewMode]);

  // Format date for display
  const formatDisplay = (date: Date | null): string => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = MONTH_NAMES[date.getMonth()].substring(0, 3);
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const formatISO = (year: number, month: number, day: number): string => {
    const y = String(year);
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const handleSelectDay = (day: number) => {
    const formatted = formatISO(viewYear, viewMonth, day);
    onChange?.(formatted);
    setIsOpen(false);
    setViewMode("days");
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleToday = () => {
    const today = new Date();
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    handleSelectDay(today.getDate());
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.("");
  };

  // Generate days grid
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  // Generate Year options
  const years: number[] = [];
  for (let y = maxYear; y >= minYear; y--) {
    years.push(y);
  }

  return (
    <div ref={containerRef} className="relative inline-block w-full">
      {/* Input Trigger Button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 transition-all outline-none hover:border-slate-300 hover:bg-slate-50/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50",
          !value && "text-slate-400",
          isOpen && "border-indigo-500 ring-2 ring-indigo-500/20",
          error && "border-rose-500 ring-2 ring-rose-500/20 text-rose-900 focus:border-rose-500 focus:ring-rose-500/20",
          className
        )}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <CalendarIcon className={cn("h-4 w-4 shrink-0", error ? "text-rose-500" : "text-indigo-500")} />
          <span className="truncate">{selectedDate ? formatDisplay(selectedDate) : placeholder}</span>
        </div>
        {value ? (
          <div
            role="button"
            tabIndex={0}
            onClick={handleClear}
            className="rounded-full p-0.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </div>
        ) : (
          <div className={cn("h-2 w-2 rounded-full", error ? "bg-rose-400" : "bg-slate-300")} />
        )}
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          className={cn(
            "absolute left-0 w-72 p-3.5 bg-white border border-slate-200 shadow-2xl rounded-2xl z-[100] animate-in fade-in-50 zoom-in-95",
            openUpward ? "bottom-full mb-1.5" : "top-full mt-1.5"
          )}
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between gap-1 pb-3 mb-2 border-b border-slate-100">
            {viewMode === "days" ? (
              <>
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="h-8 w-8 rounded-lg hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 flex items-center justify-center transition-colors"
                  title="Previous Month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setViewMode("months")}
                    className="h-8 rounded-lg bg-slate-100 px-2.5 text-xs font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-1"
                  >
                    {MONTH_NAMES[viewMonth]}
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode("years")}
                    className="h-8 rounded-lg bg-slate-100 px-2.5 text-xs font-bold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center gap-1"
                  >
                    {viewYear}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="h-8 w-8 rounded-lg hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 flex items-center justify-center transition-colors"
                  title="Next Month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-between w-full px-1">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {viewMode === "months" ? "Select Month" : "Select Year"}
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode("days")}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Back to Calendar
                </button>
              </div>
            )}
          </div>

          {/* VIEW: MONTHS SELECTION */}
          {viewMode === "months" && (
            <div className="grid grid-cols-3 gap-2 py-2">
              {MONTH_NAMES.map((name, idx) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setViewMonth(idx);
                    setViewMode("days");
                  }}
                  className={cn(
                    "py-2 px-1 text-xs font-semibold rounded-xl transition-all text-center",
                    idx === viewMonth
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                      : "bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                  )}
                >
                  {name.substring(0, 3)}
                </button>
              ))}
            </div>
          )}

          {/* VIEW: YEARS SELECTION */}
          {viewMode === "years" && (
            <div ref={yearsListRef} className="grid grid-cols-3 gap-1.5 max-h-56 overflow-y-auto p-1 py-2 scrollbar-thin">
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  data-selected={y === viewYear}
                  onClick={() => {
                    setViewYear(y);
                    setViewMode("days");
                  }}
                  className={cn(
                    "py-2 text-xs font-semibold rounded-xl transition-all text-center",
                    y === viewYear
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 font-bold"
                      : "bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                  )}
                >
                  {y}
                </button>
              ))}
            </div>
          )}

          {/* VIEW: DAYS SELECTION */}
          {viewMode === "days" && (
            <>
              {/* Weekday Header */}
              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {WEEKDAY_NAMES.map((d) => (
                  <span key={d} className="text-[11px] font-semibold text-slate-400 py-1">
                    {d}
                  </span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {/* Empty padding slots before 1st day */}
                {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-8" />
                ))}

                {/* Days */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isSelected =
                    selectedDate &&
                    selectedDate.getFullYear() === viewYear &&
                    selectedDate.getMonth() === viewMonth &&
                    selectedDate.getDate() === dayNum;

                  const isToday =
                    new Date().getFullYear() === viewYear &&
                    new Date().getMonth() === viewMonth &&
                    new Date().getDate() === dayNum;

                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => handleSelectDay(dayNum)}
                      className={cn(
                        "h-8 w-full rounded-lg text-xs font-medium transition-all duration-150 flex items-center justify-center cursor-pointer",
                        isSelected
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30 font-bold scale-105"
                          : isToday
                          ? "bg-indigo-50 text-indigo-700 font-bold border border-indigo-200"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleToday}
                  className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-7 px-2 font-medium rounded-md transition-colors"
                >
                  Today
                </button>
                {value && (
                  <button
                    type="button"
                    onClick={() => {
                      onChange?.("");
                      setIsOpen(false);
                      setViewMode("days");
                    }}
                    className="text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-7 px-2 font-medium rounded-md transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
