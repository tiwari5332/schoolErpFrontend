import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Megaphone, Mail, Smartphone, MessageSquare, Sparkles, Send } from "lucide-react";
import { 
  Announcement, 
  COMMUNICATION_TEMPLATES, 
  AudienceRole, 
  CommunicationChannel 
} from '../Constants';

interface ComposeBroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (announcement: Partial<Announcement>) => void;
  templates?: AnnouncementTemplate[];
  onOpenCreateTemplate?: () => void;
}

export function ComposeBroadcastModal({ 
  isOpen, 
  onClose, 
  onSend, 
  templates = COMMUNICATION_TEMPLATES,
  onOpenCreateTemplate 
}: ComposeBroadcastModalProps) {
  const [targetAudience, setTargetAudience] = useState<AudienceRole | ''>('');
  const [targetClass, setTargetClass] = useState<string>('All');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [channels, setChannels] = useState<CommunicationChannel[]>([]);

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId) || COMMUNICATION_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setTitle(template.title);
      setMessage(template.body);
      setChannels(template.defaultChannels);
    }
  };

  const toggleChannel = (channel: CommunicationChannel) => {
    setChannels(prev => 
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const handleSend = () => {
    if (!title || !message || !targetAudience || channels.length === 0) return;
    
    onSend({
      title,
      message,
      targetAudience,
      targetClass,
      channels,
      sentAt: new Date().toISOString(),
      sentBy: 'Admin Workspace'
    });

    // Reset form after sending
    setTitle('');
    setMessage('');
    setTargetAudience('');
    setChannels([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[620px] bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xl space-y-4">
        <DialogHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-sm shrink-0">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-slate-900">
                New Multi-Channel Broadcast
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Compose and dispatch notifications to students, parents, or staff rosters
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-4 py-1 text-xs">
          {/* Top Row: Quick Template & Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-amber-500" /> Quick Preset Template
                </Label>
                {onOpenCreateTemplate && (
                  <button 
                    type="button" 
                    onClick={() => {
                      onClose();
                      onOpenCreateTemplate();
                    }}
                    className="text-[10px] text-amber-600 font-bold hover:underline"
                  >
                    + Create New
                  </button>
                )}
              </div>
              <Select onValueChange={handleTemplateSelect}>
                <SelectTrigger className="h-9 text-xs rounded-xl border-slate-200">
                  <SelectValue placeholder="Load pre-built template..." />
                </SelectTrigger>
                <SelectContent>
                  {templates.map(tpl => (
                    <SelectItem key={tpl.id} value={tpl.id} className="text-xs">{tpl.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700">Target Audience *</Label>
              <Select value={targetAudience} onValueChange={(val) => setTargetAudience(val as AudienceRole)}>
                <SelectTrigger className="h-9 text-xs rounded-xl border-slate-200">
                  <SelectValue placeholder="Select target role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Everyone (Global School Broadcast)</SelectItem>
                  <SelectItem value="Parents">Parents Only</SelectItem>
                  <SelectItem value="Teachers">Teachers Only</SelectItem>
                  <SelectItem value="Students">Students Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conditional Target Class */}
          {(targetAudience === 'Parents' || targetAudience === 'Students') && (
            <div className="space-y-1 animate-in fade-in slide-in-from-top-1">
              <Label className="text-xs font-semibold text-slate-700">Filter by Grade / Class Roster</Label>
              <Select value={targetClass} onValueChange={setTargetClass}>
                <SelectTrigger className="h-9 text-xs rounded-xl border-slate-200">
                  <SelectValue placeholder="Select Class (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Grades (Entire Roster)</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="8">Grade 8</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Delivery Channels Selection */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-700">Delivery Channels *</Label>
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
                <span className="text-xs">Email Notice</span>
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
                <span className="text-xs">SMS Text</span>
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

          {/* Message Content */}
          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-slate-700">Subject / Announcement Title *</Label>
              <Input 
                placeholder="e.g. End of Term Parent-Teacher Meeting & Report Distribution" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-9 text-xs rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-semibold text-slate-700">Message Content Body *</Label>
                <span className="text-[11px] text-slate-400">{message.length} characters</span>
              </div>
              <Textarea 
                placeholder="Type your message body here..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="text-xs rounded-xl border-slate-200 resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="pt-3 border-t border-slate-100 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl h-9 text-xs border-slate-200">
            Cancel
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={!title || !message || !targetAudience || channels.length === 0}
            className="gradient-indigo text-white font-semibold rounded-xl h-9 text-xs px-5 gap-1.5 shadow-colored-indigo"
          >
            <Send className="h-3.5 w-3.5" />
            Send Broadcast
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

