// Centralized Local Storage sync service for School ERP data persistence.

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  grade: string;
  class: string;
  phone: string;
  address: string;
  status: string;
  admissionDate: string;
  guardian: string;
  avatar: string;
  feeStatus: "Paid" | "Pending" | "Overdue";
  enrollmentId: string;
  isMapped: boolean;
}

export interface TeacherRecord {
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

export interface DepartmentRecord {
  id: string;
  name: string;
  description: string;
  hodId: string | null;
  teacherIds: string[];
}

export interface SectionRecord {
  id: string;
  name: string; // e.g., 'A', 'B'
  classTeacherId: string | null;
  studentIds: string[];
}

export interface ClassGroupRecord {
  id: string;
  grade: string;
  sections: SectionRecord[];
}

export interface SubjectRecord {
  id: string;
  name: string;
  code: string;
  type: "Core" | "Elective" | "Language" | "Extracurricular";
}

// Initial Data seeds
const INITIAL_STUDENTS_SEED: StudentRecord[] = [
  { id: "STU001", name: "Aarav Patel", email: "aarav.patel@email.com", grade: "Grade 10", class: "SEC10A", phone: "+91 98765-43210", address: "123 Indiranagar, Bengaluru", status: "Active", admissionDate: "2023-08-15", guardian: "Robert Patel", avatar: "", feeStatus: "Paid", enrollmentId: "ENR-2024-001", isMapped: true },
  { id: "STU002", name: "Diya Sharma", email: "diya.sharma@email.com", grade: "Grade 10", class: "SEC10A", phone: "+91 98765-43211", address: "456 Koramangala, Bengaluru", status: "Active", admissionDate: "2023-08-20", guardian: "Mary Sharma", avatar: "", feeStatus: "Pending", enrollmentId: "ENR-2024-002", isMapped: true },
  { id: "STU003", name: "Vihaan Kumar", email: "vihaan.kumar@email.com", grade: "", class: "", phone: "+91 98765-43212", address: "789 Jayanagar, Bengaluru", status: "Active", admissionDate: "2023-08-18", guardian: "Kiran Kumar", avatar: "", feeStatus: "Paid", enrollmentId: "ENR-2024-003", isMapped: false },
  { id: "STU004", name: "Ananya Singh", email: "ananya.singh@email.com", grade: "", class: "", phone: "+91 98765-43213", address: "321 HSR Layout, Bengaluru", status: "Active", admissionDate: "2023-08-22", guardian: "Raj Singh", avatar: "", feeStatus: "Overdue", enrollmentId: "ENR-2024-004", isMapped: false },
  { id: "STU005", name: "Arjun Gupta", email: "arjun.gupta@email.com", grade: "", class: "", phone: "+91 98765-43214", address: "654 Whitefield, Bengaluru", status: "Active", admissionDate: "2023-08-25", guardian: "Rekha Gupta", avatar: "", feeStatus: "Paid", enrollmentId: "ENR-2024-005", isMapped: false },
  { id: "STU006", name: "Riya Reddy", email: "riya.reddy@email.com", grade: "", class: "", phone: "+91 98765-43215", address: "987 Marathahalli, Bengaluru", status: "Active", admissionDate: "2023-08-28", guardian: "Suresh Reddy", avatar: "", feeStatus: "Paid", enrollmentId: "ENR-2024-006", isMapped: false },
  { id: "STU007", name: "Alice Johnson", email: "alice.johnson@email.com", grade: "Grade 5", class: "5A", phone: "+1 234-567-8901", address: "123 Oak Street, City, State", status: "Active", admissionDate: "2023-08-15", guardian: "Robert Johnson", avatar: "", feeStatus: "Paid", enrollmentId: "ENR-2023-007", isMapped: true },
  { id: "STU008", name: "Bob Smith", email: "bob.smith@email.com", grade: "Grade 4", class: "4B", phone: "+1 234-567-8902", address: "456 Pine Avenue, City, State", status: "Active", admissionDate: "2023-08-20", guardian: "Mary Smith", avatar: "", feeStatus: "Pending", enrollmentId: "ENR-2023-008", isMapped: true },
  { id: "STU009", name: "Carol Davis", email: "carol.davis@email.com", grade: "Grade 3", class: "3A", phone: "+1 234-567-8903", address: "789 Elm Drive, City, State", status: "Active", admissionDate: "2023-08-18", guardian: "David Davis", avatar: "", feeStatus: "Paid", enrollmentId: "ENR-2023-009", isMapped: true },
];

const INITIAL_TEACHERS_SEED: TeacherRecord[] = [
  { id: "TCH001", name: "Sarah Connor", email: "sarah.connor@school.edu", phone: "+91 99887-76655", department: "Mathematics", subjects: ["Mathematics", "Algebra"], classes: ["Grade 10", "Grade 9"], experience: "8 years", qualification: "PhD in Mathematics", status: "Active", joinDate: "2020-08-15", address: "12 Math Road, Bengaluru", avatar: "" },
  { id: "TCH002", name: "John Smith", email: "john.smith@school.edu", phone: "+91 99887-76656", department: "Science", subjects: ["Science", "Physics", "Chemistry"], classes: ["Grade 10", "Grade 8"], experience: "6 years", qualification: "MSc in Physics", status: "Active", joinDate: "2021-02-20", address: "45 Science Ave, Bengaluru", avatar: "" },
  { id: "TCH003", name: "Emily Davis", email: "emily.davis@school.edu", phone: "+91 99887-76657", department: "English", subjects: ["English Literature", "Grammar"], classes: ["Grade 9"], experience: "5 years", qualification: "MA in English", status: "Active", joinDate: "2022-08-01", address: "78 Shakespeare Ln, Bengaluru", avatar: "" },
  { id: "TCH004", name: "Michael Thompson", email: "michael.thompson@school.edu", phone: "+91 99887-76658", department: "Physical Education", subjects: ["History", "Civics"], classes: ["Grade 10"], experience: "10 years", qualification: "MA in History", status: "On Leave", joinDate: "2019-06-10", address: "32 History St, Bengaluru", avatar: "" },
  { id: "TCH005", name: "Jessica Wilson", email: "jessica.wilson@school.edu", phone: "+91 99887-76659", department: "Science", subjects: ["Chemistry", "Biology"], classes: ["Grade 9"], experience: "4 years", qualification: "MSc in Chemistry", status: "Active", joinDate: "2023-01-15", address: "56 Chemistry Rd, Bengaluru", avatar: "" }
];

const INITIAL_DEPARTMENTS_SEED: DepartmentRecord[] = [
  { id: "DEPT1", name: "Science Faculty", description: "Physics, Chemistry, and Biology", hodId: "TCH002", teacherIds: ["TCH002", "TCH005"] },
  { id: "DEPT2", name: "Mathematics Faculty", description: "Core and Applied Mathematics", hodId: "TCH001", teacherIds: ["TCH001"] },
  { id: "DEPT3", name: "Humanities & Arts", description: "Literature, History, and Geography", hodId: "TCH003", teacherIds: ["TCH003", "TCH004"] }
];

const INITIAL_CLASSES_SEED: ClassGroupRecord[] = [
  {
    id: "class_10a",
    grade: "Class 10 - A",
    sections: [
      { id: "SEC10A", name: "A", classTeacherId: "TCH001", studentIds: ["STU001", "STU002"] },
      { id: "SEC10B", name: "B", classTeacherId: "TCH002", studentIds: [] }
    ]
  },
  {
    id: "class_9a",
    grade: "Class 9 - A",
    sections: [
      { id: "SEC9A", name: "A", classTeacherId: "TCH003", studentIds: [] }
    ]
  },
  {
    id: "class_8b",
    grade: "Class 8 - B",
    sections: [
      { id: "SEC8B", name: "B", classTeacherId: "TCH004", studentIds: [] }
    ]
  }
];

const INITIAL_SUBJECTS_SEED: SubjectRecord[] = [
  { id: "mathematics", name: "Mathematics", code: "MAT101", type: "Core" },
  { id: "science", name: "Science", code: "SCI101", type: "Core" },
  { id: "english", name: "English", code: "ENG101", type: "Language" },
  { id: "physics", name: "Physics", code: "PHY101", type: "Core" },
  { id: "history", name: "History", code: "HIS101", type: "Elective" },
];

const INITIAL_ADMINS_SEED = [
  { id: 'ADM001', name: 'John Anderson', email: 'john.anderson@school.edu', phone: '+1 234-567-8001', role: 'Super Admin', department: 'Administration', permissions: ['All Access'], status: 'Active', lastLogin: '2024-01-20 09:15 AM', createdDate: '2020-01-15', avatar: '' },
  { id: 'ADM002', name: 'Maria Garcia', email: 'maria.garcia@school.edu', phone: '+1 234-567-8002', role: 'Academic Admin', department: 'Academics', permissions: ['Student Management', 'Teacher Management', 'Academic Reports'], status: 'Active', lastLogin: '2024-01-20 08:30 AM', createdDate: '2021-03-10', avatar: '' },
  { id: 'ADM003', name: 'David Kim', email: 'david.kim@school.edu', phone: '+1 234-567-8003', role: 'Finance Admin', department: 'Finance', permissions: ['Fee Management', 'Financial Reports', 'Payment Processing'], status: 'Active', lastLogin: '2024-01-19 04:45 PM', createdDate: '2022-06-20', avatar: '' },
  { id: 'ADM004', name: 'Lisa Thompson', email: 'lisa.thompson@school.edu', phone: '+1 234-567-8004', role: 'IT Admin', department: 'IT', permissions: ['System Management', 'User Accounts', 'Technical Support'], status: 'Active', lastLogin: '2024-01-20 07:20 AM', createdDate: '2021-09-05', avatar: '' },
  { id: 'ADM005', name: 'Robert Lee', email: 'robert.lee@school.edu', phone: '+1 234-567-8005', role: 'HR Admin', department: 'Human Resources', permissions: ['Staff Management', 'Attendance', 'HR Reports'], status: 'Inactive', lastLogin: '2024-01-15 02:10 PM', createdDate: '2023-02-14', avatar: '' }
];

const INITIAL_FEES_SEED = [
  {
    id: 'FEE001',
    studentId: 'STU001',
    studentName: 'Aarav Patel',
    className: 'SEC10A',
    totalAmount: 5000,
    amountPaid: 5000,
    balance: 0,
    dueDate: '2024-03-01',
    status: 'Paid',
    avatar: '',
    breakdown: { tuition: 3000, transport: 1000, library: 500, miscellaneous: 500, discount: 0, lateFee: 0 },
    transactions: [
      { id: 'TRX1001', date: '2024-02-15T10:30:00Z', amount: 2000, method: 'Card', remarks: 'First installment' },
      { id: 'TRX1002', date: '2024-02-28T14:20:00Z', amount: 3000, method: 'Bank Transfer', remarks: 'Final installment' }
    ]
  },
  {
    id: 'FEE002',
    studentId: 'STU002',
    studentName: 'Diya Sharma',
    className: 'SEC10A',
    totalAmount: 4300,
    amountPaid: 2000,
    balance: 2300,
    dueDate: '2024-04-15',
    status: 'Pending',
    avatar: '',
    breakdown: { tuition: 3000, transport: 1000, library: 300, miscellaneous: 200, discount: 200, lateFee: 0 },
    transactions: [
      { id: 'TRX1003', date: '2024-04-01T09:15:00Z', amount: 2000, method: 'Cash', remarks: 'Partial payment' }
    ]
  },
  {
    id: 'FEE003',
    studentId: 'STU003',
    studentName: 'Vihaan Kumar',
    className: 'SEC9A',
    totalAmount: 4200,
    amountPaid: 0,
    balance: 4200,
    dueDate: '2024-02-15',
    status: 'Overdue',
    avatar: '',
    breakdown: { tuition: 2500, transport: 1000, library: 500, miscellaneous: 0, discount: 0, lateFee: 200 },
    transactions: []
  },
  {
    id: 'FEE004',
    studentId: 'STU004',
    studentName: 'Ananya Singh',
    className: 'SEC9A',
    totalAmount: 4500,
    amountPaid: 4500,
    balance: 0,
    dueDate: '2024-03-01',
    status: 'Paid',
    avatar: '',
    breakdown: { tuition: 3000, transport: 1000, library: 500, miscellaneous: 500, discount: 500, lateFee: 0 },
    transactions: [
      { id: 'TRX1004', date: '2024-02-20T11:00:00Z', amount: 4500, method: 'UPI', remarks: 'Full payment' }
    ]
  },
  {
    id: 'FEE005',
    studentId: 'STU005',
    studentName: 'Arjun Gupta',
    className: 'SEC8B',
    totalAmount: 6000,
    amountPaid: 3000,
    balance: 3000,
    dueDate: '2024-05-10',
    status: 'Pending',
    avatar: '',
    breakdown: { tuition: 4000, transport: 1000, library: 500, miscellaneous: 500, discount: 0, lateFee: 0 },
    transactions: [
      { id: 'TRX1005', date: '2024-04-20T16:45:00Z', amount: 3000, method: 'Bank Transfer', remarks: 'Half payment' }
    ]
  }
];

const INITIAL_ANNOUNCEMENTS_SEED = [
  { id: 'ANN1', title: 'Annual Sports Day Postponed', message: 'Due to unforeseen maintenance on the main field, the Annual Sports Day has been postponed to next Friday.', targetAudience: 'All', channels: ['Email', 'App Push'], sentAt: '2024-03-10T09:00:00Z', sentBy: 'Principal Office' },
  { id: 'ANN2', title: 'URGENT: School Closure Due to Snow', message: 'Dear Parents/Guardians, due to severe weather conditions, the school will remain closed tomorrow. Please stay safe.', targetAudience: 'Parents', channels: ['SMS', 'Email', 'App Push'], sentAt: '2024-01-15T18:30:00Z', sentBy: 'Admin Desk' }
];

const INITIAL_MEETINGS_SEED = [
  { id: 'MTG1', title: 'Grade 10 Parent-Teacher Meeting', date: '2024-04-20', startTime: '14:00', endTime: '17:00', type: 'PTM', participants: 'Parents', location: 'Main Auditorium', organizer: 'Academic Coordinator' },
  { id: 'MTG2', title: 'Monthly Staff Alignment', date: '2024-04-18', startTime: '15:30', endTime: '16:30', type: 'Staff Meeting', participants: 'Teachers', link: 'https://meet.google.com/abc-defg-hij', organizer: 'Principal Office' }
];

const INITIAL_SCHEDULE_SESSIONS_SEED = [
  { id: 'SES1', dayOfWeek: 'Monday', timeSlotId: 'TS1', classId: 'SEC10A', subjectId: 'mathematics', teacherId: 'TCH001', room: 'Room 101' },
  { id: 'SES2', dayOfWeek: 'Monday', timeSlotId: 'TS2', classId: 'SEC10A', subjectId: 'science', teacherId: 'TCH002', room: 'Lab 1' },
  { id: 'SES3', dayOfWeek: 'Monday', timeSlotId: 'TS3', classId: 'SEC10A', subjectId: 'english', teacherId: 'TCH003', room: 'Room 101' },
  { id: 'SES4', dayOfWeek: 'Monday', timeSlotId: 'TS4', classId: 'SEC10A', subjectId: 'physics', teacherId: 'TCH002', room: 'Room 101' },
  { id: 'SES5', dayOfWeek: 'Monday', timeSlotId: 'TS1', classId: 'SEC10B', subjectId: 'english', teacherId: 'TCH003', room: 'Room 102' },
  { id: 'SES6', dayOfWeek: 'Monday', timeSlotId: 'TS2', classId: 'SEC10B', subjectId: 'mathematics', teacherId: 'TCH001', room: 'Room 102' }
];

export const LocalStorageSync = {
  init: () => {
    if (typeof window === "undefined") return;

    // Validate and heal teachers
    const storedTeachersRaw = localStorage.getItem("edu_trio_teachers");
    if (!storedTeachersRaw) {
      localStorage.setItem("edu_trio_teachers", JSON.stringify(INITIAL_TEACHERS_SEED));
    } else {
      try {
        const storedTeachers = JSON.parse(storedTeachersRaw);
        if (Array.isArray(storedTeachers)) {
          const needsHealing = storedTeachers.some((t: any) => !t.subjects || !Array.isArray(t.subjects) || !t.email);
          if (needsHealing) {
            const healed = storedTeachers.map((t: any) => {
              const seed = INITIAL_TEACHERS_SEED.find((s: any) => s.id === t.id);
              return {
                ...INITIAL_TEACHERS_SEED[0],
                ...seed,
                ...t,
                subjects: t.subjects || seed?.subjects || [],
                classes: t.classes || seed?.classes || [],
                experience: t.experience || seed?.experience || '1 year',
                qualification: t.qualification || seed?.qualification || '',
                status: t.status || seed?.status || 'Active',
                joinDate: t.joinDate || seed?.joinDate || '2024-01-01',
                address: t.address || seed?.address || '',
                avatar: t.avatar || seed?.avatar || '',
              };
            });
            localStorage.setItem("edu_trio_teachers", JSON.stringify(healed));
          }
        }
      } catch (e) {
        localStorage.setItem("edu_trio_teachers", JSON.stringify(INITIAL_TEACHERS_SEED));
      }
    }

    // Validate and heal students
    const storedStudentsRaw = localStorage.getItem("edu_trio_students");
    if (!storedStudentsRaw) {
      localStorage.setItem("edu_trio_students", JSON.stringify(INITIAL_STUDENTS_SEED));
    } else {
      try {
        const storedStudents = JSON.parse(storedStudentsRaw);
        if (Array.isArray(storedStudents)) {
          const needsHealing = storedStudents.some((s: any) => s.email === undefined || s.guardian === undefined);
          if (needsHealing) {
            const healed = storedStudents.map((s: any) => {
              const seed = INITIAL_STUDENTS_SEED.find((sd: any) => sd.id === s.id);
              return {
                ...INITIAL_STUDENTS_SEED[0],
                ...seed,
                ...s,
                email: s.email || seed?.email || '',
                grade: s.grade || seed?.grade || '',
                class: s.class || seed?.class || '',
                phone: s.phone || seed?.phone || '',
                address: s.address || seed?.address || '',
                status: s.status || seed?.status || 'Active',
                admissionDate: s.admissionDate || seed?.admissionDate || '2024-01-01',
                guardian: s.guardian || seed?.guardian || '',
                feeStatus: s.feeStatus || seed?.feeStatus || 'Pending',
              };
            });
            localStorage.setItem("edu_trio_students", JSON.stringify(healed));
          }
        }
      } catch (e) {
        localStorage.setItem("edu_trio_students", JSON.stringify(INITIAL_STUDENTS_SEED));
      }
    }
    if (!localStorage.getItem("edu_trio_departments")) {
      localStorage.setItem("edu_trio_departments", JSON.stringify(INITIAL_DEPARTMENTS_SEED));
    }
    if (!localStorage.getItem("edu_trio_classes")) {
      localStorage.setItem("edu_trio_classes", JSON.stringify(INITIAL_CLASSES_SEED));
    }
    if (!localStorage.getItem("edu_trio_subjects")) {
      localStorage.setItem("edu_trio_subjects", JSON.stringify(INITIAL_SUBJECTS_SEED));
    }
    if (!localStorage.getItem("edu_trio_class_subjects")) {
      // Default mappings: Class ID -> Subject IDs
      const defaultClassSubjects = {
        class_10a: ["mathematics", "science", "english", "physics"],
        class_9a: ["mathematics", "science", "english", "history"],
        class_8b: ["mathematics", "english", "history"],
      };
      localStorage.setItem("edu_trio_class_subjects", JSON.stringify(defaultClassSubjects));
    }
    if (!localStorage.getItem("edu_trio_subject_mappings")) {
      // Default teacher assignment maps: Section ID -> Subject ID -> Teacher ID
      const defaultMappings = {
        SEC10A: { mathematics: "TCH001", science: "TCH002", english: "TCH003", physics: "TCH002" },
        SEC9A: { mathematics: "TCH001", science: "TCH005", english: "TCH003", history: "TCH004" },
      };
      localStorage.setItem("edu_trio_subject_mappings", JSON.stringify(defaultMappings));
    }
    if (!localStorage.getItem("edu_trio_exam_schedules")) {
      localStorage.setItem("edu_trio_exam_schedules", JSON.stringify([]));
    }
    if (!localStorage.getItem("edu_trio_student_marks")) {
      localStorage.setItem("edu_trio_student_marks", JSON.stringify({}));
    }
    if (!localStorage.getItem("edu_trio_admins")) {
      localStorage.setItem("edu_trio_admins", JSON.stringify(INITIAL_ADMINS_SEED));
    }
    if (!localStorage.getItem("edu_trio_fees")) {
      localStorage.setItem("edu_trio_fees", JSON.stringify(INITIAL_FEES_SEED));
    }
    if (!localStorage.getItem("edu_trio_announcements")) {
      localStorage.setItem("edu_trio_announcements", JSON.stringify(INITIAL_ANNOUNCEMENTS_SEED));
    }
    if (!localStorage.getItem("edu_trio_meetings")) {
      localStorage.setItem("edu_trio_meetings", JSON.stringify(INITIAL_MEETINGS_SEED));
    }
    if (!localStorage.getItem("edu_trio_schedule_sessions")) {
      localStorage.setItem("edu_trio_schedule_sessions", JSON.stringify(INITIAL_SCHEDULE_SESSIONS_SEED));
    }
  },

  // Generic Get/Set
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  }
};
