import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, FileImage, Download, Upload, Trash2, CheckCircle2, Clock, XCircle } from "lucide-react";
import { MOCK_STUDENT_DOCUMENTS, StudentDocument } from '../../constant';

interface StudentDocumentsTabProps {
  studentId: string;
}

export function StudentDocumentsTab({ studentId }: StudentDocumentsTabProps) {
  // In a real app, we'd fetch documents for the specific student ID
  // For now, we'll just use the mock data
  const documents = MOCK_STUDENT_DOCUMENTS;

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-8 w-8 text-rose-500" />;
    if (type.includes('image')) return <FileImage className="h-8 w-8 text-cyan-500" />;
    return <FileText className="h-8 w-8 text-slate-500" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Verified': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'Pending': return <Clock className="h-4 w-4 text-amber-500" />;
      case 'Rejected': return <XCircle className="h-4 w-4 text-rose-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified': 
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Verified</Badge>;
      case 'Pending': 
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending Review</Badge>;
      case 'Rejected': 
        return <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">Rejected</Badge>;
      default: 
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Document Vault</h3>
          <p className="text-sm text-slate-500">Manage securely stored documents and KYC files</p>
        </div>
        <Button className="gap-2 gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-all">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc: StudentDocument) => (
          <Card key={doc.id} className="border-slate-200 shadow-sm hover-lift group">
            <CardContent className="p-5 flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-white group-hover:border-indigo-100 transition-colors">
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full shadow-sm border border-slate-100">
                    {getStatusIcon(doc.status)}
                    <span className="text-xs font-medium text-slate-600">{doc.status}</span>
                  </div>
                </div>
                
                <h4 className="font-semibold text-slate-800 line-clamp-1 mb-1" title={doc.name}>
                  {doc.name}
                </h4>
                <div className="flex items-center text-xs text-slate-500 gap-2 mb-4">
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-4 border-t border-slate-100 mt-auto">
                <Button variant="outline" size="sm" className="flex-1 text-xs border-slate-200 hover:bg-slate-50 hover:text-indigo-600">
                  <Download className="h-3 w-3 mr-1.5" />
                  Download
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Document Card */}
        <Card className="border-2 border-dashed border-slate-200 shadow-none hover:border-indigo-300 hover:bg-indigo-50/50 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px]">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-2">
              <Upload className="h-6 w-6" />
            </div>
            <h4 className="font-semibold text-slate-800">Drag & Drop</h4>
            <p className="text-sm text-slate-500 max-w-[200px]">
              Upload PDF, JPG, or PNG files up to 10MB
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
