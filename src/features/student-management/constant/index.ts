export interface Student {
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
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
}

export const GRADES = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
  'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'
];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
export const GENDERS = ['Male', 'Female', 'Other'];
export const RELATIONS = ['Father', 'Mother', 'Guardian', 'Other'];
export const STATUSES = ['Active', 'Inactive'];
export const FEE_STATUSES = ['Paid', 'Pending', 'Overdue'];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'STU001',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    grade: 'Grade 5',
    class: '5A',
    phone: '+1 234-567-8901',
    address: '123 Oak Street, City, State',
    status: 'Active',
    admissionDate: '2023-08-15',
    guardian: 'Robert Johnson',
    avatar: '',
    feeStatus: 'Paid'
  },
  {
    id: 'STU002',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    grade: 'Grade 4',
    class: '4B',
    phone: '+1 234-567-8902',
    address: '456 Pine Avenue, City, State',
    status: 'Active',
    admissionDate: '2023-08-20',
    guardian: 'Mary Smith',
    avatar: '',
    feeStatus: 'Pending'
  },
  {
    id: 'STU003',
    name: 'Carol Davis',
    email: 'carol.davis@email.com',
    grade: 'Grade 3',
    class: '3A',
    phone: '+1 234-567-8903',
    address: '789 Elm Drive, City, State',
    status: 'Inactive',
    admissionDate: '2023-08-18',
    guardian: 'David Davis',
    avatar: '',
    feeStatus: 'Paid'
  },
  {
    id: 'STU004',
    name: 'Daniel Wilson',
    email: 'daniel.wilson@email.com',
    grade: 'Grade 5',
    class: '5B',
    phone: '+1 234-567-8904',
    address: '321 Maple Road, City, State',
    status: 'Active',
    admissionDate: '2023-08-22',
    guardian: 'Lisa Wilson',
    avatar: '',
    feeStatus: 'Overdue'
  },
  {
    id: 'STU005',
    name: 'Emma Brown',
    email: 'emma.brown@email.com',
    grade: 'Grade 2',
    class: '2A',
    phone: '+1 234-567-8905',
    address: '654 Cedar Lane, City, State',
    status: 'Active',
    admissionDate: '2023-08-25',
    guardian: 'Michael Brown',
    avatar: '',
    feeStatus: 'Paid'
  }
];

export const ATTENDANCE_DATA = [
  { month: 'Jan', percentage: 96, present: 22, absent: 1, total: 23 },
  { month: 'Feb', percentage: 94, present: 21, absent: 1, total: 22 },
  { month: 'Mar', percentage: 98, present: 25, absent: 0, total: 25 },
  { month: 'Apr', percentage: 92, present: 21, absent: 2, total: 23 },
  { month: 'May', percentage: 95, present: 23, absent: 1, total: 24 },
  { month: 'Jun', percentage: 97, present: 24, absent: 1, total: 25 },
];

export const TEST_RESULTS = [
  { 
    subject: 'Mathematics', 
    grade: 92, 
    color: '#6366f1',
    tests: [
      { name: 'Mid-term Exam', score: 88, maxScore: 100, date: '2024-03-15' },
      { name: 'Unit Test 1', score: 95, maxScore: 100, date: '2024-02-20' },
      { name: 'Quiz 1', score: 18, maxScore: 20, date: '2024-02-05' }
    ]
  },
  { 
    subject: 'Science', 
    grade: 88, 
    color: '#10b981',
    tests: [
      { name: 'Mid-term Exam', score: 85, maxScore: 100, date: '2024-03-18' },
      { name: 'Unit Test 1', score: 90, maxScore: 100, date: '2024-02-22' },
      { name: 'Lab Test', score: 89, maxScore: 100, date: '2024-02-10' }
    ]
  },
  { 
    subject: 'English', 
    grade: 95, 
    color: '#f59e0b',
    tests: [
      { name: 'Mid-term Exam', score: 93, maxScore: 100, date: '2024-03-20' },
      { name: 'Essay Test', score: 96, maxScore: 100, date: '2024-02-25' },
      { name: 'Reading Test', score: 97, maxScore: 100, date: '2024-02-12' }
    ]
  },
  { 
    subject: 'Social Studies', 
    grade: 90, 
    color: '#ef4444',
    tests: [
      { name: 'Mid-term Exam', score: 87, maxScore: 100, date: '2024-03-22' },
      { name: 'Unit Test 1', score: 92, maxScore: 100, date: '2024-02-28' },
      { name: 'Project', score: 91, maxScore: 100, date: '2024-02-15' }
    ]
  },
  { 
    subject: 'Arts', 
    grade: 96, 
    color: '#a855f7',
    tests: [
      { name: 'Practical Exam', score: 94, maxScore: 100, date: '2024-03-25' },
      { name: 'Portfolio Review', score: 98, maxScore: 100, date: '2024-03-01' },
      { name: 'Art Project', score: 96, maxScore: 100, date: '2024-02-18' }
    ]
  },
];

export const RECENT_ACTIVITIES = [
  {
    type: 'test',
    title: 'Mathematics Quiz completed',
    score: '18/20',
    time: '2 hours ago',
    status: 'good'
  },
  {
    type: 'attendance',
    title: 'Present in all classes',
    time: 'Today',
    status: 'good'
  },
  {
    type: 'assignment',
    title: 'Science project submitted',
    score: '89/100',
    time: 'Yesterday',
    status: 'good'
  },
  {
    type: 'notification',
    title: 'Parent-Teacher meeting scheduled',
    time: 'Tomorrow 2:00 PM',
    status: 'info'
  }
];

export const BEHAVIOR_DATA = [
  { name: 'Excellent', value: 60, color: '#10b981' },
  { name: 'Good', value: 30, color: '#06b6d4' },
  { name: 'Needs Improvement', value: 10, color: '#f59e0b' }
];

export interface StudentDocument {
  id: string;
  studentId: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  status: 'Verified' | 'Pending' | 'Rejected';
}

export interface StudentIncident {
  id: string;
  studentId: string;
  date: string;
  type: 'Merit' | 'Demerit';
  category: string;
  description: string;
  reportedBy: string;
  points: number;
}

export const MOCK_STUDENT_DOCUMENTS: StudentDocument[] = [
  { id: 'DOC001', studentId: 'STU001', name: 'Birth Certificate.pdf', type: 'application/pdf', uploadDate: '2023-08-15', size: '2.4 MB', status: 'Verified' },
  { id: 'DOC002', studentId: 'STU001', name: 'Previous_School_Transfer.pdf', type: 'application/pdf', uploadDate: '2023-08-16', size: '1.1 MB', status: 'Verified' },
  { id: 'DOC003', studentId: 'STU001', name: 'Medical_Record_2024.jpg', type: 'image/jpeg', uploadDate: '2024-01-10', size: '850 KB', status: 'Pending' },
];

export const MOCK_STUDENT_INCIDENTS: StudentIncident[] = [
  { id: 'INC001', studentId: 'STU001', date: '2024-02-15', type: 'Merit', category: 'Academic Excellence', description: 'Scored highest in district Science Fair.', reportedBy: 'Dr. Emily Chen', points: 10 },
  { id: 'INC002', studentId: 'STU001', date: '2024-01-20', type: 'Merit', category: 'Leadership', description: 'Volunteered to organize the morning assembly for the week.', reportedBy: 'Mr. Robert Smith', points: 5 },
  { id: 'INC003', studentId: 'STU001', date: '2023-11-05', type: 'Demerit', category: 'Tardiness', description: 'Late to first period without a valid pass.', reportedBy: 'Mrs. Sarah Johnson', points: -2 },
];
