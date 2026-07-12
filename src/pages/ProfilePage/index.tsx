import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User, Mail, Phone, MapPin, Shield, Save,
  Building, Calendar, Key, Camera, CheckCircle2
} from "lucide-react";
import { LocalStorageSync } from "../../services/LocalStorageSync";

interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  schoolName: string;
  address: string;
  joinDate: string;
}

const DEFAULT_PROFILE: AdminProfile = {
  name: 'John Anderson',
  email: 'john.anderson@edutrio.edu',
  phone: '+91 98765 43210',
  role: 'Super Admin',
  schoolName: 'EduTrio International School',
  address: '123 Education Street, Knowledge City',
  joinDate: '2024-01-15',
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<AdminProfile>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<AdminProfile>(DEFAULT_PROFILE);
  const [saved, setSaved] = useState(false);

  // Password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  useEffect(() => {
    const saved = LocalStorageSync.get<AdminProfile>('edu_trio_admin_profile');
    if (saved) {
      setProfile(saved);
      setEditForm(saved);
    }
  }, []);

  const handleSaveProfile = () => {
    setProfile(editForm);
    LocalStorageSync.set('edu_trio_admin_profile', editForm);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePassword = () => {
    setPasswordError('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    // Mock password change
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2000);
  };

  const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2.5">
          <User className="h-7 w-7 text-indigo-500" />
          Profile Settings
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal information, school details, and security settings.
        </p>
      </div>

      {/* Profile Card */}
      <Card className="border-0 shadow-xl glass-card overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-8 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 blur-3xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
            <div className="relative group">
              <Avatar className="h-24 w-24 ring-4 ring-white/30 shadow-2xl">
                <AvatarFallback className="bg-white/20 text-white text-2xl font-bold backdrop-blur-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold">{profile.name}</h3>
              <p className="text-white/80 text-sm mt-0.5">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  <Shield className="h-3 w-3 mr-1" />
                  {profile.role}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  <Building className="h-3 w-3 mr-1" />
                  {profile.schoolName}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {saved && (
            <div className="mb-4 flex items-center gap-2 bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-medium animate-fade-in">
              <CheckCircle2 className="h-4 w-4" />
              Profile updated successfully!
            </div>
          )}

          <div className="flex items-center justify-between mb-5">
            <h4 className="text-base font-bold text-slate-800">Personal Information</h4>
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => {
                if (isEditing) {
                  setEditForm(profile);
                }
                setIsEditing(!isEditing);
              }}
              size="sm"
              className={isEditing
                ? "border-slate-200 text-slate-600"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> Full Name
              </Label>
              {isEditing ? (
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="h-10"
                />
              ) : (
                <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">{profile.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> Email Address
              </Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="h-10"
                />
              ) : (
                <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">{profile.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> Phone Number
              </Label>
              {isEditing ? (
                <Input
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="h-10"
                />
              ) : (
                <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">{profile.phone}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" /> Role
              </Label>
              <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">{profile.role}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5" /> School Name
              </Label>
              {isEditing ? (
                <Input
                  value={editForm.schoolName}
                  onChange={(e) => setEditForm({ ...editForm, schoolName: e.target.value })}
                  className="h-10"
                />
              ) : (
                <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">{profile.schoolName}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Joined Date
              </Label>
              <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">{profile.joinDate}</p>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> Address
              </Label>
              {isEditing ? (
                <Input
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  className="h-10"
                />
              ) : (
                <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">{profile.address}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-5 flex justify-end">
              <Button onClick={handleSaveProfile} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6">
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security / Password */}
      <Card className="border-0 shadow-xl glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-rose-100 flex items-center justify-center">
              <Key className="h-4 w-4 text-rose-600" />
            </div>
            Change Password
          </CardTitle>
          <CardDescription>Update your account password for better security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {passwordSaved && (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 p-3 rounded-xl border border-emerald-200 text-sm font-medium animate-fade-in">
              <CheckCircle2 className="h-4 w-4" />
              Password changed successfully!
            </div>
          )}
          {passwordError && (
            <div className="flex items-center gap-2 bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-200 text-sm font-medium animate-fade-in">
              {passwordError}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500">Current Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500">New Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500">Confirm Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
          <Button onClick={handleChangePassword} className="bg-rose-600 hover:bg-rose-700 text-white">
            <Key className="h-4 w-4 mr-2" /> Update Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
