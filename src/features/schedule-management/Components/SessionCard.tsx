import React from 'react';
import { ScheduleSession, Subject, Teacher } from '../Constants';
import { User, MapPin } from 'lucide-react';

interface SessionCardProps {
  session: ScheduleSession;
  subject: Subject;
  teacher: Teacher;
  onClick?: () => void;
  viewMode?: 'class' | 'teacher';
}

export function SessionCard({ session, subject, teacher, onClick, viewMode = 'class' }: SessionCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`h-full w-full p-2 rounded-lg border flex flex-col justify-between transition-all cursor-pointer hover:shadow-md hover:scale-[1.02] ${subject.colorCode}`}
    >
      <div className="font-semibold text-sm truncate" title={subject.name}>
        {subject.name}
      </div>
      
      <div className="flex flex-col gap-1 mt-1 text-xs opacity-80">
        {viewMode === 'class' ? (
          <div className="flex items-center gap-1 truncate" title={teacher.name}>
            <User className="h-3 w-3 shrink-0" />
            <span className="truncate">{teacher.name}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 font-medium">
            <span className="truncate">Class: {session.classId.startsWith('SEC') ? session.classId.replace('SEC', 'Grade ') : session.classId.replace('CLS', 'Grade ')}</span>
          </div>
        )}
        <div className="flex items-center gap-1 truncate" title={session.room}>
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{session.room}</span>
        </div>
      </div>
    </div>
  );
}
