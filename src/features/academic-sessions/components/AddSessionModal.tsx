import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, AlertCircle, Loader2, Copy } from 'lucide-react';
import { AcademicSession } from '../../../types/session';
import { useCreateSession } from '../hooks/useSessions';
import { suggestSessionName, findOverlappingSession } from '../utils/sessionValidation';

interface AddSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingSessions: AcademicSession[];
}

export function AddSessionModal({ isOpen, onClose, existingSessions }: AddSessionModalProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [name, setName] = useState('');
  const [isNameManuallyEdited, setIsNameManuallyEdited] = useState(false);

  const [shouldCopy, setShouldCopy] = useState(false);
  const [copyFromSessionId, setCopyFromSessionId] = useState<string>('');

  // Inline validation errors
  const [errors, setErrors] = useState<{
    startDate?: string;
    endDate?: string;
    name?: string;
    copyFrom?: string;
    general?: string;
  }>({});

  const createSessionMutation = useCreateSession();

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      // Default to next year's standard academic year (April 1 to March 31)
      const currentYear = new Date().getFullYear();
      const defaultStart = `${currentYear + 1}-04-01`;
      const defaultEnd = `${currentYear + 2}-03-31`;

      setStartDate(defaultStart);
      setEndDate(defaultEnd);
      setName(suggestSessionName(defaultStart, defaultEnd));
      setIsNameManuallyEdited(false);
      setShouldCopy(false);

      const defaultCopySession = existingSessions.find(s => s.isCurrent || s.status === 'current') || existingSessions[0];
      setCopyFromSessionId(defaultCopySession?.id || '');
      setErrors({});
    }
  }, [isOpen, existingSessions]);

  // Auto-suggest name on date change if user hasn't explicitly customized it
  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    setErrors(prev => ({ ...prev, startDate: undefined, endDate: undefined, general: undefined }));
    if (!isNameManuallyEdited && val && endDate) {
      setName(suggestSessionName(val, endDate));
    }
  };

  const handleEndDateChange = (val: string) => {
    setEndDate(val);
    setErrors(prev => ({ ...prev, endDate: undefined, general: undefined }));
    if (!isNameManuallyEdited && startDate && val) {
      setName(suggestSessionName(startDate, val));
    }
  };

  const handleNameChange = (val: string) => {
    setName(val);
    setIsNameManuallyEdited(true);
    setErrors(prev => ({ ...prev, name: undefined, general: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!startDate) {
      newErrors.startDate = 'Start date is required.';
    }

    if (!endDate) {
      newErrors.endDate = 'End date is required.';
    } else if (startDate && new Date(endDate).getTime() <= new Date(startDate).getTime()) {
      newErrors.endDate = 'End date must be after start date.';
    }

    // Check overlap with existing sessions
    if (startDate && endDate && !newErrors.endDate) {
      const overlap = findOverlappingSession(startDate, endDate, existingSessions);
      if (overlap) {
        newErrors.endDate = `Dates overlap with existing session: ${overlap.name} (${overlap.startDate} to ${overlap.endDate}).`;
      }
    }

    // Unique name check
    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = 'Session name is required.';
    } else {
      const isDuplicate = existingSessions.some(
        s => s.name.trim().toLowerCase() === trimmedName.toLowerCase()
      );
      if (isDuplicate) {
        newErrors.name = 'A session with this name already exists.';
      }
    }

    if (shouldCopy && !copyFromSessionId) {
      newErrors.copyFrom = 'Please choose a session to copy from.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await createSessionMutation.mutateAsync({
        startDate,
        endDate,
        name: name.trim(),
        copyFromSessionId: shouldCopy && copyFromSessionId ? copyFromSessionId : undefined,
      });

      onClose();
    } catch (err: any) {
      const status = err?.status || err?.originalError?.response?.status;
      const message = err?.message || err?.responseData?.message || '';

      // Map server 409 Conflict errors to the relevant inline field
      if (status === 409 || message.toLowerCase().includes('conflict') || message.toLowerCase().includes('already exists')) {
        if (message.toLowerCase().includes('name')) {
          setErrors(prev => ({ ...prev, name: message || 'A session with this name already exists.' }));
        } else if (message.toLowerCase().includes('date') || message.toLowerCase().includes('overlap')) {
          setErrors(prev => ({ ...prev, endDate: message || 'Session dates overlap with an existing session.' }));
        } else {
          setErrors(prev => ({ ...prev, general: message || 'Conflict: This session details conflict with an existing record.' }));
        }
      } else {
        setErrors(prev => ({ ...prev, general: message || 'Failed to create academic session. Server error encountered.' }));
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-white border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl shrink-0">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-800">Add New Academic Session</DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Create an upcoming session for student enrollments, fee structures, and class mappings.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {errors.general && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-rose-700 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errors.general}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="sessionStartDate" className="text-sm font-semibold text-slate-700">
                Start Date <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="sessionStartDate"
                type="date"
                value={startDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className={errors.startDate ? 'border-rose-400 focus-visible:ring-rose-400' : 'border-slate-200'}
              />
              {errors.startDate && <p className="text-xs text-rose-600 font-medium">{errors.startDate}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sessionEndDate" className="text-sm font-semibold text-slate-700">
                End Date <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="sessionEndDate"
                type="date"
                value={endDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
                className={errors.endDate ? 'border-rose-400 focus-visible:ring-rose-400' : 'border-slate-200'}
              />
              {errors.endDate && <p className="text-xs text-rose-600 font-medium">{errors.endDate}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="sessionName" className="text-sm font-semibold text-slate-700">
                Session Name <span className="text-rose-500">*</span>
              </Label>
              {suggestSessionName(startDate, endDate) && !isNameManuallyEdited && (
                <span className="text-[11px] text-indigo-600 font-medium">Auto-suggested</span>
              )}
            </div>
            <Input
              id="sessionName"
              placeholder="e.g. 2027-28"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className={errors.name ? 'border-rose-400 focus-visible:ring-rose-400' : 'border-slate-200'}
            />
            {errors.name && <p className="text-xs text-rose-600 font-medium">{errors.name}</p>}
          </div>

          {/* Copy from existing session option */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
            <div className="flex items-start gap-2.5">
              <Checkbox
                id="copyStructureCheckbox"
                checked={shouldCopy}
                onCheckedChange={(checked) => setShouldCopy(!!checked)}
                className="mt-0.5 border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
              />
              <div className="space-y-0.5">
                <Label
                  htmlFor="copyStructureCheckbox"
                  className="text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Copy classes, subjects and fee structure
                </Label>
                <p className="text-[11px] text-slate-500">
                  Pre-populates the new session with class cohorts, subject specialists, and fee packages.
                </p>
              </div>
            </div>

            {shouldCopy && (
              <div className="space-y-1.5 pt-1">
                <Label className="text-xs font-medium text-slate-600">Source Session</Label>
                <Select value={copyFromSessionId} onValueChange={setCopyFromSessionId}>
                  <SelectTrigger className="bg-white border-slate-200 h-9 text-xs">
                    <SelectValue placeholder="Select session to copy from" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-slate-900 z-[100]">
                    {existingSessions.map((session) => (
                      <SelectItem key={session.id} value={session.id} className="text-xs">
                        Session {session.name} {session.isCurrent ? '(Current)' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.copyFrom && <p className="text-xs text-rose-600 font-medium">{errors.copyFrom}</p>}
              </div>
            )}
          </div>

          <DialogFooter className="border-t border-slate-100 pt-4 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={createSessionMutation.isPending}
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createSessionMutation.isPending}
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-2"
            >
              {createSessionMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Session'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddSessionModal;
