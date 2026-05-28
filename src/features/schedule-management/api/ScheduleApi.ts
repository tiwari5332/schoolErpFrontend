import ApiService, { delay } from '../../../services/ApiService';
import { 
  TimeSlot,
  Subject,
  Teacher,
  ClassSection,
  ScheduleSession,
  DEFAULT_TIME_SLOTS
} from '../Constants';
import { LocalStorageSync } from '../../../services/LocalStorageSync';

const USE_MOCK = true;

const colorsMap: Record<string, string> = {
  mathematics: 'bg-blue-100 text-blue-800 border-blue-200',
  science: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  english: 'bg-amber-100 text-amber-800 border-amber-200',
  physics: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  history: 'bg-rose-100 text-rose-800 border-rose-200',
  chemistry: 'bg-teal-100 text-teal-800 border-teal-200',
  biology: 'bg-green-100 text-green-800 border-green-200',
};

const cleanGrade = (grade: string) => {
  const match = grade.match(/(?:Class|Grade)\s+(\d+)/i);
  return match ? match[1] : grade;
};

export const ScheduleApi = {
  getTimeSlots: async (): Promise<TimeSlot[]> => {
    if (USE_MOCK) {
      await delay(300);
      return [...DEFAULT_TIME_SLOTS];
    }
    return await ApiService.get<TimeSlot[]>('/schedule/timeslots');
  },

  getSubjects: async (): Promise<Subject[]> => {
    if (USE_MOCK) {
      await delay(300);
      const data = LocalStorageSync.get<any[]>("edu_trio_subjects") || [];
      return data.map(sub => ({
        id: sub.id,
        name: sub.name,
        colorCode: colorsMap[sub.id.toLowerCase()] || 'bg-slate-100 text-slate-800 border-slate-200'
      }));
    }
    return await ApiService.get<Subject[]>('/schedule/subjects');
  },

  getTeachers: async (): Promise<Teacher[]> => {
    if (USE_MOCK) {
      await delay(300);
      const data = LocalStorageSync.get<any[]>("edu_trio_teachers") || [];
      return data.map(t => ({
        id: t.id,
        name: t.name,
        subjectSpecialty: (t.subjects && t.subjects.length > 0) ? t.subjects[0] : (t.department || 'General')
      }));
    }
    return await ApiService.get<Teacher[]>('/schedule/teachers');
  },

  getClasses: async (): Promise<ClassSection[]> => {
    if (USE_MOCK) {
      await delay(300);
      const classesData = LocalStorageSync.get<any[]>("edu_trio_classes") || [];
      const classSections: ClassSection[] = [];
      classesData.forEach(cg => {
        if (cg.sections && Array.isArray(cg.sections)) {
          cg.sections.forEach((sec: any) => {
            classSections.push({
              id: sec.id,
              grade: cleanGrade(cg.grade),
              section: sec.name
            });
          });
        }
      });
      return classSections;
    }
    return await ApiService.get<ClassSection[]>('/schedule/classes');
  },

  getSessions: async (): Promise<ScheduleSession[]> => {
    if (USE_MOCK) {
      await delay(500);
      const data = LocalStorageSync.get<ScheduleSession[]>("edu_trio_schedule_sessions");
      return data || [];
    }
    return await ApiService.get<ScheduleSession[]>('/schedule/sessions');
  },

  saveSession: async (session: ScheduleSession): Promise<ScheduleSession> => {
    if (USE_MOCK) {
      await delay(400);
      const sessions = LocalStorageSync.get<ScheduleSession[]>("edu_trio_schedule_sessions") || [];
      const index = sessions.findIndex(s => s.id === session.id);
      if (index !== -1) {
        sessions[index] = session;
      } else {
        sessions.push(session);
      }
      LocalStorageSync.set("edu_trio_schedule_sessions", sessions);
      return session;
    }
    return await ApiService.post<ScheduleSession>('/schedule/sessions', session);
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    if (USE_MOCK) {
      await delay(400);
      const sessions = LocalStorageSync.get<ScheduleSession[]>("edu_trio_schedule_sessions") || [];
      const updated = sessions.filter(s => s.id !== sessionId);
      LocalStorageSync.set("edu_trio_schedule_sessions", updated);
      return;
    }
    return await ApiService.delete(`/schedule/sessions/${sessionId}`);
  }
};
