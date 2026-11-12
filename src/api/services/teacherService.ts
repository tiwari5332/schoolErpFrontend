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

export interface UpdateTeacherPayload {
  name: string;
  email: string;
  loginMsisdn: string;
  designation: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | string;
  dateOfBirth: string; // YYYY-MM-DD
  address: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' | string;
  [key: string]: any;
}

/**
 * Normalizes gender to standard backend enum ('MALE' | 'FEMALE' | 'OTHER')
 */
export function normalizeTeacherGenderToApi(gender?: string): 'MALE' | 'FEMALE' | 'OTHER' {
  const g = String(gender || '').toUpperCase().trim();
  if (g.includes('FEMALE')) return 'FEMALE';
  if (g.includes('MALE')) return 'MALE';
  return 'OTHER';
}

/**
 * Normalizes status to standard backend enum ('ACTIVE' | 'INACTIVE' | 'ON_LEAVE')
 */
export function normalizeTeacherStatusToApi(status?: string): 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE' {
  const s = String(status || '').toUpperCase().trim();
  if (s.includes('INACTIVE') || s.includes('DISABLED') || s.includes('CLOSED')) return 'INACTIVE';
  if (s.includes('LEAVE')) return 'ON_LEAVE';
  return 'ACTIVE';
}

/**
 * Formats teacher update payload matching:
 * PUT /api/teachers/{{teacherId}}
 * {
 *   "name": "Dr. Anita Sharma",
 *   "email": "anita.sharma@schoolerp.com",
 *   "loginMsisdn": "9876543220",
 *   "designation": "Senior Faculty - Mathematics",
 *   "gender": "FEMALE",
 *   "dateOfBirth": "1988-06-15",
 *   "address": "456 Professors Enclave, New Delhi",
 *   "status": "ACTIVE"
 * }
 */
