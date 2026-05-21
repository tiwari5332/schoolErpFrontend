import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Calendar, BookOpen, Star, Sparkles, FileText } from "lucide-react";
import { Student } from '../constant';
import { StudentDetailHeader } from './student-detail/StudentDetailHeader';
import { StudentPerformanceOverview } from './student-detail/StudentPerformanceOverview';
import { StudentAttendanceTab } from './student-detail/StudentAttendanceTab';
import { StudentAcademicsTab } from './student-detail/StudentAcademicsTab';
import { StudentBehaviorTab } from './student-detail/StudentBehaviorTab';
import { StudentActivitiesTab } from './student-detail/StudentActivitiesTab';
import { StudentDocumentsTab } from './student-detail/StudentDocumentsTab';

interface StudentDetailViewProps {
  student: Student;
  onClose: () => void;
}

export function StudentDetailView({ student, onClose }: StudentDetailViewProps) {
  return (
    <div className="space-y-6">
      <StudentDetailHeader student={student} onClose={onClose} />
      
      <StudentPerformanceOverview />

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="attendance" className="gap-2">
            <Calendar className="h-4 w-4" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="academics" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Test Results
          </TabsTrigger>
          <TabsTrigger value="behavior" className="gap-2">
            <Star className="h-4 w-4" />
            Behavior
          </TabsTrigger>
          <TabsTrigger value="activities" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Activities
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
          <StudentAttendanceTab />
        </TabsContent>

        <TabsContent value="academics" className="space-y-6">
          <StudentAcademicsTab />
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <StudentBehaviorTab studentId={student.id} />
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <StudentActivitiesTab />
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <StudentDocumentsTab studentId={student.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
