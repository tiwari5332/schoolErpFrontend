import httpClient from '../httpClient';
import { Department, ClassGroup, SetupSubject } from '../../features/academic-setup/Constants';

/**
 * Department Request Payload Schema (aligns with POST/PUT backend API contracts)
 */
export interface DepartmentPayload {
  name: string;
  description: string;
  hodTeacherId?: string | null;
}

/**
 * Section Request Payload Schemas (aligns with POST/PUT backend API contracts)
 */
export interface CreateSectionPayload {
  gradeId: string;
  academicYearId: string;
  name: string[];
  classTeacherId?: string | null;
  capacity: number;
}

export interface UpdateSectionPayload {
  gradeId: string;
  academicYearId: string;
  name: string;
  classTeacherId?: string | null;
  capacity: number;
}

// Centralized API routes for Academic domain
const API_ROUTES = {
  DEPARTMENTS: '/api/academic/departments',
  CLASSES: '/api/academic/classes',
  SECTIONS: '/api/academic/sections',
  SUBJECTS: '/api/academic/subjects',
} as const;

export const academicService = {
  /**
   * GET /api/academic/departments
   * Fetches all departments directly from backend API.
   */
  async getDepartments(): Promise<Department[]> {
    const response = await httpClient.get<Department[]>(API_ROUTES.DEPARTMENTS);
    return response.data;
  },

  /**
   * POST /api/academic/departments
   * Creates a new department.
   */
  async createDepartment(payload: DepartmentPayload): Promise<Department> {
    const response = await httpClient.post<Department>(API_ROUTES.DEPARTMENTS, payload);
    return response.data;
  },

  /**
   * PUT /api/academic/departments/:id
   * Updates an existing department.
   */
  async updateDepartment(id: string, payload: DepartmentPayload): Promise<Department> {
    const response = await httpClient.put<Department>(`${API_ROUTES.DEPARTMENTS}/${id}`, payload);
    return response.data;
  },

  /**
   * DELETE /api/academic/departments/:id
   * Deletes a department by ID.
   */
  async deleteDepartment(id: string): Promise<void> {
    await httpClient.delete(`${API_ROUTES.DEPARTMENTS}/${id}`);
  },

  /**
   * Helper method to save department (determines whether to invoke POST or PUT).
   */
  async saveDepartment(department: Partial<Department>): Promise<Department> {
    const payload: DepartmentPayload = {
      name: department.name || '',
      description: department.description || '',
      hodTeacherId: department.hodTeacherId || department.hodId || null,
    };

    if (department.id && !department.id.startsWith('temp_')) {
      return this.updateDepartment(department.id, payload);
    }
    return this.createDepartment(payload);
  },

  /**
   * GET /api/academic/classes
   * Fetches all classes directly from backend API.
   */
  async getClasses(): Promise<ClassGroup[]> {
    const response = await httpClient.get<ClassGroup[]>(API_ROUTES.CLASSES);
    return response.data;
  },

  /**
   * POST /api/academic/classes
   * Creates a new grade/class.
   */
  async createClass(payload: { grade: string; departmentId?: string | null; sequenceOrder: number; stream?: string }): Promise<ClassGroup> {
    const response = await httpClient.post<ClassGroup>(API_ROUTES.CLASSES, payload);
    return response.data;
  },

  /**
   * PUT /api/academic/classes/:id
   * Updates an existing grade/class.
   */
  async updateClass(id: string, payload: { grade: string; departmentId?: string | null; sequenceOrder: number; stream?: string }): Promise<ClassGroup> {
    const response = await httpClient.put<ClassGroup>(`${API_ROUTES.CLASSES}/${id}`, payload);
    return response.data;
  },

  /**
   * DELETE /api/academic/classes/:id
   * Deletes a grade/class by ID.
   */
  async deleteClass(id: string): Promise<void> {
    await httpClient.delete(`${API_ROUTES.CLASSES}/${id}`);
  },

  /**
   * Helper method to save class (determines whether to invoke POST or PUT).
   */
  async saveClass(cls: Partial<ClassGroup>): Promise<ClassGroup> {
    const payload = {
      grade: cls.grade || '',
      departmentId: cls.departmentId || null,
      sequenceOrder: Math.max(1, Number(cls.sequenceOrder) || 1),
      stream: cls.stream || 'General',
    };

    if (cls.id && !cls.id.startsWith('temp_') && !cls.id.startsWith('class_')) {
      return this.updateClass(cls.id, payload);
    }
    return this.createClass(payload);
  },

  /**
   * POST /api/academic/sections
   * Creates new section(s) for a grade in an academic year.
   */
  async createSection(payload: CreateSectionPayload): Promise<any> {
    const response = await httpClient.post(API_ROUTES.SECTIONS, payload);
    return response.data;
  },

  /**
   * PUT /api/academic/sections/:sectionId
   * Updates an existing section.
   */
  async updateSection(sectionId: string, payload: UpdateSectionPayload): Promise<any> {
    const response = await httpClient.put(`${API_ROUTES.SECTIONS}/${sectionId}`, payload);
    return response.data;
  },

  /**
   * DELETE /api/academic/sections/:sectionId
   * Deletes a section by ID.
   */
  async deleteSection(sectionId: string): Promise<void> {
    await httpClient.delete(`${API_ROUTES.SECTIONS}/${sectionId}`);
  },

  /**
   * GET /api/academic/subjects
   * Fetches all subjects directly from backend API.
   */
  async getSubjects(): Promise<SetupSubject[]> {
    const response = await httpClient.get<SetupSubject[]>(API_ROUTES.SUBJECTS);
    return response.data;
  },
};

export default academicService;
