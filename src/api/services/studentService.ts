import httpClient from '../httpClient';

export interface StudentDTO {
  id: string;
  name: string;
  rollNo?: string;
  grade?: string;
  section?: string;
  email?: string;
  phone?: string;
  status?: 'Active' | 'Inactive' | 'Pending';
  gender?: string;
  guardianName?: string;
  guardianPhone?: string;
  address?: string;
  [key: string]: any;
}

export interface StudentFilterParams {
  search?: string;
  grade?: string;
  status?: string;
  page?: number;
  limit?: number;
}

/**
 * Student Domain Service
 * Pure network request layer encapsulating HTTP endpoints for Students.
 */
export const studentService = {
  /**
   * Fetch list of students with optional filtering directly from backend API
   */
  async getStudents(params: StudentFilterParams = {}): Promise<StudentDTO[]> {
    try {
      const response = await httpClient.get<StudentDTO[]>('/api/v1/students', { params });
      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data && typeof response.data === 'object') {
        const possibleArray = (response.data as any).data || (response.data as any).students || (response.data as any).items;
        if (Array.isArray(possibleArray)) {
          return possibleArray;
        }
      }
      return [];
    } catch (e) {
      console.error('[studentService.getStudents] API request failed.', e);
      return [];
    }
  },

  /**
   * Fetch single student by ID
   */
  async getStudentById(id: string): Promise<StudentDTO> {
    const response = await httpClient.get<StudentDTO>(`/api/v1/students/${id}`);
    return response.data;
  },

  /**
   * Create new student record
   */
  async createStudent(payload: Partial<StudentDTO>): Promise<StudentDTO> {
    const response = await httpClient.post<StudentDTO>('/api/v1/students', payload);
    return response.data;
  },

  /**
   * Update existing student record
   */
  async updateStudent(id: string, payload: Partial<StudentDTO>): Promise<StudentDTO> {
    const response = await httpClient.put<StudentDTO>(`/api/v1/students/${id}`, payload);
    return response.data;
  },

  /**
   * Delete student record
   */
  async deleteStudent(id: string): Promise<void> {
    await httpClient.delete(`/api/v1/students/${id}`);
  },
};

export default studentService;
