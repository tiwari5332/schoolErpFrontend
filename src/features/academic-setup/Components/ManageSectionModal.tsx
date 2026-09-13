import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCircle, Save, AlertCircle, Loader2 } from "lucide-react";
import { Section, SetupTeacher } from '../Constants';

interface ManageSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (section: Partial<Section>) => Promise<void> | void;
  sectionData?: Section | null;
  teachers: SetupTeacher[];
}

export function ManageSectionModal({ isOpen, onClose, onSave, sectionData, teachers = [] }: ManageSectionModalProps) {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState<number>(30);
  const [classTeacherId, setClassTeacherId] = useState<string>('unassigned');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && sectionData) {
      setName(sectionData.name);
      setCapacity(sectionData.capacity || 30);
      setClassTeacherId(sectionData.classTeacherId || 'unassigned');
    } else if (isOpen && !sectionData) {
      setName('');
      setCapacity(30);
      setClassTeacherId('unassigned');
    }
    setApiError(null);
    setIsSubmitting(false);
  }, [isOpen, sectionData]);

  const handleSave = async () => {
    if (!name) return;
    try {
      setIsSubmitting(true);
      setApiError(null);
      await onSave({
        id: sectionData?.id,
        name,
        capacity: Number(capacity) || 30,
        classTeacherId: classTeacherId === 'unassigned' ? null : classTeacherId,
        studentIds: sectionData?.studentIds || []
      });
      onClose();
    } catch (err: any) {
      console.error('[ManageSectionModal] Section save failed:', err);
      setApiError(err?.message || 'Failed to save section. Server error encountered.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] bg-white border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl shrink-0">
              <UserCircle className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                {sectionData ? 'Edit Section' : 'Add Section'}
              </DialogTitle>
              <DialogDescription>
                {sectionData ? 'Modify section name, capacity, or class teacher.' : 'Configure section cohort details.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-4 py-3">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="sectionName" className="text-sm font-medium text-slate-700">
                Section Name <span className="text-rose-500 font-bold">*</span>
              </Label>
              <Input 
                id="sectionName"
                placeholder="e.g. A or Section A" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-slate-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="capacity" className="text-sm font-medium text-slate-700">Capacity</Label>
              <Input 
                id="capacity"
                type="number"
                min={1}
                max={200}
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="border-slate-200"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-slate-700">Class Teacher</Label>
            <Select value={classTeacherId} onValueChange={setClassTeacherId}>
              <SelectTrigger className="border-slate-200 bg-white">
                <SelectValue placeholder="Select Class Teacher" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900 z-[100]">
                <SelectItem value="unassigned" className="text-slate-400 italic">-- Unassigned --</SelectItem>
                {(teachers || []).map(t => (
                  <SelectItem key={t.id} value={t.id}>{t.name} ({t.department || t.subjectSpecialty || 'Staff'})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting} className="border-slate-200 text-slate-600 hover:bg-slate-50">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!name || isSubmitting}
            className="gradient-cyan text-white shadow-colored-cyan hover:scale-[1.02] transition-transform flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {sectionData ? 'Save Changes' : 'Create Section'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ManageSectionModal;
