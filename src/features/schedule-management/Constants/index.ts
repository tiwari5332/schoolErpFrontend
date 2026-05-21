export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  periodNumber: number;
  isBreak: boolean;
  label?: string;
}

export interface Subject {
  id: string;
  name: string;
  colorCode: string;
}

export interface Teacher {
  id: string;
  name: string;
  subjectSpecialty: string;
}

export interface ClassSection {
  id: string;
  grade: string;
  section: string;
}

export interface ScheduleSession {
  id: string;
  dayOfWeek: string;
  timeSlotId: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  room: string;
}

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  { id: 'TS1', startTime: '08:00', endTime: '08:45', periodNumber: 1, isBreak: false },
  { id: 'TS2', startTime: '08:45', endTime: '09:30', periodNumber: 2, isBreak: false },
  { id: 'TS3', startTime: '09:30', endTime: '10:15', periodNumber: 3, isBreak: false },
  { id: 'TSB1', startTime: '10:15', endTime: '10:30', periodNumber: 0, isBreak: true, label: 'Short Break' },
  { id: 'TS4', startTime: '10:30', endTime: '11:15', periodNumber: 4, isBreak: false },
  { id: 'TS5', startTime: '11:15', endTime: '12:00', periodNumber: 5, isBreak: false },
  { id: 'TSB2', startTime: '12:00', endTime: '12:45', periodNumber: 0, isBreak: true, label: 'Lunch Break' },
  { id: 'TS6', startTime: '12:45', endTime: '13:30', periodNumber: 6, isBreak: false },
  { id: 'TS7', startTime: '13:30', endTime: '14:15', periodNumber: 7, isBreak: false },
  { id: 'TS8', startTime: '14:15', endTime: '15:00', periodNumber: 8, isBreak: false },
];

export const MOCK_SUBJECTS: Subject[] = [
  { id: 'SUB1', name: 'Mathematics', colorCode: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'SUB2', name: 'Science', colorCode: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { id: 'SUB3', name: 'English', colorCode: 'bg-amber-100 text-amber-800 border-amber-200' },
  { id: 'SUB4', name: 'History', colorCode: 'bg-rose-100 text-rose-800 border-rose-200' },
  { id: 'SUB5', name: 'Physical Ed', colorCode: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 'SUB6', name: 'Computer Sci', colorCode: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: 'TCH1', name: 'Sarah Connor', subjectSpecialty: 'Mathematics' },
  { id: 'TCH2', name: 'John Smith', subjectSpecialty: 'Science' },
  { id: 'TCH3', name: 'Emily Davis', subjectSpecialty: 'English' },
  { id: 'TCH4', name: 'Michael Brown', subjectSpecialty: 'History' },
  { id: 'TCH5', name: 'Jessica Wilson', subjectSpecialty: 'Physical Ed' },
  { id: 'TCH6', name: 'David Lee', subjectSpecialty: 'Computer Sci' },
];

export const MOCK_CLASSES: ClassSection[] = [
  { id: 'CLS1', grade: '10', section: 'A' },
  { id: 'CLS2', grade: '10', section: 'B' },
  { id: 'CLS3', grade: '9', section: 'A' },
  { id: 'CLS4', grade: '9', section: 'B' },
  { id: 'CLS5', grade: '8', section: 'A' },
];

export const INITIAL_SCHEDULE_SESSIONS: ScheduleSession[] = [
  // Class 10A Monday
  { id: 'SES1', dayOfWeek: 'Monday', timeSlotId: 'TS1', classId: 'CLS1', subjectId: 'SUB1', teacherId: 'TCH1', room: 'Room 101' },
  { id: 'SES2', dayOfWeek: 'Monday', timeSlotId: 'TS2', classId: 'CLS1', subjectId: 'SUB2', teacherId: 'TCH2', room: 'Lab 1' },
  { id: 'SES3', dayOfWeek: 'Monday', timeSlotId: 'TS3', classId: 'CLS1', subjectId: 'SUB3', teacherId: 'TCH3', room: 'Room 101' },
  { id: 'SES4', dayOfWeek: 'Monday', timeSlotId: 'TS4', classId: 'CLS1', subjectId: 'SUB4', teacherId: 'TCH4', room: 'Room 101' },
  // Class 10B Monday
  { id: 'SES5', dayOfWeek: 'Monday', timeSlotId: 'TS1', classId: 'CLS2', subjectId: 'SUB3', teacherId: 'TCH3', room: 'Room 102' },
  { id: 'SES6', dayOfWeek: 'Monday', timeSlotId: 'TS2', classId: 'CLS2', subjectId: 'SUB1', teacherId: 'TCH1', room: 'Room 102' },
  
  // Notice TCH1 teaches CLS1 at TS1, and CLS2 at TS2.
];
