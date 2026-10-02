import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tag, Plus, Edit2, Trash2, Check, Sparkles } from "lucide-react";
import { EventCategory } from '../Constants';

interface ManageEventCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: EventCategory[];
  onSaveCategory: (category: Partial<EventCategory>) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const COLOR_OPTIONS: { value: EventCategory['color']; label: string; class: string }[] = [
  { value: 'cyan', label: 'Cyan', class: 'bg-cyan-500 text-white' },
  { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500 text-white' },
  { value: 'emerald', label: 'Emerald', class: 'bg-emerald-500 text-white' },
  { value: 'amber', label: 'Amber', class: 'bg-amber-500 text-white' },
  { value: 'rose', label: 'Rose', class: 'bg-rose-500 text-white' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-500 text-white' },
];

export function ManageEventCategoriesModal({
  isOpen,
  onClose,
  categories,
  onSaveCategory,
  onDeleteCategory
}: ManageEventCategoriesModalProps) {
  const [editingCategory, setEditingCategory] = useState<Partial<EventCategory> | null>(null);
  const [name, setName] = useState('');
  const [color, setColor] = useState<EventCategory['color']>('cyan');
  const [description, setDescription] = useState('');

  const startCreating = () => {
    setEditingCategory({ id: undefined });
    setName('');
    setColor('cyan');
    setDescription('');
  };

  const startEditing = (cat: EventCategory) => {
    setEditingCategory(cat);
    setName(cat.name);
    setColor(cat.color);
    setDescription(cat.description || '');
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setName('');
    setColor('cyan');
    setDescription('');
  };

  const handleSave = () => {
    if (!name.trim()) return;

    onSaveCategory({
      id: editingCategory?.id,
      name: name.trim(),
      color,
      description: description.trim()
    });

    cancelEdit();
  };

  const getBadgeStyle = (c: EventCategory['color']) => {
    switch (c) {
      case 'cyan': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'indigo': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'emerald': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'amber': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'rose': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'purple': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[560px] bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xl space-y-4">
        <DialogHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl shadow-sm shrink-0">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                Manage Event Categories
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Create or modify categories for scheduled PTMs, assemblies, and school events
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Editing / Creating Form Section */}
        {editingCategory !== null ? (
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3 animate-in fade-in">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
              <span className="text-xs font-bold text-slate-800">
                {editingCategory.id ? `Edit Category: "${editingCategory.name}"` : 'Create New Event Category'}
              </span>
              <Button variant="ghost" size="sm" onClick={cancelEdit} className="h-6 text-[11px] text-slate-500">
                Cancel
              </Button>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700">Category Name *</Label>
              <Input 
                placeholder="e.g. Sports & Cultural, Parent Workshop, Exam Prep" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 text-xs rounded-xl border-slate-200 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-700">Badge Color Theme *</Label>
              <div className="flex gap-2 flex-wrap">
                {COLOR_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setColor(opt.value)}
                    className={`h-7 px-3 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                      color === opt.value
                        ? `${opt.class} ring-2 ring-offset-1 ring-slate-400`
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {color === opt.value && <Check className="h-3 w-3" />}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700">Description (Optional)</Label>
              <Input 
                placeholder="Short description of events under this category" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-9 text-xs rounded-xl border-slate-200 bg-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button 
                onClick={handleSave} 
                disabled={!name.trim()}
                className="gradient-cyan text-white text-xs font-semibold rounded-xl h-8 px-4"
              >
                {editingCategory.id ? 'Save Changes' : 'Create Category'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700">Active Event Categories ({categories.length})</span>
            <Button
              onClick={startCreating}
              className="gradient-cyan text-white text-xs font-semibold rounded-xl h-8 px-3 gap-1 shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" /> New Category
            </Button>
          </div>
        )}

        {/* Existing Categories List */}
        <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto rounded-xl border border-slate-100 bg-white">
          {categories.map((cat) => (
            <div key={cat.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs font-bold px-2.5 py-0.5 ${getBadgeStyle(cat.color)}`}>
                    {cat.name}
                  </Badge>
                  {cat.isDefault && (
                    <span className="text-[10px] text-slate-400 font-medium">(Default System Category)</span>
                  )}
                </div>
                {cat.description && (
                  <p className="text-[11px] text-slate-500 pl-0.5">{cat.description}</p>
                )}
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(cat)}
                  className="h-7 w-7 p-0 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                {!cat.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteCategory(cat.id)}
                    className="h-7 w-7 p-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="pt-2 border-t border-slate-100 flex justify-end">
          <Button onClick={onClose} variant="outline" className="rounded-xl h-9 text-xs px-5 border-slate-200">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
