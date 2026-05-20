import { useState, useEffect } from 'react';
import { 
  ScheduleSession, 
  TimeSlot,
  Teacher,
  Subject,
  ClassSection
} from '../Constants';
import { ScheduleApi } from '../api/ScheduleApi';

export function useScheduleManagement() {
  const [sessions, setSessions] = useState<ScheduleSession[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<ClassSection[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [viewMode, setViewMode] = useState<'class' | 'teacher'>('class');
  
  // By default select the first class or first teacher
  const [activeClassId, setActiveClassId] = useState<string>('');
  const [activeTeacherId, setActiveTeacherId] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState<{ day: string; slot: TimeSlot } | null>(null);

  const [hoveredSlot, setHoveredSlot] = useState<TimeSlot | null>(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setIsLoading(true);
        const [fetchedSessions, fetchedTeachers, fetchedSubjects, fetchedClasses, fetchedTimeSlots] = await Promise.all([
          ScheduleApi.getSessions(),
          ScheduleApi.getTeachers(),
          ScheduleApi.getSubjects(),
          ScheduleApi.getClasses(),
          ScheduleApi.getTimeSlots()
        ]);
        
        setSessions(fetchedSessions);
        setTeachers(fetchedTeachers);
        setSubjects(fetchedSubjects);
        setClasses(fetchedClasses);
        setTimeSlots(fetchedTimeSlots);
        
        if (fetchedClasses.length > 0) setActiveClassId(fetchedClasses[0].id);
        if (fetchedTeachers.length > 0) setActiveTeacherId(fetchedTeachers[0].id);
      } catch (error) {
        console.error("Failed to fetch schedule data", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchScheduleData();
  }, []);

  const activeFilterId = viewMode === 'class' ? activeClassId : activeTeacherId;

  const handleSlotClick = (day: string, slot: TimeSlot) => {
    // Only allow assigning if viewing a class right now, to keep flow simple
    if (viewMode === 'class') {
      setModalContext({ day, slot });
      setIsModalOpen(true);
    } else {
      alert("Please switch to 'Class View' to schedule a new period.");
    }
  };

  const handleSaveSession = async (newSessionData: Partial<ScheduleSession>) => {
    const newSession: ScheduleSession = {
      id: `SES${Math.floor(Math.random() * 10000)}`,
      dayOfWeek: newSessionData.dayOfWeek!,
      timeSlotId: newSessionData.timeSlotId!,
      classId: newSessionData.classId!,
      subjectId: newSessionData.subjectId!,
      teacherId: newSessionData.teacherId!,
      room: newSessionData.room!
    };
    
    // Simulate API saving
    try {
      const savedSession = await ScheduleApi.saveSession(newSession);
      setSessions([...sessions, savedSession]);
      setIsModalOpen(false);
      setModalContext(null);
    } catch (e) {
      console.error("Failed to save session", e);
    }
  };

  return {
    sessions,
    teachers,
    subjects,
    classes,
    timeSlots,
    isLoading,
    viewMode,
    setViewMode,
    activeClassId,
    setActiveClassId,
    activeTeacherId,
    setActiveTeacherId,
    isModalOpen,
    setIsModalOpen,
    modalContext,
    setModalContext,
    hoveredSlot,
    setHoveredSlot,
    activeFilterId,
    handleSlotClick,
    handleSaveSession
  };
}
