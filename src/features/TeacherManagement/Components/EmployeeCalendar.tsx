import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar, Sun, Palmtree } from "lucide-react";
import { LocalStorageSync } from "../../../services/LocalStorageSync";
import { Teacher } from '../Constants';

interface EmployeeCalendarProps {
  teachers: Teacher[];
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// National / school holidays (static mock for demo)
const SCHOOL_HOLIDAYS: Record<string, string> = {
  '01-26': 'Republic Day',
  '03-14': 'Holi',
  '08-15': 'Independence Day',
  '10-02': 'Gandhi Jayanti',
  '10-24': 'Dussehra',
  '11-12': 'Diwali',
  '12-25': 'Christmas',
};

export function EmployeeCalendar({ teachers }: EmployeeCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days: Array<{ day: number; isCurrentMonth: boolean; date: Date }> = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(currentYear, currentMonth, i),
      });
    }

    // Next month days (fill to 42 cells = 6 rows)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(currentYear, currentMonth + 1, i),
      });
    }

    return days;
  }, [currentMonth, currentYear]);

  // Check if a date is today
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if a date is a Sunday
  const isSunday = (date: Date) => date.getDay() === 0;

  // Check if a date has a holiday
  const getHoliday = (date: Date): string | null => {
    const key = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return SCHOOL_HOLIDAYS[key] || null;
  };

  // Get leave count for a date from attendance records
  const getLeaveCount = (date: Date): number => {
    const dateStr = date.toISOString().split('T')[0];
    // Check attendance records for the given date
    const records = LocalStorageSync.get<Record<string, string>>('edu_trio_teacher_attendance') || {};
    let count = 0;
    teachers.forEach(t => {
      const key = `${t.id}-${dateStr}`;
      if (records[key] === 'Leave' || records[key] === 'Absent') {
        count++;
      }
    });
    return count;
  };

  // Stats
  const stats = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let sundays = 0;
    let holidays = 0;
    const holidayList: string[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(currentYear, currentMonth, d);
      if (isSunday(date)) sundays++;
      const h = getHoliday(date);
      if (h) {
        holidays++;
        holidayList.push(h);
      }
    }

    const workingDays = daysInMonth - sundays - holidays;
    return { workingDays, sundays, holidays, holidayList, totalDays: daysInMonth };
  }, [currentMonth, currentYear]);

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Days</p>
              <p className="text-xl font-bold text-slate-800">{stats.totalDays}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Working Days</p>
              <p className="text-xl font-bold text-emerald-700">{stats.workingDays}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <Sun className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Sundays</p>
              <p className="text-xl font-bold text-rose-600">{stats.sundays}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg glass-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Palmtree className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Holidays</p>
              <p className="text-xl font-bold text-amber-600">{stats.holidays}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Card */}
      <Card className="border-0 shadow-xl glass-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-colored-indigo">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              {MONTHS[currentMonth]} {currentYear}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToToday}
                className="text-xs h-8 px-3 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={prevMonth}
                className="h-8 w-8 border-slate-200 hover:bg-slate-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMonth}
                className="h-8 w-8 border-slate-200 hover:bg-slate-100"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className={`text-center text-xs font-bold py-2.5 ${
                  day === 'Sun' ? 'text-rose-500' : 'text-slate-500'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((item, idx) => {
              const holiday = item.isCurrentMonth ? getHoliday(item.date) : null;
              const sunday = isSunday(item.date);
              const todayMark = isToday(item.date);
              const leaveCount = item.isCurrentMonth ? getLeaveCount(item.date) : 0;

              return (
                <div
                  key={idx}
                  className={`
                    relative min-h-[72px] p-1.5 rounded-xl border transition-all duration-200
                    ${!item.isCurrentMonth
                      ? 'bg-slate-50/50 border-transparent text-slate-300'
                      : todayMark
                        ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200/50 shadow-sm'
                        : holiday
                          ? 'bg-amber-50/60 border-amber-200/60'
                          : sunday
                            ? 'bg-rose-50/40 border-rose-100/60'
                            : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'
                    }
                  `}
                >
                  {/* Day Number */}
                  <div className="flex items-start justify-between">
                    <span
                      className={`
                        text-sm font-semibold leading-none
                        ${!item.isCurrentMonth
                          ? 'text-slate-300'
                          : todayMark
                            ? 'text-indigo-700'
                            : sunday
                              ? 'text-rose-500'
                              : 'text-slate-700'
                        }
                      `}
                    >
                      {item.day}
                    </span>
                    {todayMark && (
                      <Badge className="bg-indigo-600 text-white text-[9px] px-1.5 py-0 h-4 font-bold leading-none">
                        TODAY
                      </Badge>
                    )}
                  </div>

                  {/* Holiday tag */}
                  {holiday && item.isCurrentMonth && (
                    <div className="mt-1">
                      <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-md leading-none block truncate">
                        🎉 {holiday}
                      </span>
                    </div>
                  )}

                  {/* Sunday tag */}
                  {sunday && !holiday && item.isCurrentMonth && (
                    <div className="mt-1">
                      <span className="text-[9px] font-medium text-rose-400">Holiday</span>
                    </div>
                  )}

                  {/* Leave count indicator */}
                  {leaveCount > 0 && item.isCurrentMonth && (
                    <div className="mt-0.5">
                      <span className="text-[9px] font-semibold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded-md">
                        {leaveCount} on leave
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-indigo-500 ring-2 ring-indigo-200"></div>
              <span className="text-[11px] font-medium text-slate-500">Today</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-rose-400"></div>
              <span className="text-[11px] font-medium text-slate-500">Sunday / Off</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-amber-400"></div>
              <span className="text-[11px] font-medium text-slate-500">Holiday</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
              <span className="text-[11px] font-medium text-slate-500">Working Day</span>
            </div>
          </div>

          {/* Holidays in this month */}
          {stats.holidayList.length > 0 && (
            <div className="mt-4 p-3 bg-amber-50/50 border border-amber-200/50 rounded-xl">
              <h4 className="text-xs font-bold text-amber-800 mb-1.5 flex items-center gap-1.5">
                <Palmtree className="h-3.5 w-3.5" />
                Holidays This Month
              </h4>
              <div className="flex flex-wrap gap-2">
                {stats.holidayList.map((h, i) => (
                  <Badge key={i} className="bg-amber-100 text-amber-700 border-amber-200 text-xs font-medium">
                    {h}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
