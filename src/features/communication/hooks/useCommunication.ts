import { useState, useEffect } from 'react';
import { Announcement, Meeting, AnnouncementTemplate, EventCategory } from '../Constants';
import { CommunicationApi } from '../api/CommunicationApi';

export function useCommunication() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [templates, setTemplates] = useState<AnnouncementTemplate[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [isManageCategoriesOpen, setIsManageCategoriesOpen] = useState(false);

  useEffect(() => {
    const fetchCommunicationData = async () => {
      try {
        setIsLoading(true);
        const [fetchedAnnouncements, fetchedMeetings, fetchedTemplates, fetchedCategories] = await Promise.all([
          CommunicationApi.getAnnouncements(),
          CommunicationApi.getMeetings(),
          CommunicationApi.getTemplates(),
          CommunicationApi.getEventCategories()
        ]);
        setAnnouncements(fetchedAnnouncements);
        setMeetings(fetchedMeetings);
        setTemplates(fetchedTemplates);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch communication data", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCommunicationData();
  }, []);

  const handleSendBroadcast = async (newAnn: Partial<Announcement>) => {
    const announcement: Announcement = {
      id: `ANN${Math.floor(Math.random() * 1000)}`,
      title: newAnn.title!,
      message: newAnn.message!,
      targetAudience: newAnn.targetAudience!,
      targetClass: newAnn.targetClass,
      channels: newAnn.channels!,
      sentAt: newAnn.sentAt!,
      sentBy: newAnn.sentBy!
    };
    try {
      const savedAnnouncement = await CommunicationApi.sendAnnouncement(announcement);
      setAnnouncements([savedAnnouncement, ...announcements]);
      setIsBroadcastOpen(false);
    } catch (error) {
      console.error("Failed to send broadcast", error);
    }
  };

  const handleScheduleMeeting = async (newMtg: Partial<Meeting>) => {
    const meeting: Meeting = {
      id: `MTG${Math.floor(Math.random() * 1000)}`,
      title: newMtg.title!,
      date: newMtg.date!,
      startTime: newMtg.startTime!,
      endTime: newMtg.endTime!,
      type: newMtg.type!,
      participants: newMtg.participants!,
      link: newMtg.link,
      location: newMtg.location,
      organizer: newMtg.organizer!
    };
    try {
      const savedMeeting = await CommunicationApi.scheduleMeeting(meeting);
      setMeetings([savedMeeting, ...meetings]);
      setIsMeetingOpen(false);
    } catch (error) {
      console.error("Failed to schedule meeting", error);
    }
  };

  const handleCreateTemplate = async (newTpl: Partial<AnnouncementTemplate>) => {
    try {
      const savedTemplate = await CommunicationApi.createTemplate(newTpl);
      setTemplates([savedTemplate, ...templates]);
      setIsCreateTemplateOpen(false);
    } catch (error) {
      console.error("Failed to create template", error);
    }
  };

  const handleSaveCategory = async (cat: Partial<EventCategory>) => {
    try {
      const savedCategory = await CommunicationApi.saveEventCategory(cat);
      const exists = categories.some(c => c.id === savedCategory.id);
      if (exists) {
        setCategories(categories.map(c => c.id === savedCategory.id ? savedCategory : c));
      } else {
        setCategories([...categories, savedCategory]);
      }
    } catch (error) {
      console.error("Failed to save event category", error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await CommunicationApi.deleteEventCategory(categoryId);
      setCategories(categories.filter(c => c.id !== categoryId));
    } catch (error) {
      console.error("Failed to delete event category", error);
    }
  };

  return {
    announcements,
    meetings,
    templates,
    categories,
    isLoading,
    isBroadcastOpen,
    setIsBroadcastOpen,
    isMeetingOpen,
    setIsMeetingOpen,
    isCreateTemplateOpen,
    setIsCreateTemplateOpen,
    isManageCategoriesOpen,
    setIsManageCategoriesOpen,
    handleSendBroadcast,
    handleScheduleMeeting,
    handleCreateTemplate,
    handleSaveCategory,
    handleDeleteCategory
  };
}
