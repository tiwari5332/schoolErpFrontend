import httpClient from '../../../api/httpClient';
import ApiService, { delay } from '../../../services/ApiService';
import {
  Announcement,
  Meeting,
  AnnouncementTemplate,
  COMMUNICATION_TEMPLATES,
  EventCategory,
  DEFAULT_EVENT_CATEGORIES,
  MOCK_ANNOUNCEMENTS
} from '../Constants';
import { LocalStorageSync } from '../../../services/LocalStorageSync';
import { getStoredAuthToken, getStoredUserInfo } from '../../../utils/authStorage';

const USE_MOCK = false;

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
    try {
      return await ApiService.get<EventCategory[]>('/communication/event-categories');
    } catch {
      const stored = LocalStorageSync.get<EventCategory[]>("edu_trio_event_categories");
      return stored && stored.length > 0 ? stored : [...DEFAULT_EVENT_CATEGORIES];
    }
  },

  saveEventCategory: async (category: Partial<EventCategory>): Promise<EventCategory> => {
    try {
      return await ApiService.post<EventCategory>('/communication/event-categories', category);
    } catch {
      const list = LocalStorageSync.get<EventCategory[]>("edu_trio_event_categories") || [...DEFAULT_EVENT_CATEGORIES];
      let updated: EventCategory[];
      let savedCategory: EventCategory;

      if (category.id) {
        updated = list.map(c => c.id === category.id ? { ...c, ...category } as EventCategory : c);
        savedCategory = updated.find(c => c.id === category.id)!;
      } else {
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
  },

  deleteEventCategory: async (categoryId: string): Promise<boolean> => {
    try {
      return await ApiService.delete(`/communication/event-categories/${categoryId}`);
    } catch {
      const list = LocalStorageSync.get<EventCategory[]>("edu_trio_event_categories") || [...DEFAULT_EVENT_CATEGORIES];
      const updated = list.filter(c => c.id !== categoryId);
      LocalStorageSync.set("edu_trio_event_categories", updated);
      return true;
    }
  },

  /**
   * GET /api/broadcast/list
   * Fetches broadcast list from backend with Bearer Token in header and schoolId in query/payload
   */
  getAnnouncements: async (): Promise<Announcement[]> => {
    try {
      const token = getStoredAuthToken();
      const userInfo = getStoredUserInfo();
      const schoolId = userInfo?.schoolId || userInfo?.school_id || '';

      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      }
      if (schoolId) {
        headers['x-school-id'] = schoolId;
      }

      let response;
      try {
        response = await httpClient.get<any>('/api/broadcast/list', {
          params: { schoolId, school_id: schoolId },
          headers,
        });
      } catch {
        // Fallback endpoint if /api/broadcast/list returns 404
        response = await httpClient.get<any>('/api/broadcast', {
          params: { schoolId, school_id: schoolId },
          headers,
        });
      }

      const rawData = response.data;
      let list: any[] = [];
      if (Array.isArray(rawData)) {
        list = rawData;
      } else if (rawData && typeof rawData === 'object') {
        if (Array.isArray(rawData.data)) {
          list = rawData.data;
        } else if (Array.isArray(rawData.broadcasts)) {
          list = rawData.broadcasts;
        } else if (Array.isArray(rawData.items)) {
          list = rawData.items;
        }
      }

      if (list && list.length > 0) {
        const normalized = list.map((item: any, idx: number) => ({
          id: String(item.id || item.broadcast_id || `ANN${idx + 1}`),
          title: item.title || item.subject || 'Broadcast Notice',
          message: item.message || item.body || item.content || '',
          targetAudience: (item.targetAudience || item.target_audience || item.audience || 'All') as any,
          targetClass: item.targetClass || item.target_class || 'All',
          channels: Array.isArray(item.channels)
            ? item.channels
            : (typeof item.channels === 'string' && item.channels ? item.channels.split(',').map((c: string) => c.trim()) : ['Email']),
          sentAt: item.sentAt || item.sent_at || item.created_at || new Date().toISOString(),
          sentBy: item.sentBy || item.sent_by || item.created_by || 'Admin',
        }));

        // Save fresh fetched broadcasts to storage
        LocalStorageSync.set("edu_trio_announcements", normalized);
        return normalized;
      }
    } catch (error) {
      console.warn('[CommunicationApi.getAnnouncements] GET /api/broadcast/list API call failed, using fallback storage', error);
    }

    const stored = LocalStorageSync.get<Announcement[]>("edu_trio_announcements");
    return stored && stored.length > 0 ? stored : MOCK_ANNOUNCEMENTS;
  },

  getMeetings: async (): Promise<Meeting[]> => {
    try {
      return await ApiService.get<Meeting[]>('/communication/meetings');
    } catch {
      const data = LocalStorageSync.get<Meeting[]>("edu_trio_meetings");
      return data && data.length > 0 ? data : [];
    }
  },

  getTemplates: async (): Promise<AnnouncementTemplate[]> => {
    try {
      return await ApiService.get<AnnouncementTemplate[]>('/communication/templates');
    } catch {
      const stored = LocalStorageSync.get<AnnouncementTemplate[]>("edu_trio_templates");
      return stored && stored.length > 0 ? stored : [...COMMUNICATION_TEMPLATES];
    }
  },

  createTemplate: async (template: Partial<AnnouncementTemplate>): Promise<AnnouncementTemplate> => {
    try {
      return await ApiService.post<AnnouncementTemplate>('/communication/templates', template);
    } catch {
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
  },

  /**
   * POST /api/broadcast/list or /api/broadcast
   * Dispatches new broadcast to backend API with Bearer Token & schoolId payload
   */
  sendAnnouncement: async (announcement: Partial<Announcement>): Promise<Announcement> => {
    try {
      const token = getStoredAuthToken();
      const userInfo = getStoredUserInfo();
      const schoolId = userInfo?.schoolId || userInfo?.school_id || '';

      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      }
      if (schoolId) {
        headers['x-school-id'] = schoolId;
      }

      const payload = {
        schoolId,
        school_id: schoolId,
        title: announcement.title || '',
        subject: announcement.title || '',
        message: announcement.message || '',
        body: announcement.message || '',
        targetAudience: announcement.targetAudience || 'All',
        target_audience: announcement.targetAudience || 'All',
        targetClass: announcement.targetClass,
        target_class: announcement.targetClass,
        channels: announcement.channels || ['Email'],
        sentBy: announcement.sentBy || 'Admin',
      };

      let response;
      try {
        response = await httpClient.post<any>('/api/broadcast/list', payload, { headers });
      } catch {
        response = await httpClient.post<any>('/api/broadcast', payload, { headers });
      }

      const resData = response.data?.data || response.data;
      if (resData) {
        const newAnn: Announcement = {
          id: String(resData.id || resData.broadcast_id || `ANN${Date.now()}`),
          title: resData.title || resData.subject || announcement.title || '',
          message: resData.message || resData.body || announcement.message || '',
          targetAudience: (resData.targetAudience || resData.target_audience || announcement.targetAudience || 'All') as any,
          targetClass: resData.targetClass || resData.target_class || announcement.targetClass,
          channels: Array.isArray(resData.channels) ? resData.channels : (announcement.channels || ['Email']),
          sentAt: resData.sentAt || resData.sent_at || resData.created_at || new Date().toISOString(),
          sentBy: resData.sentBy || resData.sent_by || announcement.sentBy || 'Admin',
        };

        const list = LocalStorageSync.get<Announcement[]>("edu_trio_announcements") || [];
        LocalStorageSync.set("edu_trio_announcements", [newAnn, ...list]);
        return newAnn;
      }
    } catch (error) {
      console.warn('[CommunicationApi.sendAnnouncement] POST /api/broadcast API call failed, using local storage fallback', error);
    }

    const list = LocalStorageSync.get<Announcement[]>("edu_trio_announcements") || MOCK_ANNOUNCEMENTS;
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

    const updated = [newAnn, ...list];
    LocalStorageSync.set("edu_trio_announcements", updated);
    return newAnn;
  },

  scheduleMeeting: async (meeting: Partial<Meeting>): Promise<Meeting> => {
    try {
      return await ApiService.post<Meeting>('/communication/meetings', meeting);
    } catch {
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
  }
};

