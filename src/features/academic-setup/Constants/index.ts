import { Teacher } from '../../TeacherManagement/Constants';
import { Student } from '../../student-management/constant';

export interface SetupTeacher extends Teacher {
  subjectSpecialty: string;
}

export interface SetupStudent extends Student {
  enrollmentId: string;
  isMapped: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  hodId: string | null;
  teacherIds: string[];
}

export interface Section {
  id: string;
  name: string; // e.g., 'A', 'B', 'Alpha'
  classTeacherId: string | null;
  studentIds: string[];
}

export interface ClassGroup {
  id: string;
  grade: string; // e.g., '10', '9', 'Kindergarten'
  sections: Section[];
}

// ---- MOCK DATA ----

export const MOCK_SETUP_TEACHERS: SetupTeacher[] = [
  { id: 'TCH1', name: 'Sarah Connor', subjectSpecialty: 'Mathematics' },
  { id: 'TCH2', name: 'John Smith', subjectSpecialty: 'Physics' },
  { id: 'TCH3', name: 'Emily Davis', subjectSpecialty: 'Literature' },
  { id: 'TCH4', name: 'Michael Brown', subjectSpecialty: 'History' },
  { id: 'TCH5', name: 'Jessica Wilson', subjectSpecialty: 'Chemistry' },
  { id: 'TCH6', name: 'David Lee', subjectSpecialty: 'Computer Science' },
];

export const MOCK_SETUP_STUDENTS: SetupStudent[] = [
  { id: 'STU001', name: 'Aarav Patel', enrollmentId: 'ENR-2024-001', isMapped: true },
  { id: 'STU002', name: 'Diya Sharma', enrollmentId: 'ENR-2024-002', isMapped: true },
  { id: 'STU003', name: 'Vihaan Kumar', enrollmentId: 'ENR-2024-003', isMapped: false },
  { id: 'STU004', name: 'Ananya Singh', enrollmentId: 'ENR-2024-004', isMapped: false },
  { id: 'STU005', name: 'Arjun Gupta', enrollmentId: 'ENR-2024-005', isMapped: false },
  { id: 'STU006', name: 'Riya Reddy', enrollmentId: 'ENR-2024-006', isMapped: false },
];

export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: 'DEPT1',
    name: 'Science Faculty',
    description: 'Physics, Chemistry, and Biology',
    hodId: 'TCH2',
    teacherIds: ['TCH2', 'TCH5']
  },
  {
    id: 'DEPT2',
    name: 'Mathematics Faculty',
    description: 'Core and Applied Mathematics',
    hodId: 'TCH1',
    teacherIds: ['TCH1']
  },
  {
    id: 'DEPT3',
    name: 'Humanities & Arts',
    description: 'Literature, History, and Geography',
    hodId: 'TCH3',
    teacherIds: ['TCH3', 'TCH4']
  }
];

export const MOCK_CLASSES: ClassGroup[] = [
  {
    id: 'CLS10',
    grade: 'Grade 10',
    sections: [
      { id: 'SEC10A', name: 'Section A', classTeacherId: 'TCH1', studentIds: ['STU001', 'STU002'] },
      { id: 'SEC10B', name: 'Section B', classTeacherId: 'TCH2', studentIds: [] }
    ]
  },
  {
    id: 'CLS9',
    grade: 'Grade 9',
    sections: [
      { id: 'SEC9A', name: 'Section A', classTeacherId: 'TCH3', studentIds: [] }
    ]
  }
];
