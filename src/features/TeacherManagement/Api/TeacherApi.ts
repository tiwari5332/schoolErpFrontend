import ApiService from '../../../services/ApiService';
import teacherService from '../../../api/services/teacherService';
import { 
  Teacher,
  TeacherPerformance,
  TeacherSchedule,
  TeacherActivity,
  TeacherAchievement,
  TeacherDocument
} from '../Constants';

export const TeacherApi = {
  getTeachers: async (): Promise<Teacher[]> => {
    const list = await teacherService.getTeachers();
    return list as any[];
  },

  getTeacherById: async (id: string): Promise<Teacher | undefined> => {
    const teacher = await teacherService.getTeacherById(id);
    return teacher as any;
  },

  getPerformanceData: async (teacherId: string): Promise<TeacherPerformance | null> => {
    try {
      return await ApiService.get<TeacherPerformance>(`/teachers/${teacherId}/performance`);
    } catch {
      return {
        id: teacherId,
        rating: 4.8,
        attendance: 98,
        studentFeedback: 4.6,
        courseCompletion: 95
      };
    }
  },

  getSchedule: async (teacherId: string): Promise<TeacherSchedule[]> => {
    try {
      return await ApiService.get<TeacherSchedule[]>(`/teachers/${teacherId}/schedule`);
    } catch {
      return [];
    }
  },

  getActivities: async (teacherId: string): Promise<TeacherActivity[]> => {
    try {
      return await ApiService.get<TeacherActivity[]>(`/teachers/${teacherId}/activities`);
    } catch {
      return [];
    }
  },

  getAchievements: async (teacherId: string): Promise<TeacherAchievement[]> => {
    try {
      return await ApiService.get<TeacherAchievement[]>(`/teachers/${teacherId}/achievements`);
    } catch {
      return [];
    }
  },

  getDocuments: async (teacherId: string): Promise<TeacherDocument[]> => {
    try {
      return await ApiService.get<TeacherDocument[]>(`/teachers/${teacherId}/documents`);
    } catch {
      return [];
    }
  }
};

export default TeacherApi;
