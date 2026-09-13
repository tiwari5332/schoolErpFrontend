import { Teacher } from '../../TeacherManagement/Constants';
import { Student } from '../../student-management/constant';

export interface AcademicYear {
  id: string;
  name: string; // e.g. '2024-25', '2025-26'
  status: 'Current' | 'Draft' | 'Archived';
  isCurrent?: boolean;
}

export interface SetupTeacher extends Partial<Teacher> {
  id: string;
  name: string;
  subjectSpecialty: string;
}

export interface SetupStudent extends Partial<Student> {
  id: string;
  name: string;
  enrollmentId: string;
  isMapped: boolean;
  academicYearId?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  hodId?: string | null;
  hodTeacherId?: string | null;
  teacherIds?: string[];
  status?: 'Active' | 'Inactive';
  color?: string;
}

export interface Section {
  id: string;
  name: string; // e.g., 'A', 'B', 'Alpha'
  classTeacherId: string | null;
  studentIds: string[];
  capacity?: number;
}

export interface ClassGroup {
  id: string;
  grade: string; // e.g., 'Grade 10', 'Grade 9'
  name?: string;
  departmentId?: string | null;
  sequenceOrder?: number;
  stream?: 'Science' | 'Commerce' | 'Arts' | 'General';
  sections: Section[];
}

export interface SetupSubject {
  id: string;
  name: string;
  code: string;
  type: 'Core' | 'Elective' | 'Language' | 'Extracurricular';
  departmentId?: string | null;
  maxMarks?: number;
  passingMarks?: number;
  description?: string;
}

export const MOCK_ACADEMIC_YEARS: AcademicYear[] = [
  { id: 'ay_2023_24', name: '2023-24', status: 'Archived', isCurrent: false },
  { id: 'ay_2024_25', name: '2024-25', status: 'Current', isCurrent: true },
  { id: 'ay_2025_26', name: '2025-26', status: 'Draft', isCurrent: false },
  { id: 'ay_2026_27', name: '2026-27', status: 'Draft', isCurrent: false },
];

// ---- MOCK DATA ----

export const MOCK_SETUP_TEACHERS: SetupTeacher[] = [
  { id: 'TCH1', name: 'Sarah Connor', subjectSpecialty: 'Mathematics', department: 'Mathematics Faculty' },
  { id: 'TCH2', name: 'John Smith', subjectSpecialty: 'Physics', department: 'Science Faculty' },
  { id: 'TCH3', name: 'Emily Davis', subjectSpecialty: 'Literature', department: 'Humanities & Arts' },
  { id: 'TCH4', name: 'Michael Brown', subjectSpecialty: 'History', department: 'Humanities & Arts' },
  { id: 'TCH5', name: 'Jessica Wilson', subjectSpecialty: 'Chemistry', department: 'Science Faculty' },
  { id: 'TCH6', name: 'David Lee', subjectSpecialty: 'Computer Science', department: 'Science Faculty' },
];

export const MOCK_SETUP_STUDENTS: SetupStudent[] = [
  { id: 'STU001', name: 'Aarav Patel', enrollmentId: 'ENR-2024-001', isMapped: true, academicYearId: 'ay_2024_25' },
  { id: 'STU002', name: 'Diya Sharma', enrollmentId: 'ENR-2024-002', isMapped: true, academicYearId: 'ay_2024_25' },
  { id: 'STU003', name: 'Vihaan Kumar', enrollmentId: 'ENR-2024-003', isMapped: false, academicYearId: 'ay_2024_25' },
  { id: 'STU004', name: 'Ananya Singh', enrollmentId: 'ENR-2024-004', isMapped: false, academicYearId: 'ay_2024_25' },
  { id: 'STU005', name: 'Arjun Gupta', enrollmentId: 'ENR-2024-005', isMapped: false, academicYearId: 'ay_2024_25' },
  { id: 'STU006', name: 'Riya Reddy', enrollmentId: 'ENR-2024-006', isMapped: false, academicYearId: 'ay_2024_25' },
];

