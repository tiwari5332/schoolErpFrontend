import React from 'react';
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Star, CheckCircle, User, Calendar, Mail, Phone, Users } from "lucide-react";
import { Student } from '../../constant';

interface StudentDetailHeaderProps {
  student: Student;
  onClose: () => void;
}

export function StudentDetailHeader({ student, onClose }: StudentDetailHeaderProps) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
      <CardContent className="p-8 relative">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-indigo-100">
              <AvatarImage src={student.avatar} />
              <AvatarFallback className="gradient-indigo text-white text-2xl font-medium">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-2">
                {student.name}
              </h2>
              <div className="flex items-center gap-4 mb-3">
                <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 gap-1 px-3 py-1.5">
                  <Star className="h-3 w-3" />
                  {student.grade} - {student.class}
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-1 px-3 py-1.5">
                  <CheckCircle className="h-3 w-3" />
                  {student.status}
                </Badge>
              </div>
              <div className="text-sm text-slate-600 space-y-1">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <span>Student ID: {student.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>Admission: {new Date(student.admissionDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={onClose} className="self-start">
            Close
          </Button>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-200">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Mail className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
              <p className="font-medium text-slate-900">{student.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-200">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Phone className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Phone</p>
              <p className="font-medium text-slate-900">{student.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-200">
            <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Guardian</p>
              <p className="font-medium text-slate-900">{student.guardian}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
