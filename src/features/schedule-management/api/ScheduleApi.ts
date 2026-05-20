import ApiService, { delay } from '../../../services/ApiService';
import { 
  TimeSlot,
  Subject,
  Teacher,
  ClassSection,
  ScheduleSession,
  DEFAULT_TIME_SLOTS,
  MOCK_SUBJECTS,
  MOCK_TEACHERS,
  MOCK_CLASSES,
  INITIAL_SCHEDULE_SESSIONS
} from '../Constants';

const USE_MOCK = true;

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
      return [...MOCK_SUBJECTS];
    }
    return await ApiService.get<Subject[]>('/schedule/subjects');
  },

  getTeachers: async (): Promise<Teacher[]> => {
    if (USE_MOCK) {
      await delay(300);
      return [...MOCK_TEACHERS];
    }
    return await ApiService.get<Teacher[]>('/schedule/teachers');
  },

  getClasses: async (): Promise<ClassSection[]> => {
    if (USE_MOCK) {
      await delay(300);
      return [...MOCK_CLASSES];
    }
    return await ApiService.get<ClassSection[]>('/schedule/classes');
  },

  getSessions: async (): Promise<ScheduleSession[]> => {
    if (USE_MOCK) {
      await delay(500);
      return [...INITIAL_SCHEDULE_SESSIONS];
    }
    return await ApiService.get<ScheduleSession[]>('/schedule/sessions');
  },

  saveSession: async (session: ScheduleSession): Promise<ScheduleSession> => {
    if (USE_MOCK) {
      await delay(400);
      return session; // simulate save
    }
    return await ApiService.post<ScheduleSession>('/schedule/sessions', session);
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    if (USE_MOCK) {
      await delay(400);
      return;
    }
    return await ApiService.delete(`/schedule/sessions/${sessionId}`);
  }
};
