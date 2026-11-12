import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tag, Plus, Check, Sparkles, Palette } from "lucide-react";
import { EventCategory } from '../Constants';

export interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: EventCategory | null;
  onSave: (category: EventCategory) => void;
}

const COLOR_OPTIONS: {
  value: EventCategory['color'];
  label: string;
  pillBg: string;
  badgeStyle: string;
  dotColor: string;
}[] = [
  {
    value: 'cyan',
    label: 'Cyan (Sky Blue)',
    pillBg: 'bg-cyan-500 text-white',
    badgeStyle: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    dotColor: 'bg-cyan-500'
  },
  {
    value: 'indigo',
    label: 'Indigo (Royal Blue)',
    pillBg: 'bg-indigo-500 text-white',
    badgeStyle: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    dotColor: 'bg-indigo-500'
  },
  {
    value: 'emerald',
    label: 'Emerald (Vibrant Green)',
    pillBg: 'bg-emerald-500 text-white',
    badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotColor: 'bg-emerald-500'
  },
  {
    value: 'amber',
    label: 'Amber (Warm Gold)',
    pillBg: 'bg-amber-500 text-white',
    badgeStyle: 'bg-amber-50 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500'
  },
  {
    value: 'rose',
    label: 'Rose (Coral Red)',
    pillBg: 'bg-rose-500 text-white',
    badgeStyle: 'bg-rose-50 text-rose-700 border-rose-200',
    dotColor: 'bg-rose-500'
  },
  {
    value: 'purple',
    label: 'Purple (Royal Violet)',
    pillBg: 'bg-purple-500 text-white',
    badgeStyle: 'bg-purple-50 text-purple-700 border-purple-200',
    dotColor: 'bg-purple-500'
  },
];

export function getCategoryBadgeClass(color?: string): string {
  switch (color) {
    case 'cyan': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    case 'indigo': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'emerald': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'amber': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'rose': return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'purple': return 'bg-purple-50 text-purple-700 border-purple-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export function CategoryFormModal({
  isOpen,
  onClose,
  category,
  onSave
}: CategoryFormModalProps) {
  const isEditing = Boolean(category);

  const [name, setName] = useState('');
  const [color, setColor] = useState<EventCategory['color']>('cyan');
  const [description, setDescription] = useState('');

  // Sync state whenever modal opens or category changes
  useEffect(() => {
    if (isOpen) {
      if (category) {
        setName(category.name || '');
        setColor(category.color || 'cyan');
        setDescription(category.description || '');
      } else {
        setName('');
        setColor('cyan');
        setDescription('');
      }
    }
  }, [isOpen, category]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) return;

    const targetId = category ? category.id : `cat-${Date.now()}`;
    const updatedCategory: EventCategory = {
      id: targetId,
      name: name.trim(),
      color,
      description: description.trim(),
      isDefault: category?.isDefault || false
    };

    onSave(updatedCategory);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[540px] bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xl space-y-5">
        <DialogHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl text-white shadow-sm shrink-0 ${
              isEditing 
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-100' 
                : 'gradient-emerald shadow-emerald-100'
            }`}>
              {isEditing ? <Tag className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                {isEditing ? `Edit Category: ${category?.name}` : 'Create New Event Category'}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                {isEditing
                  ? 'Update event classification badge name, color theme, and description.'
                  : 'Define a new event classification badge for calendar events and PTM sessions.'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Live Preview Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                Live Badge Preview
              </span>
              <p className="text-[11px] text-slate-400">
                Appears on calendar schedules and category filters
              </p>
            </div>
            <Badge variant="outline" className={`${getCategoryBadgeClass(color)} text-xs font-bold px-3 py-1 shadow-sm`}>
              {name.trim() || 'Sample Category'}
            </Badge>
          </div>

          {/* Category Title / Name */}
          <div className="space-y-1.5">
            <Label htmlFor="category-title" className="text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Category Title / Name <span className="text-rose-500">*</span></span>
              {name.trim().length > 0 && (
                <span className="text-[11px] text-slate-400 font-normal">{name.trim().length} chars</span>
              )}
            </Label>
            <Input
              id="category-title"
              placeholder="e.g. Science Fair, Sports Meet, Parent Orientation"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 text-xs rounded-xl border-slate-200 bg-white focus-visible:ring-emerald-500"
              autoFocus
              required
            />
          </div>

          {/* Badge Color Theme Swatches */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5 text-slate-400" />
              <span>Badge Color Theme <span className="text-rose-500">*</span></span>
            </Label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COLOR_OPTIONS.map((opt) => {
                const isSelected = color === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setColor(opt.value)}
                    className={`h-9 px-3 text-xs font-semibold rounded-xl flex items-center justify-between gap-2 border transition-all text-left ${
                      isSelected
                        ? `${opt.badgeStyle} ring-2 ring-slate-400 font-bold shadow-sm`
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`h-2.5 w-2.5 rounded-full ${opt.dotColor} shrink-0`} />
                      <span className="truncate">{opt.label.split(' ')[0]}</span>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="category-description" className="text-xs font-semibold text-slate-700">
              Description / Usage Context <span className="text-slate-400 font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="category-description"
              placeholder="e.g. For annual science expos, project showcases, and STEM competitions."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="text-xs rounded-xl border-slate-200 bg-white resize-none leading-relaxed focus-visible:ring-emerald-500"
            />
          </div>

          {/* Dialog Footer Actions */}
          <DialogFooter className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-9 text-xs rounded-xl border-slate-200 px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!name.trim()}
              className={`h-9 text-xs font-semibold rounded-xl px-4 gap-1.5 shadow-sm text-white transition-all ${
                isEditing
                  ? 'gradient-indigo hover:opacity-95'
                  : 'gradient-emerald shadow-colored-emerald hover:opacity-95'
              }`}
            >
              {isEditing ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Update Category
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" />
                  Create Category
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
