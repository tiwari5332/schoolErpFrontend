import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, Layers } from "lucide-react";

interface DeleteImpactModalProps {
  isOpen: boolean;
  title: string;
  entityName: string;
  impactDetails?: { label: string; count: number }[];
  warningText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteImpactModal({
  isOpen,
  title,
  entityName,
  impactDetails = [],
  warningText,
  onClose,
  onConfirm,
}: DeleteImpactModalProps) {
  const hasImpact = impactDetails.some(item => item.count > 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border border-slate-200 shadow-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0 border border-rose-200">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-800">{title}</DialogTitle>
              <DialogDescription className="text-xs text-slate-500 mt-0.5">
                Target: <span className="font-semibold text-slate-700">{entityName}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 py-3">
          <p className="text-sm text-slate-600">
            Are you sure you want to delete <strong className="text-slate-800">{entityName}</strong>? This action cannot be undone.
          </p>

          {hasImpact && (
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl space-y-2 text-xs text-rose-800">
              <div className="flex items-center gap-1.5 font-bold">
                <Layers className="h-4 w-4 text-rose-600" />
                <span>Associated Entities Affected:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pl-1">
                {impactDetails.map((item, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">{item.count}</span> {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {warningText && (
            <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              ⚠️ {warningText}
            </p>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-700">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-rose-600 hover:bg-rose-700 text-white shadow-md gap-1.5">
            <Trash2 className="h-4 w-4" /> Delete Permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteImpactModal;
