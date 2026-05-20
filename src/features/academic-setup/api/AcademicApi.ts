import ApiService, { delay } from '../../../services/ApiService';
import { 
  SetupTeacher,
  SetupStudent,
  Department,
  ClassGroup,
  MOCK_SETUP_TEACHERS,
  MOCK_SETUP_STUDENTS,
  MOCK_DEPARTMENTS,
  MOCK_CLASSES
} from '../Constants';

const USE_MOCK = true;

export const AcademicApi = {
  getTeachers: async (): Promise<SetupTeacher[]> => {
    if (USE_MOCK) {
      await delay(300);
      return [...MOCK_SETUP_TEACHERS];
    }
    return await ApiService.get<SetupTeacher[]>('/academic/teachers');
  },

  getStudents: async (): Promise<SetupStudent[]> => {
    if (USE_MOCK) {
      await delay(300);
      return [...MOCK_SETUP_STUDENTS];
    }
    return await ApiService.get<SetupStudent[]>('/academic/students');
  },

  getDepartments: async (): Promise<Department[]> => {
    if (USE_MOCK) {
      await delay(400);
      return [...MOCK_DEPARTMENTS];
    }
    return await ApiService.get<Department[]>('/academic/departments');
  },

  getClasses: async (): Promise<ClassGroup[]> => {
    if (USE_MOCK) {
      await delay(400);
      return [...MOCK_CLASSES];
    }
    return await ApiService.get<ClassGroup[]>('/academic/classes');
  },

  saveDepartment: async (dept: Partial<Department>): Promise<Department> => {
    if (USE_MOCK) {
      await delay(500);
      return {
        id: dept.id || `DEPT${Date.now()}`,
        name: dept.name || '',
        description: dept.description || '',
        hodId: dept.hodId || null,
        teacherIds: dept.teacherIds || []
      };
    }
    return await ApiService.post<Department>('/academic/departments', dept);
  },

  saveClass: async (cls: Partial<ClassGroup>): Promise<ClassGroup> => {
    if (USE_MOCK) {
      await delay(500);
      return {
        id: cls.id || `CLS${Date.now()}`,
        grade: cls.grade || '',
        sections: cls.sections || []
      };
    }
    return await ApiService.post<ClassGroup>('/academic/classes', cls);
  }
};
