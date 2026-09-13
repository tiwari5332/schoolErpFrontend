import httpClient from '../httpClient';

export interface TeacherDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  subjects: string[];
  classes: string[];
  experience?: string;
  qualification?: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  joinDate?: string;
  address?: string;
  avatar?: string;
  [key: string]: any;
}

export interface CreateTeacherPayload {
  name: string;
  email: string;
  loginMsisdn: string;
  msisdnAlt1?: string;
  msisdnAlt2?: string;
  dob?: string;
  address?: string;
  emergencyContact?: string;
  employeeCode?: string;
  gender?: string;
  aadharNo?: string;
  panNo?: string;
  bankAccNo?: string;
  bankName?: string;
  bloodGroup?: string;
  dateOfJoining?: string;
  salaryTemplateId?: string;
  designation?: string;
  employeeType?: string;
  pfNo?: string;
  uanNo?: string;
  esiNo?: string;
  [key: string]: any;
}

export interface TeacherFilterParams {
  search?: string;
  department?: string;
  status?: string;
}

const API_ROUTES = {
  TEACHERS: '/api/teachers',
  ONBOARD_TEACHERS: '/api/onboarding/teachers',
} as const;

export const teacherService = {
  /**
   * GET /api/teachers
   * Fetches all teachers with support for search/department/status filter parameters directly from backend API.
   */
  async getTeachers(params: TeacherFilterParams = {}): Promise<TeacherDTO[]> {
    try {
      const response = await httpClient.get<TeacherDTO[] | { data?: TeacherDTO[]; teachers?: TeacherDTO[]; items?: TeacherDTO[] }>(
        API_ROUTES.TEACHERS,
        { params }
      );

      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data && typeof response.data === 'object') {
        const payloadArray = response.data.data || response.data.teachers || response.data.items;
        if (Array.isArray(payloadArray)) {
          return payloadArray;
        }
      }
      return [];
    } catch (error) {
      console.error('[teacherService.getTeachers] API request failed.', error);
      throw error;
    }
  },

  /**
   * GET /api/teachers/:id
   * Fetches a single teacher by ID directly from backend API.
   */
  async getTeacherById(id: string): Promise<TeacherDTO> {
    const response = await httpClient.get<TeacherDTO>(`${API_ROUTES.TEACHERS}/${id}`);
    return response.data;
  },

  /**
   * POST /api/onboarding/teachers
   * Onboards/creates a new teacher record via backend API.
   */
  async onboardTeacher(payload: CreateTeacherPayload): Promise<TeacherDTO> {
    try {
      const response = await httpClient.post<TeacherDTO>(API_ROUTES.ONBOARD_TEACHERS, payload);
      return response.data;
    } catch (error) {
      console.warn('[teacherService.onboardTeacher] /api/onboarding/teachers failed, trying /api/teachers.', error);
      const response = await httpClient.post<TeacherDTO>(API_ROUTES.TEACHERS, payload);
      return response.data;
    }
  },

  /**
   * POST /api/teachers
   */
  async createTeacher(teacher: Omit<TeacherDTO, 'id'> | CreateTeacherPayload): Promise<TeacherDTO> {
    const payload: CreateTeacherPayload = {
      name: teacher.name || '',
      email: teacher.email || '',
      loginMsisdn: (teacher as any).loginMsisdn || (teacher as any).phone || '',
      ...teacher,
    };
    return this.onboardTeacher(payload);
  },

  /**
   * PUT /api/teachers/:id
   * Updates an existing teacher record via backend API.
   */
  async updateTeacher(id: string, updates: Partial<TeacherDTO>): Promise<TeacherDTO> {
    const response = await httpClient.put<TeacherDTO>(`${API_ROUTES.TEACHERS}/${id}`, updates);
    return response.data;
  },

  /**
   * DELETE /api/teachers/:id
   * Deletes a teacher record by ID via backend API.
   */
  async deleteTeacher(id: string): Promise<{ success: boolean }> {
    const response = await httpClient.delete<{ success: boolean }>(`${API_ROUTES.TEACHERS}/${id}`);
    return response.data;
  },
};

export default teacherService;
