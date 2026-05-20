import { useState, useEffect } from 'react';
import { Announcement, Meeting } from '../Constants';
import { CommunicationApi } from '../api/CommunicationApi';

export function useCommunication() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);

  useEffect(() => {
    const fetchCommunicationData = async () => {
      try {
        setIsLoading(true);
        const [fetchedAnnouncements, fetchedMeetings] = await Promise.all([
          CommunicationApi.getAnnouncements(),
          CommunicationApi.getMeetings()
        ]);
        setAnnouncements(fetchedAnnouncements);
        setMeetings(fetchedMeetings);
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
      // Add to top of list
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
      type: newMtg.type! as any,
      participants: newMtg.participants!,
      link: newMtg.link,
      location: newMtg.location,
      organizer: newMtg.organizer!
    };
    try {
      const savedMeeting = await CommunicationApi.scheduleMeeting(meeting);
      // In a real app, you'd sort these by date. For mock, just push to top.
      setMeetings([savedMeeting, ...meetings]);
      setIsMeetingOpen(false);
    } catch (error) {
      console.error("Failed to schedule meeting", error);
    }
  };

  return {
    announcements,
    meetings,
    isLoading,
    isBroadcastOpen,
    setIsBroadcastOpen,
    isMeetingOpen,
    setIsMeetingOpen,
    handleSendBroadcast,
    handleScheduleMeeting
  };
}
