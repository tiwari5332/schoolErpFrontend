import React from 'react';
import { Button } from "../../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Printer } from 'lucide-react';
import { Student } from '../constant';
import { EduTrioLogoSimple } from "@/components/EduTrioLogo";

interface StudentReportCardModalProps {
  student?: Student;
  grades?: { math: number, science: number, english: number, total: number, gradeLetter: string };
  isOpen: boolean;
  onClose: () => void;
}

export function StudentReportCardModal({ student, grades, isOpen, onClose }: StudentReportCardModalProps) {
  if (!student || !grades) return null;

  const handlePrint = () => {
    window.print();
  };

  const issueDate = new Date().toLocaleDateString();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b print:hidden">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold text-slate-800">Student Report Card</DialogTitle>
            <div className="flex gap-2 mr-[18px]">
              <Button variant="outline" className="gap-2" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
                Print / Save PDF
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Printable Area */}
        <div id="report-card-printable-area" className="p-10 bg-white h-[75vh] overflow-y-auto">
          {/* School Header */}
          <div className="flex justify-between items-center border-b-2 border-slate-200 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <EduTrioLogoSimple size="lg" className="drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">EduTrio International School</h1>
                <p className="text-sm text-slate-500">123 Education Boulevard, Knowledge City, 10001</p>
                <p className="text-sm text-slate-500">Phone: +1 234-567-8900 | Email: academic@edutrio.edu</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-black text-slate-200 uppercase tracking-widest">Report Card</h2>
              <div className="mt-2">
                <p className="text-sm font-medium text-slate-900">Academic Year: <span className="font-normal text-slate-600">2023-2024</span></p>
                <p className="text-sm font-medium text-slate-900">Issue Date: <span className="font-normal text-slate-600">{issueDate}</span></p>
              </div>
            </div>
          </div>

          {/* Student Details */}
          <div className="grid grid-cols-2 gap-8 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Student Profile</p>
              <h3 className="text-lg font-bold text-slate-900">{student.name}</h3>
              <p className="text-sm text-slate-600">Student ID: {student.id}</p>
              <p className="text-sm text-slate-600">Class: {student.class}</p>
              <p className="text-sm text-slate-600">Grade: {student.grade}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Final Performance</p>
              <h3 className="text-3xl font-black text-blue-600">
                {grades.gradeLetter}
              </h3>
              <p className="text-sm font-bold text-slate-700">Average: {grades.total}%</p>
            </div>
          </div>

          {/* Academic Breakdown */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-slate-800 mb-3 border-b pb-2">Academic Performance</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-medium rounded-tl-lg">Subject</th>
                  <th className="p-3 font-medium text-center">Max Marks</th>
                  <th className="p-3 font-medium text-center">Marks Obtained</th>
                  <th className="p-3 font-medium text-center rounded-tr-lg">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3 text-slate-700 font-medium">Mathematics</td>
                  <td className="p-3 text-center text-slate-500">100</td>
                  <td className="p-3 text-center font-medium text-slate-900">{grades.math}</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 font-semibold text-slate-700">
                      {grades.math >= 90 ? 'A' : grades.math >= 80 ? 'B' : grades.math >= 70 ? 'C' : 'D'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-700 font-medium">Science</td>
                  <td className="p-3 text-center text-slate-500">100</td>
                  <td className="p-3 text-center font-medium text-slate-900">{grades.science}</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 font-semibold text-slate-700">
                      {grades.science >= 90 ? 'A' : grades.science >= 80 ? 'B' : grades.science >= 70 ? 'C' : 'D'}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-slate-700 font-medium">English</td>
                  <td className="p-3 text-center text-slate-500">100</td>
                  <td className="p-3 text-center font-medium text-slate-900">{grades.english}</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 font-semibold text-slate-700">
                      {grades.english >= 90 ? 'A' : grades.english >= 80 ? 'B' : grades.english >= 70 ? 'C' : 'D'}
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-blue-50 border-t-2 border-blue-200">
                  <td className="p-3 font-bold text-slate-900">Total</td>
                  <td className="p-3 text-center font-bold text-slate-500">300</td>
                  <td className="p-3 text-center font-bold text-blue-700">{grades.math + grades.science + grades.english}</td>
                  <td className="p-3 text-center font-bold text-blue-700">{grades.total}%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Teacher Remarks */}
          <div className="mb-8 p-4 border border-slate-200 rounded-lg bg-slate-50">
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Class Teacher's Remarks</h4>
            <p className="text-sm text-slate-600 italic">
              {grades.gradeLetter === 'A' ? `${student.name} is an outstanding student with excellent academic capabilities. Keep up the brilliant work!` :
               grades.gradeLetter === 'B' ? `${student.name} is performing well and shows good potential. Needs slightly more focus to reach top grades.` :
               grades.gradeLetter === 'C' ? `${student.name} is doing okay but needs to put more effort into daily assignments.` :
               `${student.name} needs significant improvement. Parent-teacher meeting is highly recommended.`}
            </p>
          </div>

          {/* Footer Signatures */}
          <div className="mt-16 flex justify-between items-end border-t border-slate-200 pt-8">
            <div className="text-center w-48">
              <div className="border-b border-slate-400 h-8 mb-2"></div>
              <p className="text-xs text-slate-500">Class Teacher</p>
            </div>
            <div className="text-center w-48">
              <div className="border-b border-slate-400 h-8 mb-2 relative">
                <span className="absolute bottom-1 right-0 left-0 text-slate-300 italic text-xl select-none">Approved</span>
              </div>
              <p className="text-xs text-slate-500">Principal</p>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-slate-400">
            This is a computer generated academic record.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
