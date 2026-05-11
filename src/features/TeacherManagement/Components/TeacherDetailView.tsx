import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Award, Sparkles, School, BarChart3 } from "lucide-react";

import { TeacherDetailHeader } from './teacher-detail/TeacherDetailHeader';
import { TeacherPerformanceOverview } from './teacher-detail/TeacherPerformanceOverview';
import { TeacherClassesTab } from './teacher-detail/TeacherClassesTab';
import { TeacherPerformanceTab } from './teacher-detail/TeacherPerformanceTab';
import { TeacherScheduleTab } from './teacher-detail/TeacherScheduleTab';
import { TeacherAchievementsTab } from './teacher-detail/TeacherAchievementsTab';
import { TeacherActivitiesTab } from './teacher-detail/TeacherActivitiesTab';
import { Teacher } from '../Constants';

interface TeacherDetailViewProps {
  teacher: Teacher;
  onClose: () => void;
}

export function TeacherDetailView({ teacher, onClose }: TeacherDetailViewProps) {
  return (
    <div className="space-y-6">
      <TeacherDetailHeader teacher={teacher} onClose={onClose} />
      
      <TeacherPerformanceOverview teacher={teacher} />

      <Tabs defaultValue="classes" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="classes" className="gap-2">
            <School className="h-4 w-4" />
            Classes
          </TabsTrigger>
          <TabsTrigger value="performance" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="activities" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Activities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-6">
          <TeacherClassesTab teacher={teacher} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <TeacherPerformanceTab />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <TeacherScheduleTab />
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <TeacherAchievementsTab />
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <TeacherActivitiesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TeacherDetailView;