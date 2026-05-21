import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, CheckCircle, GraduationCap, User, Calendar, Award, Mail, Phone, MapPin } from "lucide-react";
import { Teacher } from '../../Constants';

interface TeacherDetailHeaderProps {
  teacher: Teacher;
  onClose: () => void;
}

export function TeacherDetailHeader({ teacher, onClose }: TeacherDetailHeaderProps) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-xl hover-lift glass-card">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-cyan-50/50"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
      <CardContent className="p-8 relative">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 ring-4 ring-emerald-100">
              <AvatarImage src={teacher.avatar} />
              <AvatarFallback className="gradient-emerald text-white text-2xl font-medium">
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-cyan-700 bg-clip-text text-transparent mb-2">
                {teacher.name}
              </h2>
              <div className="flex items-center gap-4 mb-3">
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 gap-1 px-3 py-1.5">
                  <BookOpen className="h-3 w-3" />
                  {teacher.department}
                </Badge>
                <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200 gap-1 px-3 py-1.5">
                  <CheckCircle className="h-3 w-3" />
                  {teacher.status}
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 gap-1 px-3 py-1.5">
                  <GraduationCap className="h-3 w-3" />
                  {teacher.experience}
                </Badge>
              </div>
              <div className="text-sm text-slate-600 space-y-1">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <span>Teacher ID: {teacher.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span>Joined: {new Date(teacher.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-slate-400" />
                  <span>{teacher.qualification}</span>
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
            <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Mail className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
              <p className="font-medium text-slate-900">{teacher.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-200">
            <div className="h-10 w-10 rounded-xl bg-cyan-100 flex items-center justify-center">
              <Phone className="h-5 w-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Phone</p>
              <p className="font-medium text-slate-900">{teacher.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-200">
            <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Address</p>
              <p className="font-medium text-slate-900 text-sm">{teacher.address}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
