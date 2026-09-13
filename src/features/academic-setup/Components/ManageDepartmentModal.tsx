import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Save, Check, AlertCircle, Loader2 } from "lucide-react";
import { Department, SetupTeacher } from '../Constants';

interface ManageDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (department: Partial<Department>) => Promise<void> | void;
  departmentData?: Department | null;
  teachers: SetupTeacher[];
}

const PRESET_COLORS = [
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#06B6D4', // Cyan
  '#64748B', // Slate
];

export function ManageDepartmentModal({ isOpen, onClose, onSave, departmentData, teachers }: ManageDepartmentModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hodId, setHodId] = useState<string>('unassigned');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [color, setColor] = useState<string>('#6366F1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && departmentData) {
      setName(departmentData.name);
      setDescription(departmentData.description);
      setHodId(departmentData.hodTeacherId || departmentData.hodId || 'unassigned');
      setStatus(departmentData.status || 'Active');
      setColor(departmentData.color || '#6366F1');
    } else if (isOpen && !departmentData) {
      setName('');
      setDescription('');
      setHodId('unassigned');
      setStatus('Active');
      setColor('#6366F1');
    }
    setApiError(null);
    setIsSubmitting(false);
  }, [isOpen, departmentData]);

  const handleSave = async () => {
    if (!name) return;
    try {
      setIsSubmitting(true);
      setApiError(null);
      const selectedHod = hodId === 'unassigned' ? null : hodId;
      await onSave({
        id: departmentData?.id,
        name,
        description,
        hodTeacherId: selectedHod,
        hodId: selectedHod,
        status,
        color,
        teacherIds: departmentData?.teacherIds || []
      });
      onClose();
    } catch (err: any) {
      console.error('[ManageDepartmentModal] Department save failed:', err);
      setApiError(err?.message || 'Failed to save department. Server error encountered.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-white border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="p-3 text-white rounded-xl shadow-md shrink-0"
              style={{ backgroundColor: color }}
            >
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {departmentData ? 'Edit Department' : 'New Department'}
              </DialogTitle>
              <DialogDescription>
                {departmentData ? 'Update faculty department details and configuration.' : 'Create a new faculty department.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-4 py-3">
          <div className="grid gap-2">
            <Label htmlFor="dept-name" className="text-sm font-medium text-slate-700">Department Name *</Label>
            <Input 
              id="dept-name"
              placeholder="e.g. Science Faculty" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="dept-desc" className="text-sm font-medium text-slate-700">Description</Label>
            <Textarea 
              id="dept-desc"
              placeholder="Short description of the department..." 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 resize-none h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-slate-700">Head of Department (HOD)</Label>
              <Select value={hodId} onValueChange={setHodId}>
                <SelectTrigger className="border-slate-200 focus:border-indigo-400 bg-white">
                  <SelectValue placeholder="Select HOD" />
                </SelectTrigger>
                <SelectContent className="bg-white text-slate-900 z-[100]">
                  <SelectItem value="unassigned" className="text-slate-400 italic">Unassigned</SelectItem>
                  {(teachers || []).map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-sm font-medium text-slate-700">Status</Label>
              <Select value={status} onValueChange={(val: 'Active' | 'Inactive') => setStatus(val)}>
                <SelectTrigger className="border-slate-200 focus:border-indigo-400 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white text-slate-900 z-[100]">
                  <SelectItem value="Active" className="text-emerald-700 font-medium">Active</SelectItem>
                  <SelectItem value="Inactive" className="text-slate-500 font-medium">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium text-slate-700">Department Tag Color</Label>
            <div className="flex items-center gap-2">
              {PRESET_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="h-7 w-7 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
                  style={{ backgroundColor: c }}
                >
                  {color === c && <Check className="h-4 w-4 text-white drop-shadow" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting} className="border-slate-200 text-slate-600 hover:bg-slate-50">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!name || isSubmitting}
            className="gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-transform flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {departmentData ? 'Save Changes' : 'Create Department'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ManageDepartmentModal;
