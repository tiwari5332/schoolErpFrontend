import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Megaphone, Mail, Smartphone, MessageSquare } from "lucide-react";
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
}

export function ComposeBroadcastModal({ isOpen, onClose, onSend }: ComposeBroadcastModalProps) {
  const [targetAudience, setTargetAudience] = useState<AudienceRole | ''>('');
  const [targetClass, setTargetClass] = useState<string>('All');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [channels, setChannels] = useState<CommunicationChannel[]>([]);

  const handleTemplateSelect = (templateId: string) => {
    const template = COMMUNICATION_TEMPLATES.find(t => t.id === templateId);
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
      <DialogContent className="sm:max-w-[600px] glass-card border-slate-200">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <Megaphone className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                New Broadcast
              </DialogTitle>
              <DialogDescription>
                Send an announcement to students, parents, or teachers.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Top Row: Template & Audience */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-slate-700">Quick Template (Optional)</Label>
              <Select onValueChange={handleTemplateSelect}>
                <SelectTrigger className="border-slate-200 focus:border-indigo-400">
                  <SelectValue placeholder="Load a template..." />
                </SelectTrigger>
                <SelectContent>
                  {COMMUNICATION_TEMPLATES.map(tpl => (
                    <SelectItem key={tpl.id} value={tpl.id}>{tpl.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-slate-700">Target Audience *</Label>
              <Select value={targetAudience} onValueChange={(val) => setTargetAudience(val as AudienceRole)}>
                <SelectTrigger className="border-slate-200 focus:border-indigo-400">
                  <SelectValue placeholder="Select Audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Everyone (Global Broadcast)</SelectItem>
                  <SelectItem value="Parents">Parents Only</SelectItem>
                  <SelectItem value="Teachers">Teachers Only</SelectItem>
                  <SelectItem value="Students">Students Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conditional Target Class */}
          {(targetAudience === 'Parents' || targetAudience === 'Students') && (
            <div className="grid gap-2 animate-in fade-in slide-in-from-top-2">
              <Label className="text-sm font-medium text-slate-700">Target Class/Grade</Label>
              <Select value={targetClass} onValueChange={setTargetClass}>
                <SelectTrigger className="border-slate-200 focus:border-indigo-400">
                  <SelectValue placeholder="Select Class (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Classes (Entire School)</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="8">Grade 8</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Channels Selection */}
          <div className="grid gap-3">
            <Label className="text-sm font-medium text-slate-700">Delivery Channels *</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-xl hover:bg-slate-50 transition-colors flex-1 text-sm font-medium">
                <Checkbox 
                  checked={channels.includes('Email')} 
                  onCheckedChange={() => toggleChannel('Email')}
                  className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
                <Mail className="h-4 w-4 text-slate-500" />
                Email
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-xl hover:bg-slate-50 transition-colors flex-1 text-sm font-medium">
                <Checkbox 
                  checked={channels.includes('SMS')} 
                  onCheckedChange={() => toggleChannel('SMS')}
                  className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
                <MessageSquare className="h-4 w-4 text-slate-500" />
                SMS Text
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-xl hover:bg-slate-50 transition-colors flex-1 text-sm font-medium">
                <Checkbox 
                  checked={channels.includes('App Push')} 
                  onCheckedChange={() => toggleChannel('App Push')}
                  className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
                <Smartphone className="h-4 w-4 text-slate-500" />
                App Push
              </label>
            </div>
          </div>

          {/* Message Content */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-slate-700">Subject / Title *</Label>
              <Input 
                placeholder="e.g. Important Announcement" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-100"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-slate-700">Message Body *</Label>
              <Textarea 
                placeholder="Type your message here..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-100 resize-none"
              />
              <p className="text-xs text-slate-500 text-right">{message.length} characters</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 border-t pt-4">
          <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-600 hover:bg-slate-50">
            Cancel
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={!title || !message || !targetAudience || channels.length === 0}
            className="gradient-indigo text-white shadow-colored-indigo hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <Megaphone className="h-4 w-4" />
            Send Broadcast
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
