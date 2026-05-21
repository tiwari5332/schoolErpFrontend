export type AudienceRole = 'All' | 'Parents' | 'Teachers' | 'Students';
export type CommunicationChannel = 'Email' | 'SMS' | 'App Push';

export interface Announcement {
  id: string;
  title: string;
  message: string;
  targetAudience: AudienceRole;
  targetClass?: string; // Optional: specific grade/class, 'All' if not specified
  channels: CommunicationChannel[];
  sentAt: string;
  sentBy: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'PTM' | 'Staff Meeting' | 'General';
  participants: AudienceRole;
  link?: string; // e.g., Zoom/Meet link
  location?: string;
  organizer: string;
}

export interface AnnouncementTemplate {
  id: string;
  name: string;
  title: string;
  body: string;
  defaultChannels: CommunicationChannel[];
}

export const COMMUNICATION_TEMPLATES: AnnouncementTemplate[] = [
  {
    id: 'TPL1',
    name: 'Unexpected Holiday (Weather)',
    title: 'URGENT: School Closure Due to Weather',
    body: 'Dear Parents/Guardians, due to severe weather conditions, the school will remain closed tomorrow. Please stay safe. We will update you on further developments.',
    defaultChannels: ['SMS', 'Email', 'App Push']
  },
  {
    id: 'TPL2',
    name: 'Fee Reminder',
    title: 'Reminder: Upcoming Fee Deadline',
    body: 'Dear Parents, this is a gentle reminder that the term fee deadline is approaching. Please ensure payments are made to avoid late fees. Ignore if already paid.',
    defaultChannels: ['Email', 'App Push']
  },
  {
    id: 'TPL3',
    name: 'Exam Schedule Release',
    title: 'Mid-Term Examination Schedule Released',
    body: 'Dear Students and Parents, the timetable for the upcoming mid-term examinations has been published on the portal. Best of luck with preparations!',
    defaultChannels: ['Email', 'App Push']
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ANN1',
    title: 'Annual Sports Day Postponed',
    message: 'Due to unforeseen maintenance on the main field, the Annual Sports Day has been postponed to next Friday.',
    targetAudience: 'All',
    channels: ['Email', 'App Push'],
    sentAt: '2024-03-10T09:00:00Z',
    sentBy: 'Principal Office'
  },
  {
    id: 'ANN2',
    title: 'URGENT: School Closure Due to Snow',
    message: 'Dear Parents/Guardians, due to severe weather conditions, the school will remain closed tomorrow. Please stay safe.',
    targetAudience: 'Parents',
    channels: ['SMS', 'Email', 'App Push'],
    sentAt: '2024-01-15T18:30:00Z',
    sentBy: 'Admin Desk'
  }
];

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: 'MTG1',
    title: 'Grade 10 Parent-Teacher Meeting',
    date: '2024-04-20',
    startTime: '14:00',
    endTime: '17:00',
    type: 'PTM',
    participants: 'Parents',
    location: 'Main Auditorium',
    organizer: 'Academic Coordinator'
  },
  {
    id: 'MTG2',
    title: 'Monthly Staff Alignment',
    date: '2024-04-18',
    startTime: '15:30',
    endTime: '16:30',
    type: 'Staff Meeting',
    participants: 'Teachers',
    link: 'https://meet.google.com/abc-defg-hij',
    organizer: 'Principal Office'
  }
];
