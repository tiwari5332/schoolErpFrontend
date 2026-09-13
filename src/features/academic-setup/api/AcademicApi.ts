import ApiService from '../../../services/ApiService';
import { 
  SetupTeacher,
  SetupStudent,
  Department,
  ClassGroup,
} from '../Constants';

import teacherService from '../../../api/services/teacherService';
import studentService from '../../../api/services/studentService';
import academicService from '../../../api/services/academicService';

export const AcademicApi = {
  getTeachers: async (): Promise<SetupTeacher[]> => {
    try {
      const list = await teacherService.getTeachers();
      if (list && list.length > 0) {
        return list.map(t => ({
          ...t,
          subjectSpecialty: t.subjectSpecialty || t.subjects?.[0] || t.department || 'Core'
        }));
      }
      return [];
    } catch (e) {
      console.warn('[AcademicApi.getTeachers] Failed to fetch teachers from API', e);
      return [];
    }
  },

  getStudents: async (): Promise<SetupStudent[]> => {
    try {
      const list = await studentService.getStudents();
      if (list && list.length > 0) {
        return list.map(s => ({
          ...s,
          enrollmentId: s.enrollmentId || s.id,
          isMapped: !!s.isMapped
        }));
      }
      return [];
    } catch (e) {
      console.warn('[AcademicApi.getStudents] Failed to fetch students from API', e);
      return [];
    }
  },

  getDepartments: async (): Promise<Department[]> => {
    return await academicService.getDepartments();
  },

  getClasses: async (): Promise<ClassGroup[]> => {
    return await academicService.getClasses();
  },

  saveDepartment: async (dept: Partial<Department>): Promise<Department> => {
    return await academicService.saveDepartment(dept);
  },

  deleteDepartment: async (id: string): Promise<void> => {
    return await academicService.deleteDepartment(id);
  },

  saveClass: async (cls: Partial<ClassGroup>): Promise<ClassGroup> => {
    return await academicService.saveClass(cls);
  },

  deleteClass: async (id: string): Promise<void> => {
    return await academicService.deleteClass(id);
  }
};
