import ApiService, { delay } from '../../../services/ApiService';
import { 
  Announcement,
  Meeting,
  AnnouncementTemplate,
  COMMUNICATION_TEMPLATES,
  MOCK_ANNOUNCEMENTS,
  MOCK_MEETINGS
} from '../Constants';

const USE_MOCK = true;

export const CommunicationApi = {
  getAnnouncements: async (): Promise<Announcement[]> => {
    if (USE_MOCK) {
      await delay(400);
      return [...MOCK_ANNOUNCEMENTS];
    }
    return await ApiService.get<Announcement[]>('/communication/announcements');
  },

  getMeetings: async (): Promise<Meeting[]> => {
    if (USE_MOCK) {
      await delay(400);
      return [...MOCK_MEETINGS];
    }
    return await ApiService.get<Meeting[]>('/communication/meetings');
  },

  getTemplates: async (): Promise<AnnouncementTemplate[]> => {
    if (USE_MOCK) {
      await delay(200);
      return [...COMMUNICATION_TEMPLATES];
    }
    return await ApiService.get<AnnouncementTemplate[]>('/communication/templates');
  },

  sendAnnouncement: async (announcement: Partial<Announcement>): Promise<Announcement> => {
    if (USE_MOCK) {
      await delay(600);
      const newAnn: Announcement = {
        id: `ANN${Date.now()}`,
        title: announcement.title || '',
        message: announcement.message || '',
        targetAudience: announcement.targetAudience || 'All',
        targetClass: announcement.targetClass,
        channels: announcement.channels || [],
        sentAt: new Date().toISOString(),
        sentBy: announcement.sentBy || 'Admin'
      };
      return newAnn;
    }
    return await ApiService.post<Announcement>('/communication/announcements', announcement);
  },

  scheduleMeeting: async (meeting: Partial<Meeting>): Promise<Meeting> => {
    if (USE_MOCK) {
      await delay(600);
      const newMtg: Meeting = {
        id: `MTG${Date.now()}`,
        title: meeting.title || '',
        date: meeting.date || '',
        startTime: meeting.startTime || '',
        endTime: meeting.endTime || '',
        type: meeting.type || 'General',
        participants: meeting.participants || 'All',
        link: meeting.link,
        location: meeting.location,
        organizer: meeting.organizer || 'Admin'
      };
      return newMtg;
    }
    return await ApiService.post<Meeting>('/communication/meetings', meeting);
  }
};
