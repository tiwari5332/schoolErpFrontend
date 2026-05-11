import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCircle, Save } from "lucide-react";
import { Section, SetupTeacher } from '../Constants';

interface ManageSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (section: Partial<Section>) => void;
  sectionData?: Section | null; // null if creating a new section
  teachers: SetupTeacher[];
}

export function ManageSectionModal({ isOpen, onClose, onSave, sectionData, teachers }: ManageSectionModalProps) {
  const [name, setName] = useState('');
  const [classTeacherId, setClassTeacherId] = useState<string>('unassigned');

  useEffect(() => {
    if (isOpen && sectionData) {
      setName(sectionData.name);
      setClassTeacherId(sectionData.classTeacherId || 'unassigned');
    } else if (isOpen && !sectionData) {
      setName('');
      setClassTeacherId('unassigned');
    }
  }, [isOpen, sectionData]);

  const handleSave = () => {
    if (!name) return;
    
    onSave({
      id: sectionData?.id,
      name,
      classTeacherId: classTeacherId === 'unassigned' ? null : classTeacherId,
      studentIds: sectionData?.studentIds || []
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass-card border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-fuchsia-100 text-fuchsia-600 rounded-xl">
              <UserCircle className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-fuchsia-600 to-rose-600 bg-clip-text text-transparent">
                {sectionData ? 'Edit Section' : 'Add Section'}
              </DialogTitle>
              <DialogDescription>
                {sectionData ? 'Modify section name or change the class teacher.' : 'Create a new section cohort.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="sectionName" className="text-sm font-medium text-slate-700">Section Name *</Label>
            <Input 
              id="sectionName"
              placeholder="e.g. Section A" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-slate-200 focus:border-fuchsia-400 focus:ring-fuchsia-100"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-sm font-medium text-slate-700">Class Teacher</Label>
            <Select value={classTeacherId} onValueChange={setClassTeacherId}>
              <SelectTrigger className="border-slate-200 focus:border-fuchsia-400">
                <SelectValue placeholder="Select Teacher" />
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
            className="gradient-fuchsia text-white shadow-colored-fuchsia hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {sectionData ? 'Save Changes' : 'Create Section'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
