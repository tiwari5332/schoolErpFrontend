import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Save } from "lucide-react";
import { Department, SetupTeacher } from '../Constants';

interface ManageDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (department: Partial<Department>) => void;
  departmentData?: Department | null;
  teachers: SetupTeacher[];
}

export function ManageDepartmentModal({ isOpen, onClose, onSave, departmentData, teachers }: ManageDepartmentModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hodId, setHodId] = useState<string>('unassigned');

  useEffect(() => {
    if (isOpen && departmentData) {
      setName(departmentData.name);
      setDescription(departmentData.description);
      setHodId(departmentData.hodId || 'unassigned');
    } else if (isOpen && !departmentData) {
      setName('');
      setDescription('');
      setHodId('unassigned');
    }
  }, [isOpen, departmentData]);

  const handleSave = () => {
    if (!name) return;
    
    onSave({
      id: departmentData?.id, // undefined means new
      name,
      description,
      hodId: hodId === 'unassigned' ? null : hodId,
      teacherIds: departmentData?.teacherIds || [] // preserve existing or start empty
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass-card border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {departmentData ? 'Edit Department' : 'New Department'}
              </DialogTitle>
              <DialogDescription>
                {departmentData ? 'Update faculty department details.' : 'Create a new faculty department.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">Department Name *</Label>
            <Input 
              id="name"
              placeholder="e.g. Science Faculty" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc" className="text-sm font-medium text-slate-700">Description</Label>
            <Textarea 
              id="desc"
              placeholder="Short description of the department..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 resize-none h-20"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm font-medium text-slate-700">Head of Department (HOD)</Label>
            <Select value={hodId} onValueChange={setHodId}>
              <SelectTrigger className="border-slate-200 focus:border-indigo-400">
                <SelectValue placeholder="Select HOD" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned" className="text-slate-400 italic">Unassigned</SelectItem>
                {teachers.map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.name} ({t.subjectSpecialty})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-600 hover:bg-slate-50">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!name}
            className="gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {departmentData ? 'Save Changes' : 'Create Department'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
