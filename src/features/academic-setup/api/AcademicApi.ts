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

import { LocalStorageSync } from '../../../services/LocalStorageSync';

const USE_MOCK = true;

export const AcademicApi = {
  getTeachers: async (): Promise<SetupTeacher[]> => {
    if (USE_MOCK) {
      await delay(100);
      const data = LocalStorageSync.get<any[]>("edu_trio_teachers") || [];
      return data.map(t => ({
        ...t,
        subjectSpecialty: t.subjectSpecialty || t.subjects?.[0] || t.department || 'Core'
      }));
    }
    return await ApiService.get<SetupTeacher[]>('/academic/teachers');
  },

  getStudents: async (): Promise<SetupStudent[]> => {
    if (USE_MOCK) {
      await delay(100);
      const data = LocalStorageSync.get<any[]>("edu_trio_students") || [];
      return data.map(s => ({
        ...s,
        enrollmentId: s.enrollmentId || s.id,
        isMapped: !!s.isMapped
      }));
    }
    return await ApiService.get<SetupStudent[]>('/academic/students');
  },

  getDepartments: async (): Promise<Department[]> => {
    if (USE_MOCK) {
      await delay(100);
      const data = LocalStorageSync.get<Department[]>("edu_trio_departments");
      return data || [];
    }
    return await ApiService.get<Department[]>('/academic/departments');
  },

  getClasses: async (): Promise<ClassGroup[]> => {
    if (USE_MOCK) {
      await delay(100);
      const data = LocalStorageSync.get<ClassGroup[]>("edu_trio_classes");
      return data || [];
    }
    return await ApiService.get<ClassGroup[]>('/academic/classes');
  },

  saveDepartment: async (dept: Partial<Department>): Promise<Department> => {
    if (USE_MOCK) {
      await delay(200);
      const saved: Department = {
        id: dept.id || `DEPT${Date.now()}`,
        name: dept.name || '',
        description: dept.description || '',
        hodId: dept.hodId || null,
        teacherIds: dept.teacherIds || []
      };
      const list = LocalStorageSync.get<Department[]>("edu_trio_departments") || [];
      const index = list.findIndex(d => d.id === saved.id);
      if (index >= 0) {
        list[index] = saved;
      } else {
        list.push(saved);
      }
      LocalStorageSync.set("edu_trio_departments", list);
      return saved;
    }
    return await ApiService.post<Department>('/academic/departments', dept);
  },

  saveClass: async (cls: Partial<ClassGroup>): Promise<ClassGroup> => {
    if (USE_MOCK) {
      await delay(200);
      const saved: ClassGroup = {
        id: cls.id || `class_${Date.now()}`,
        grade: cls.grade || '',
        sections: cls.sections || []
      };
      const list = LocalStorageSync.get<ClassGroup[]>("edu_trio_classes") || [];
      const index = list.findIndex(c => c.id === saved.id);
      if (index >= 0) {
        list[index] = saved;
      } else {
        list.push(saved);
      }
      LocalStorageSync.set("edu_trio_classes", list);
      return saved;
    }
    return await ApiService.post<ClassGroup>('/academic/classes', cls);
  }
};
