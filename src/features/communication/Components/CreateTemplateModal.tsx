import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Mail, Smartphone, MessageSquare, PlusCircle } from "lucide-react";
import { AnnouncementTemplate, CommunicationChannel } from '../Constants';

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (template: Partial<AnnouncementTemplate>) => void;
}

export function CreateTemplateModal({ isOpen, onClose, onCreate }: CreateTemplateModalProps) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [channels, setChannels] = useState<CommunicationChannel[]>(['Email', 'App Push']);

  const toggleChannel = (channel: CommunicationChannel) => {
    setChannels(prev => 
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const handleSave = () => {
    if (!name || !title || !body || channels.length === 0) return;

    onCreate({
      name,
      title,
      body,
      defaultChannels: channels
    });

    // Reset form
    setName('');
    setTitle('');
    setBody('');
    setChannels(['Email', 'App Push']);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[580px] bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xl space-y-4">
        <DialogHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl shadow-sm shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                Create Broadcast Preset Template
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Save reusable announcement message templates for quick dispatch
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-1 text-xs">
          {/* Template Identifier Name */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-slate-700">Preset Template Name *</Label>
            <Input 
              placeholder="e.g. Exam Schedule Release, Sports Day Rain Postponement" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 text-xs rounded-xl border-slate-200"
            />
          </div>

          {/* Default Title / Subject */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold text-slate-700">Default Announcement Subject *</Label>
            <Input 
              placeholder="e.g. NOTICE: Mid-Term Exam Timetable Published" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-9 text-xs rounded-xl border-slate-200"
            />
          </div>

          {/* Default Message Body */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold text-slate-700">Default Message Body Content *</Label>
              <span className="text-[11px] text-slate-400">{body.length} characters</span>
            </div>
            <Textarea 
              placeholder="Enter standard pre-written message text here..." 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="text-xs rounded-xl border-slate-200 resize-none leading-relaxed"
            />
          </div>

          {/* Default Channels Selection */}
          <div className="space-y-1.5 pt-1">
            <Label className="text-xs font-semibold text-slate-700">Default Delivery Channels *</Label>
            <div className="grid grid-cols-3 gap-3">
              <label 
                onClick={() => toggleChannel('Email')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                  channels.includes('Email')
                    ? 'bg-indigo-50/70 border-indigo-300 text-indigo-900 font-semibold'
                    : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Checkbox 
                  checked={channels.includes('Email')} 
                  onCheckedChange={() => toggleChannel('Email')}
                  className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
                <Mail className="h-4 w-4 text-indigo-500" />
                <span className="text-xs">Email</span>
              </label>

              <label 
                onClick={() => toggleChannel('SMS')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                  channels.includes('SMS')
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-semibold'
                    : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Checkbox 
                  checked={channels.includes('SMS')} 
                  onCheckedChange={() => toggleChannel('SMS')}
                  className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                />
                <MessageSquare className="h-4 w-4 text-emerald-500" />
                <span className="text-xs">SMS</span>
              </label>

              <label 
                onClick={() => toggleChannel('App Push')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                  channels.includes('App Push')
                    ? 'bg-purple-50/70 border-purple-300 text-purple-900 font-semibold'
                    : 'bg-slate-50/50 border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Checkbox 
                  checked={channels.includes('App Push')} 
                  onCheckedChange={() => toggleChannel('App Push')}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Smartphone className="h-4 w-4 text-purple-500" />
                <span className="text-xs">Mobile Push</span>
              </label>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-slate-100 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl h-9 text-xs border-slate-200">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!name || !title || !body || channels.length === 0}
            className="gradient-emerald text-white font-semibold rounded-xl h-9 text-xs px-5 gap-1.5 shadow-colored-emerald"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Save Preset Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
