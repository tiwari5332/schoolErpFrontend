import ApiService, { delay } from '../../../services/ApiService';
import { 
  INITIAL_TEACHERS,
  Teacher,
  TeacherPerformance,
  TeacherSchedule,
  TeacherActivity,
  TeacherAchievement,
  TeacherDocument
} from '../Constants';

const USE_MOCK = true;

export const TeacherApi = {
  getTeachers: async (): Promise<Teacher[]> => {
    if (USE_MOCK) {
      await delay(500);
      return [...INITIAL_TEACHERS];
    }
    return await ApiService.get<Teacher[]>('/teachers');
  },

  getTeacherById: async (id: string): Promise<Teacher | undefined> => {
    if (USE_MOCK) {
      await delay(300);
      return INITIAL_TEACHERS.find(t => t.id === id);
    }
    return await ApiService.get<Teacher>(`/teachers/${id}`);
  },

  getPerformanceData: async (teacherId: string): Promise<TeacherPerformance | null> => {
    if (USE_MOCK) {
      await delay(400);
      // Dummy data response since performance data wasn't explicitly structured in Constants yet
      return {
        id: teacherId,
        rating: 4.8,
        attendance: 98,
        studentFeedback: 4.6,
        courseCompletion: 95
      };
    }
    return await ApiService.get<TeacherPerformance>(`/teachers/${teacherId}/performance`);
  },

  getSchedule: async (teacherId: string): Promise<TeacherSchedule[]> => {
    if (USE_MOCK) {
      await delay(400);
      return [];
    }
    return await ApiService.get<TeacherSchedule[]>(`/teachers/${teacherId}/schedule`);
  },

  getActivities: async (teacherId: string): Promise<TeacherActivity[]> => {
    if (USE_MOCK) {
      await delay(400);
      return [];
    }
    return await ApiService.get<TeacherActivity[]>(`/teachers/${teacherId}/activities`);
  },

  getAchievements: async (teacherId: string): Promise<TeacherAchievement[]> => {
    if (USE_MOCK) {
      await delay(400);
      return [];
    }
    return await ApiService.get<TeacherAchievement[]>(`/teachers/${teacherId}/achievements`);
  },

  getDocuments: async (teacherId: string): Promise<TeacherDocument[]> => {
    if (USE_MOCK) {
      await delay(500);
      return [];
    }
    return await ApiService.get<TeacherDocument[]>(`/teachers/${teacherId}/documents`);
  }
};
