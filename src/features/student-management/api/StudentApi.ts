import ApiService, { delay } from '../../../services/ApiService';
import { 
  INITIAL_STUDENTS, 
  ATTENDANCE_DATA, 
  TEST_RESULTS, 
  RECENT_ACTIVITIES, 
  BEHAVIOR_DATA, 
  MOCK_STUDENT_DOCUMENTS, 
  MOCK_STUDENT_INCIDENTS,
  Student,
  StudentDocument,
  StudentIncident
} from '../constant';

const USE_MOCK = true;

export const StudentApi = {
  getStudents: async (): Promise<Student[]> => {
    if (USE_MOCK) {
      await delay(500);
      return [...INITIAL_STUDENTS];
    }
    return await ApiService.get<Student[]>('/students');
  },

  getStudentById: async (id: string): Promise<Student | undefined> => {
    if (USE_MOCK) {
      await delay(300);
      return INITIAL_STUDENTS.find(s => s.id === id);
    }
    return await ApiService.get<Student>(`/students/${id}`);
  },

  getAttendanceData: async () => {
    if (USE_MOCK) {
      await delay(400);
      return [...ATTENDANCE_DATA];
    }
    return await ApiService.get('/students/attendance');
  },

  getTestResults: async () => {
    if (USE_MOCK) {
      await delay(400);
      return [...TEST_RESULTS];
    }
    return await ApiService.get('/students/test-results');
  },

  getRecentActivities: async () => {
    if (USE_MOCK) {
      await delay(400);
      return [...RECENT_ACTIVITIES];
    }
    return await ApiService.get('/students/activities');
  },

  getBehaviorData: async () => {
    if (USE_MOCK) {
      await delay(400);
      return [...BEHAVIOR_DATA];
    }
    return await ApiService.get('/students/behavior');
  },

  getDocuments: async (studentId: string): Promise<StudentDocument[]> => {
    if (USE_MOCK) {
      await delay(500);
      return MOCK_STUDENT_DOCUMENTS.filter(d => d.studentId === studentId);
    }
    return await ApiService.get<StudentDocument[]>(`/students/${studentId}/documents`);
  },

  getIncidents: async (studentId: string): Promise<StudentIncident[]> => {
    if (USE_MOCK) {
      await delay(500);
      return MOCK_STUDENT_INCIDENTS.filter(i => i.studentId === studentId);
    }
    return await ApiService.get<StudentIncident[]>(`/students/${studentId}/incidents`);
  }
};
