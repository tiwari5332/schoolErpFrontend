import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutTemplate, Save, AlertCircle, Loader2 } from "lucide-react";
import { ClassGroup, Department } from '../Constants';

interface ManageGradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (gradeData: Partial<ClassGroup>) => Promise<void> | void;
  gradeData?: ClassGroup | null;
  departments?: Department[];
}

export function ManageGradeModal({ isOpen, onClose, onSave, gradeData, departments = [] }: ManageGradeModalProps) {
  const [gradeName, setGradeName] = useState('');
  const [departmentId, setDepartmentId] = useState<string>('');
  const [sequenceOrder, setSequenceOrder] = useState<number>(1);
  const [stream, setStream] = useState<'Science' | 'Commerce' | 'Arts' | 'General'>('General');

  const [isDeptTouched, setIsDeptTouched] = useState(false);
  const [isSeqTouched, setIsSeqTouched] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && gradeData) {
      const extractedName = gradeData.grade || (gradeData as any).name || (gradeData as any).gradeName || (gradeData as any).className || '';
      const extractedDept = gradeData.departmentId || (gradeData as any).deptId || (gradeData as any).department?.id || '';
      const rawSeq = gradeData.sequenceOrder ?? (gradeData as any).sequence ?? (gradeData as any).order ?? 1;
      const extractedSeq = Math.max(1, Number(rawSeq) || 1);
      const extractedStream = gradeData.stream || (gradeData as any).academicStream || 'General';

      setGradeName(extractedName);
      setDepartmentId(extractedDept);
      setSequenceOrder(extractedSeq);
      setStream(extractedStream);
    } else if (isOpen && !gradeData) {
      setGradeName('');
      setDepartmentId(''); // Blank initially for new grade creation
      setSequenceOrder(1);
      setStream('General');
    }
    // Reset touched and submission error states when modal opens/resets
    setIsDeptTouched(false);
    setIsSeqTouched(false);
    setHasAttemptedSubmit(false);
    setApiError(null);
    setIsSubmitting(false);
  }, [isOpen, gradeData]);

  const isDeptValid = Boolean(departmentId && departmentId !== 'unassigned');
  const isSeqValid = Number(sequenceOrder) >= 1;
  const isFormValid = gradeName.trim().length > 0 && isDeptValid && isSeqValid;

  const showDeptError = (isDeptTouched || hasAttemptedSubmit) && !isDeptValid;
  const showSeqError = (isSeqTouched || hasAttemptedSubmit) && !isSeqValid;

  const handleSave = async () => {
    setHasAttemptedSubmit(true);
    if (!isFormValid) return;
    try {
      setIsSubmitting(true);
      setApiError(null);
      await onSave({
        id: gradeData?.id,
        grade: gradeName.trim(),
        departmentId,
        sequenceOrder: Math.max(1, Number(sequenceOrder) || 1),
        stream,
        sections: gradeData?.sections || []
      });
      onClose();
    } catch (err: any) {
      console.error('[ManageGradeModal] Grade save failed:', err);
      setApiError(err?.message || 'Failed to save grade. Server error encountered.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-white border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl shrink-0">
              <LayoutTemplate className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {gradeData ? 'Edit Grade/Class' : 'New Grade/Class'}
              </DialogTitle>
              <DialogDescription>
                {gradeData ? 'Update grade details and department assignment.' : 'Configure a new top-level grade hierarchy.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-4 py-3">
          <div className="grid gap-2">
            <Label htmlFor="gradeName" className="text-sm font-medium text-slate-700">
              Grade Name <span className="text-rose-500 font-bold">*</span>
            </Label>
            <Input 
              id="gradeName"
              placeholder="e.g. Grade 10" 
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              className="border-slate-200 focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-slate-700">
                Department Faculty <span className="text-rose-500 font-bold">*</span>
              </Label>
              <Select 
                value={departmentId} 
                onValueChange={(val) => {
                  setDepartmentId(val);
                  setIsDeptTouched(true);
                }}
              >
                <SelectTrigger className={`border-slate-200 bg-white ${showDeptError ? 'border-rose-400 ring-1 ring-rose-400' : ''}`}>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent className="bg-white text-slate-900 z-[100]">
                  {(departments || []).map(d => (
                    <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {showDeptError && (
                <span className="text-[10px] text-rose-500 font-medium">Department is required</span>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="seqOrder" className="text-sm font-medium text-slate-700">
                Sequence Order <span className="text-rose-500 font-bold">*</span>
              </Label>
              <Input
                id="seqOrder"
                type="number"
                min={1}
                value={sequenceOrder}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setSequenceOrder(isNaN(val) ? 0 : val);
                  setIsSeqTouched(true);
                }}
                className={`border-slate-200 ${showSeqError ? 'border-rose-400 focus:ring-rose-400 ring-1 ring-rose-400' : ''}`}
              />
              {showSeqError && (
                <span className="text-[10px] text-rose-500 font-medium">Sequence cannot be 0 or negative</span>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium text-slate-700">Academic Stream</Label>
            <Select value={stream} onValueChange={(val: any) => setStream(val)}>
              <SelectTrigger className="border-slate-200 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900 z-[100]">
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Commerce">Commerce</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
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
            disabled={!isFormValid || isSubmitting}
            className="gradient-cyan text-white shadow-colored-cyan hover:scale-[1.02] transition-transform flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {gradeData ? 'Save Changes' : 'Create Grade'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ManageGradeModal;
