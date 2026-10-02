import ApiService, { delay } from '../../../services/ApiService';
import { 
  Announcement,
  Meeting,
  AnnouncementTemplate,
  COMMUNICATION_TEMPLATES,
  EventCategory,
  DEFAULT_EVENT_CATEGORIES
} from '../Constants';
import { LocalStorageSync } from '../../../services/LocalStorageSync';

const USE_MOCK = true;

export const CommunicationApi = {
  getEventCategories: async (): Promise<EventCategory[]> => {
    if (USE_MOCK) {
      await delay(200);
      const stored = LocalStorageSync.get<EventCategory[]>("edu_trio_event_categories");
      if (!stored || stored.length === 0) {
        LocalStorageSync.set("edu_trio_event_categories", DEFAULT_EVENT_CATEGORIES);
        return [...DEFAULT_EVENT_CATEGORIES];
      }
      return stored;
    }
    return await ApiService.get<EventCategory[]>('/communication/event-categories');
  },

  saveEventCategory: async (category: Partial<EventCategory>): Promise<EventCategory> => {
    if (USE_MOCK) {
      await delay(300);
      const list = LocalStorageSync.get<EventCategory[]>("edu_trio_event_categories") || [...DEFAULT_EVENT_CATEGORIES];
      
      let updated: EventCategory[];
      let savedCategory: EventCategory;

      if (category.id) {
        // Edit existing category
        updated = list.map(c => c.id === category.id ? { ...c, ...category } as EventCategory : c);
        savedCategory = updated.find(c => c.id === category.id)!;
      } else {
        // Create new category
        savedCategory = {
          id: `CAT${Date.now().toString().slice(-4)}`,
          name: category.name || 'Custom Category',
          color: category.color || 'cyan',
          description: category.description || '',
          isDefault: false
        };
        updated = [...list, savedCategory];
      }

      LocalStorageSync.set("edu_trio_event_categories", updated);
      return savedCategory;
    }
    return await ApiService.post<EventCategory>('/communication/event-categories', category);
  },

  deleteEventCategory: async (categoryId: string): Promise<boolean> => {
    if (USE_MOCK) {
      await delay(300);
      const list = LocalStorageSync.get<EventCategory[]>("edu_trio_event_categories") || [...DEFAULT_EVENT_CATEGORIES];
      const updated = list.filter(c => c.id !== categoryId);
      LocalStorageSync.set("edu_trio_event_categories", updated);
      return true;
    }
    return await ApiService.delete(`/communication/event-categories/${categoryId}`);
  },
  getAnnouncements: async (): Promise<Announcement[]> => {
    if (USE_MOCK) {
      await delay(400);
      const data = LocalStorageSync.get<Announcement[]>("edu_trio_announcements");
      return data || [];
    }
    return await ApiService.get<Announcement[]>('/communication/announcements');
  },

  getMeetings: async (): Promise<Meeting[]> => {
    if (USE_MOCK) {
      await delay(400);
      const data = LocalStorageSync.get<Meeting[]>("edu_trio_meetings");
      return data || [];
    }
    return await ApiService.get<Meeting[]>('/communication/meetings');
  },

  getTemplates: async (): Promise<AnnouncementTemplate[]> => {
    if (USE_MOCK) {
      await delay(200);
      const stored = LocalStorageSync.get<AnnouncementTemplate[]>("edu_trio_templates");
      if (!stored || stored.length === 0) {
        LocalStorageSync.set("edu_trio_templates", COMMUNICATION_TEMPLATES);
        return [...COMMUNICATION_TEMPLATES];
      }
      return stored;
    }
    return await ApiService.get<AnnouncementTemplate[]>('/communication/templates');
  },

  createTemplate: async (template: Partial<AnnouncementTemplate>): Promise<AnnouncementTemplate> => {
    if (USE_MOCK) {
      await delay(400);
      const list = LocalStorageSync.get<AnnouncementTemplate[]>("edu_trio_templates") || [...COMMUNICATION_TEMPLATES];
      const newTpl: AnnouncementTemplate = {
        id: `TPL${Date.now().toString().slice(-4)}`,
        name: template.name || 'Untitled Template',
        title: template.title || '',
        body: template.body || '',
        defaultChannels: template.defaultChannels || ['Email', 'App Push']
      };
      const updated = [newTpl, ...list];
      LocalStorageSync.set("edu_trio_templates", updated);
      return newTpl;
    }
    return await ApiService.post<AnnouncementTemplate>('/communication/templates', template);
  },

  sendAnnouncement: async (announcement: Partial<Announcement>): Promise<Announcement> => {
    if (USE_MOCK) {
      await delay(600);
      const list = LocalStorageSync.get<Announcement[]>("edu_trio_announcements") || [];
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
      
      const updated = [newAnn, ...list]; // Show newest first
      LocalStorageSync.set("edu_trio_announcements", updated);
      return newAnn;
    }
    return await ApiService.post<Announcement>('/communication/announcements', announcement);
  },

  scheduleMeeting: async (meeting: Partial<Meeting>): Promise<Meeting> => {
    if (USE_MOCK) {
      await delay(600);
      const list = LocalStorageSync.get<Meeting[]>("edu_trio_meetings") || [];
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
      
      const updated = [...list, newMtg];
      LocalStorageSync.set("edu_trio_meetings", updated);
      return newMtg;
    }
    return await ApiService.post<Meeting>('/communication/meetings', meeting);
  }
};