export function formatTeacherUpdatePayload(updates: Partial<UpdateTeacherPayload | TeacherDTO | any>): UpdateTeacherPayload {
  const rawPhone = String(
    updates.loginMsisdn ||
    updates.phone ||
    updates.phoneNumber ||
    updates.mobileNo ||
    ''
  ).trim();
  const digitsOnly = rawPhone.replace(/\D/g, '');
  const loginMsisdn = digitsOnly.length >= 10 ? digitsOnly.slice(-10) : (rawPhone || '');

  const rawDob = String(updates.dateOfBirth || updates.dob || '').trim();
  const dateOfBirth = rawDob ? rawDob.split('T')[0] : '';

  return {
    name: String(updates.name || updates.employeeName || '').trim(),
    email: String(updates.email || '').trim(),
    loginMsisdn,
    designation: String(updates.designation || updates.subject || (Array.isArray(updates.subjects) ? updates.subjects[0] : '') || '').trim(),
    gender: normalizeTeacherGenderToApi(updates.gender),
    dateOfBirth,
    address: String(updates.address || '').trim(),
    status: normalizeTeacherStatusToApi(updates.status),
  };
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

/**
 * Helper to extract an array of items from any backend response structure
 */
function extractTeachersArray(data: any): any[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;

  if (typeof data === 'object') {
    // 1. Direct array properties
    const directKeys = [
      'result',
      'results',
      'data',
      'teachers',
      'items',
      'records',
      'content',
      'rows',
      'payload',
      'list',
      'staff',
      'employees'
    ];

    for (const key of directKeys) {
      if (Array.isArray(data[key])) {
        return data[key];
      }
    }

    // 2. Nested data properties (e.g. data.result, data.teachers, data.items, etc.)
    if (data.data && typeof data.data === 'object') {
      if (Array.isArray(data.data)) return data.data;
      for (const key of directKeys) {
        if (Array.isArray(data.data[key])) {
          return data.data[key];
        }
      }
    }

    // 3. Nested result properties (e.g. result.teachers, result.items, result.data, etc.)
    if (data.result && typeof data.result === 'object') {
      if (Array.isArray(data.result)) return data.result;
      for (const key of directKeys) {
        if (Array.isArray(data.result[key])) {
          return data.result[key];
        }
      }
    }

    // 4. Any array found in object values
    for (const val of Object.values(data)) {
      if (Array.isArray(val)) {
        return val;
      }
    }
  }

  return [];
}

/**
 * Normalizes raw teacher object from backend to consistent TeacherDTO format
 */
function normalizeTeacher(raw: any, index: number = 0): TeacherDTO {
  if (!raw || typeof raw !== 'object') {
    return {
      id: `T-${index + 1}`,
      name: 'Staff Member',
      email: '—',
      phone: '—',
      department: 'General',
      subjects: [],
      classes: [],
      status: 'Active',
    };
  }

  const id = String(
    raw.id ||
    raw._id ||
    raw.employeeId ||
    raw.employeeCode ||
    raw.teacherId ||
    raw.staffId ||
    `T-${index + 1}`
  );

  const name = String(
    raw.name ||
    raw.employeeName ||
    raw.fullName ||
    raw.teacherName ||
    raw.adminName ||
    (raw.firstName ? [raw.firstName, raw.lastName].filter(Boolean).join(' ') : '') ||
    'Staff Member'
  ).trim();

  const email = String(raw.email || raw.emailAddress || raw.loginEmail || raw.mail || '—').trim();
  const phone = String(raw.phone || raw.phoneNumber || raw.mobileNo || raw.loginMsisdn || raw.msisdn || raw.contactNumber || '—').trim();

  // Handle department (can be string or object { id, name })
  let department = 'General';
  if (typeof raw.department === 'string' && raw.department.trim()) {
    department = raw.department.trim();
  } else if (raw.department && typeof raw.department === 'object' && raw.department.name) {
    department = String(raw.department.name).trim();
  } else if (raw.departmentName) {
    department = String(raw.departmentName).trim();
  } else if (raw.dept) {
    department = String(raw.dept).trim();
  }

  // Handle subjects
  let subjects: string[] = [];
  if (Array.isArray(raw.subjects)) {
    subjects = raw.subjects.map(String).map(s => s.trim()).filter(Boolean);
  } else if (typeof raw.subjects === 'string') {
    subjects = raw.subjects.split(',').map((s: string) => s.trim()).filter(Boolean);
  } else if (raw.subject) {
    subjects = [String(raw.subject).trim()];
  } else if (raw.subjectSpecialty) {
    subjects = [String(raw.subjectSpecialty).trim()];
  } else if (raw.designation) {
    subjects = [String(raw.designation).trim()];
  }

  // Handle classes
  let classes: string[] = [];
  if (Array.isArray(raw.classes)) {
    classes = raw.classes.map(String).map(s => s.trim()).filter(Boolean);
  } else if (typeof raw.classes === 'string') {
    classes = raw.classes.split(',').map((s: string) => s.trim()).filter(Boolean);
  } else if (raw.classNames) {
    classes = Array.isArray(raw.classNames) ? raw.classNames.map(String) : [String(raw.classNames)];
  } else if (raw.grade || raw.grades) {
    const g = raw.grade || raw.grades;
    classes = Array.isArray(g) ? g.map(String) : [String(g)];
  }

  // Handle status
  const rawStatus = String(raw.status || '').toLowerCase().trim();
  const status: 'Active' | 'On Leave' | 'Inactive' =
    rawStatus === 'on leave' || rawStatus === 'leave' || rawStatus === 'on_leave'
      ? 'On Leave'
      : rawStatus === 'inactive' || rawStatus === 'disabled'
      ? 'Inactive'
      : 'Active';

  return {
    ...raw,
    id,
    name,
    email,
    phone,
    department,
    subjects,
    classes,
    status,
    experience: raw.experience || (raw.yearsOfExperience ? `${raw.yearsOfExperience} Yrs` : '—'),
    avatar: raw.avatar || raw.profileImage || raw.photoUrl || raw.photo || '',
  };
}

export const teacherService = {
  /**
   * GET /api/teachers
   * Fetches all teachers with support for search/department/status filter parameters directly from backend API.
   */
  async getTeachers(params: TeacherFilterParams = {}): Promise<TeacherDTO[]> {
    try {
      const response = await httpClient.get<any>(
        API_ROUTES.TEACHERS,
        { params }
      );

      const rawList = extractTeachersArray(response.data);
      return rawList.map(normalizeTeacher);
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
   * Updates an existing teacher/staff record via backend API.
   * Target URL: /api/teachers/{{teacherId}}
   * Matches payload format:
   * {
   *   "name": "Dr. Anita Sharma",
   *   "email": "anita.sharma@schoolerp.com",
   *   "loginMsisdn": "9876543220",
   *   "designation": "Senior Faculty - Mathematics",
   *   "gender": "FEMALE",
   *   "dateOfBirth": "1988-06-15",
   *   "address": "456 Professors Enclave, New Delhi",
   *   "status": "ACTIVE"
   * }
   */
  async updateTeacher(id: string, updates: Partial<UpdateTeacherPayload | TeacherDTO | any>): Promise<TeacherDTO> {
    const teacherId = encodeURIComponent(String(id).trim());
    const payload = formatTeacherUpdatePayload(updates);

    try {
      const response = await httpClient.put<TeacherDTO>(`${API_ROUTES.TEACHERS}/${teacherId}`, payload);
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 405) {
        // Fallback to PATCH if method is PATCH on this server
        const response = await httpClient.patch<TeacherDTO>(`${API_ROUTES.TEACHERS}/${teacherId}`, payload);
        return response.data;
      }
      throw error;
    }
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
