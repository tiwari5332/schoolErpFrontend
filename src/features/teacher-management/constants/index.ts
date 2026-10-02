export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  subjects: string[];
  classes: string[];
  experience: string;
  qualification: string;
  status: string;
  joinDate: string;
  address: string;
  avatar: string;
}

export const INITIAL_TEACHERS: Teacher[] = [];

export const DEPARTMENTS = ['Mathematics', 'Science', 'English', 'Physical Education', 'Arts', 'Social Studies'];

export const CLASS_PERFORMANCE_DATA: any[] = [];

export const MONTHLY_PERFORMANCE: any[] = [];

export const STUDENT_DISTRIBUTION: any[] = [];

export const UPCOMING_SCHEDULE: any[] = [];

export const ACHIEVEMENTS: any[] = [];

export const RECENT_ACTIVITIES: any[] = [];
