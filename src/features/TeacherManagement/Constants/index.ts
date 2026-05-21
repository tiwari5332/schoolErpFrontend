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

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'TCH001',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@school.edu',
    phone: '+1 234-567-9001',
    department: 'Mathematics',
    subjects: ['Algebra', 'Geometry'],
    classes: ['5A', '5B', '4A'],
    experience: '8 years',
    qualification: 'PhD in Mathematics',
    status: 'Active',
    joinDate: '2020-08-15',
    address: '789 Academic Lane, City, State',
    avatar: ''
  },
  {
    id: 'TCH002',
    name: 'Mr. James Rodriguez',
    email: 'james.rodriguez@school.edu',
    phone: '+1 234-567-9002',
    department: 'Science',
    subjects: ['Physics', 'Chemistry'],
    classes: ['5A', '4B'],
    experience: '6 years',
    qualification: 'MSc in Physics',
    status: 'Active',
    joinDate: '2021-02-20',
    address: '456 Science Park, City, State',
    avatar: ''
  },
  {
    id: 'TCH003',
    name: 'Ms. Emily Chen',
    email: 'emily.chen@school.edu',
    phone: '+1 234-567-9003',
    department: 'English',
    subjects: ['Literature', 'Grammar'],
    classes: ['3A', '3B', '2A'],
    experience: '5 years',
    qualification: 'MA in English Literature',
    status: 'Active',
    joinDate: '2022-08-01',
    address: '123 Literary Road, City, State',
    avatar: ''
  },
  {
    id: 'TCH004',
    name: 'Mr. Michael Thompson',
    email: 'michael.thompson@school.edu',
    phone: '+1 234-567-9004',
    department: 'Physical Education',
    subjects: ['Sports', 'Health Education'],
    classes: ['All Grades'],
    experience: '10 years',
    qualification: 'BPE in Physical Education',
    status: 'On Leave',
    joinDate: '2019-06-10',
    address: '321 Sports Avenue, City, State',
    avatar: ''
  },
  {
    id: 'TCH005',
    name: 'Ms. Lisa Kumar',
    email: 'lisa.kumar@school.edu',
    phone: '+1 234-567-9005',
    department: 'Arts',
    subjects: ['Drawing', 'Music'],
    classes: ['1A', '1B', '2A', '2B'],
    experience: '4 years',
    qualification: 'BFA in Fine Arts',
    status: 'Active',
    joinDate: '2023-01-15',
    address: '567 Creative Street, City, State',
    avatar: ''
  }
];

export const DEPARTMENTS = ['Mathematics', 'Science', 'English', 'Physical Education', 'Arts', 'Social Studies'];

export const CLASS_PERFORMANCE_DATA = [
  { class: '5A', averageGrade: 88, studentCount: 25, attendance: 94 },
  { class: '5B', averageGrade: 92, studentCount: 27, attendance: 96 },
  { class: '4A', averageGrade: 85, studentCount: 24, attendance: 93 },
];

export const MONTHLY_PERFORMANCE = [
  { month: 'Jan', classAverage: 85, attendance: 94, assignments: 12 },
  { month: 'Feb', classAverage: 87, attendance: 95, assignments: 15 },
  { month: 'Mar', classAverage: 89, attendance: 96, assignments: 14 },
  { month: 'Apr', classAverage: 91, attendance: 93, assignments: 16 },
  { month: 'May', classAverage: 88, attendance: 97, assignments: 13 },
  { month: 'Jun', classAverage: 92, attendance: 95, assignments: 18 },
];

export const STUDENT_DISTRIBUTION = [
  { grade: 'A (90-100%)', count: 18, color: '#10b981' },
  { grade: 'B (80-89%)', count: 28, color: '#06b6d4' },
  { grade: 'C (70-79%)', count: 15, color: '#f59e0b' },
  { grade: 'D (60-69%)', count: 8, color: '#ef4444' },
  { grade: 'F (<60%)', count: 2, color: '#64748b' }
];

export const UPCOMING_SCHEDULE = [
  { time: '09:00 - 09:45', subject: 'Mathematics', class: '5A', room: 'Room 201' },
  { time: '10:00 - 10:45', subject: 'Algebra', class: '5B', room: 'Room 201' },
  { time: '11:15 - 12:00', subject: 'Geometry', class: '4A', room: 'Room 201' },
  { time: '14:00 - 14:45', subject: 'Mathematics', class: '5A', room: 'Room 201' },
];

export const ACHIEVEMENTS = [
  {
    title: 'Best Mathematics Teacher 2023',
    description: 'Awarded for exceptional student performance and innovative teaching methods',
    date: '2023-12-15',
    type: 'award'
  },
  {
    title: 'Professional Development Certification',
    description: 'Completed advanced training in modern teaching methodologies',
    date: '2024-01-20',
    type: 'certification'
  },
  {
    title: 'Student Satisfaction Excellence',
    description: 'Highest student satisfaction rating in Mathematics department',
    date: '2024-02-10',
    type: 'recognition'
  }
];

export const RECENT_ACTIVITIES = [
  {
    type: 'grade',
    title: 'Graded Mathematics Quiz for Class 5A',
    description: 'Average score: 88/100',
    time: '2 hours ago',
    status: 'completed'
  },
  {
    type: 'assignment',
    title: 'Created new Geometry assignment',
    description: 'Due date: Next Friday',
    time: '1 day ago',
    status: 'active'
  },
  {
    type: 'meeting',
    title: 'Parent-Teacher conference scheduled',
    description: 'Meeting with Alice Johnson\'s parents',
    time: 'Tomorrow 2:00 PM',
    status: 'upcoming'
  },
  {
    type: 'attendance',
    title: 'Submitted attendance for all classes',
    description: '98% average attendance this week',
    time: '3 days ago',
    status: 'completed'
  }
];