export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: 'DEPT1',
    name: 'Science Faculty',
    description: 'Physics, Chemistry, and Biology',
    hodId: 'TCH2',
    hodTeacherId: 'TCH2',
    teacherIds: ['TCH2', 'TCH5'],
    status: 'Active',
    color: '#3B82F6'
  },
  {
    id: 'DEPT2',
    name: 'Mathematics Faculty',
    description: 'Core and Applied Mathematics',
    hodId: 'TCH1',
    hodTeacherId: 'TCH1',
    teacherIds: ['TCH1'],
    status: 'Active',
    color: '#6366F1'
  },
  {
    id: 'DEPT3',
    name: 'Humanities & Arts',
    description: 'Literature, History, and Geography',
    hodId: 'TCH3',
    hodTeacherId: 'TCH3',
    teacherIds: ['TCH3', 'TCH4'],
    status: 'Active',
    color: '#EC4899'
  }
];

export const MOCK_CLASSES: ClassGroup[] = [
  {
    id: 'CLS10',
    grade: 'Grade 10',
    departmentId: 'DEPT2',
    sequenceOrder: 1,
    stream: 'Science',
    sections: [
      { id: 'SEC10A', name: 'Section A', classTeacherId: 'TCH1', capacity: 30, studentIds: ['STU001', 'STU002'] },
      { id: 'SEC10B', name: 'Section B', classTeacherId: 'TCH2', capacity: 30, studentIds: [] }
    ]
  },
  {
    id: 'CLS9',
    grade: 'Grade 9',
    departmentId: 'DEPT1',
    sequenceOrder: 2,
    stream: 'General',
    sections: [
      { id: 'SEC9A', name: 'Section A', classTeacherId: 'TCH3', capacity: 35, studentIds: [] }
    ]
  }
];

export const MOCK_SUBJECTS: SetupSubject[] = [
  { id: 'math101', name: 'Mathematics', code: 'MAT101', type: 'Core', departmentId: 'DEPT2', maxMarks: 100, passingMarks: 35, description: 'Algebra, Geometry & Arithmetic' },
  { id: 'phy101', name: 'Physics', code: 'PHY101', type: 'Core', departmentId: 'DEPT1', maxMarks: 100, passingMarks: 35, description: 'Mechanics, Electromagnetism & Optics' },
  { id: 'chem101', name: 'Chemistry', code: 'CHE101', type: 'Core', departmentId: 'DEPT1', maxMarks: 100, passingMarks: 35, description: 'Organic & Inorganic Chemistry' },
  { id: 'eng101', name: 'English Literature', code: 'ENG101', type: 'Language', departmentId: 'DEPT3', maxMarks: 100, passingMarks: 35, description: 'Prose, Poetry & Composition' },
  { id: 'hist101', name: 'History', code: 'HIS101', type: 'Core', departmentId: 'DEPT3', maxMarks: 100, passingMarks: 35, description: 'World and National History' },
  { id: 'cs101', name: 'Computer Science', code: 'CS101', type: 'Elective', departmentId: 'DEPT1', maxMarks: 100, passingMarks: 35, description: 'Programming and Algorithms' },
];

export const DEFAULT_CLASS_SUBJECTS: Record<string, string[]> = {
  CLS10: ['math101', 'phy101', 'chem101', 'eng101', 'cs101'],
  CLS9: ['math101', 'eng101', 'hist101'],
};

export const DEFAULT_SUBJECT_MAPPINGS: Record<string, Record<string, string>> = {
  SEC10A: { math101: 'TCH1', phy101: 'TCH2', chem101: 'TCH5', eng101: 'TCH3' },
  SEC10B: { math101: 'TCH1', cs101: 'TCH6' },
  SEC9A: { math101: 'TCH1', eng101: 'TCH3', hist101: 'TCH4' }
};
