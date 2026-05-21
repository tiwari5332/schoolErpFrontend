import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LayoutTemplate, Save } from "lucide-react";

interface ManageGradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (gradeName: string) => void;
}

export function ManageGradeModal({ isOpen, onClose, onSave }: ManageGradeModalProps) {
  const [gradeName, setGradeName] = useState('');

  const handleSave = () => {
    if (!gradeName) return;
    onSave(gradeName);
    setGradeName('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] glass-card border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-cyan-100 text-cyan-600 rounded-xl">
              <LayoutTemplate className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                New Grade/Class
              </DialogTitle>
              <DialogDescription>
                Create a new top-level grade (e.g. "Grade 11").
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="gradeName" className="text-sm font-medium text-slate-700">Grade Name *</Label>
            <Input 
              id="gradeName"
              placeholder="e.g. Grade 11" 
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              className="border-slate-200 focus:border-cyan-400 focus:ring-cyan-100"
            />
          </div>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-600 hover:bg-slate-50">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!gradeName}
            className="gradient-cyan text-white shadow-colored-cyan hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Create Grade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
