import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layers, Plus, AlertCircle, Loader2 } from "lucide-react";
import { ClassGroup } from '../Constants';

interface BulkAddSectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  classes: ClassGroup[];
  onBulkAdd: (classGrpId: string, sectionNames: string[], defaultCapacity: number) => Promise<void> | void;
  selectedClassGrpId?: string;
}

export function BulkAddSectionsModal({
  isOpen,
  onClose,
  classes = [],
  onBulkAdd,
  selectedClassGrpId = '',
}: BulkAddSectionsModalProps) {
  const [classGrpId, setClassGrpId] = useState<string>(selectedClassGrpId || (classes[0]?.id || ''));
  const [rawInput, setRawInput] = useState<string>('A, B, C, D');
  const [capacity, setCapacity] = useState<number>(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setClassGrpId(selectedClassGrpId || (classes[0]?.id || ''));
      setRawInput('A, B, C, D');
      setCapacity(30);
      setApiError(null);
      setIsSubmitting(false);
    }
  }, [isOpen, selectedClassGrpId, classes]);

  const parsedSectionNames = rawInput
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const handleSave = async () => {
    if (!classGrpId || parsedSectionNames.length === 0) return;
    try {
      setIsSubmitting(true);
      setApiError(null);
      await onBulkAdd(classGrpId, parsedSectionNames, capacity);
      onClose();
    } catch (err: any) {
      console.error('[BulkAddSectionsModal] Bulk add sections failed:', err);
      setApiError(err?.message || 'Failed to bulk create sections. Server error encountered.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[440px] bg-white border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-3 bg-cyan-100 text-cyan-700 rounded-xl shrink-0">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-800">Bulk Add Sections</DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Generate multiple sections simultaneously for a grade.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-slate-700">Target Grade *</Label>
            <Select value={classGrpId} onValueChange={setClassGrpId}>
              <SelectTrigger className="border-slate-200 bg-white">
                <SelectValue placeholder="Select Grade" />
              </SelectTrigger>
              <SelectContent className="bg-white text-slate-900 z-[100]">
                {classes.map(c => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.grade || c.name || `Class ${c.id}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-slate-700">Section Names (Comma-Separated) *</Label>
            <Input
              placeholder="e.g. A, B, C, D or Red, Blue, Green"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              className="border-slate-200"
            />
            <p className="text-[11px] text-slate-400">
              Parsed: <span className="font-semibold text-cyan-700">{parsedSectionNames.join(', ') || 'None'}</span> ({parsedSectionNames.length} sections)
            </p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-slate-700">Default Student Capacity (Per Section)</Label>
            <Input
              type="number"
              min={1}
              max={200}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value) || 30)}
              className="border-slate-200"
            />
          </div>
        </div>

        <DialogFooter className="border-t pt-3">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting} className="border-slate-200 text-slate-600">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!classGrpId || parsedSectionNames.length === 0 || isSubmitting}
            className="gradient-cyan text-white shadow-colored-cyan gap-1.5 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Create {parsedSectionNames.length} Sections
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BulkAddSectionsModal;
