import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User, Mail, Phone, MapPin, Shield, Save,
  Building, Calendar, Key, Camera, CheckCircle2,
  AlertCircle, RefreshCw, Loader2
} from "lucide-react";
import { profileService, AdminProfileDTO } from '@/api/services/profileService';
import { toast } from '@/components/ui/Toast';

export function ProfileView() {
  const queryClient = useQueryClient();

  // 1. Fetch Profile from API
  const {
    data: profile,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<AdminProfileDTO>({
    queryKey: ['admin-profile'],
    queryFn: () => profileService.getProfile(),
    staleTime: 5 * 60 * 1000,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<AdminProfileDTO>({
    name: '',
    email: '',
    phone: '',
    role: '',
    schoolName: '',
    address: '',
    joinDate: '',
  });

  // Sync edit form when profile data loads
  useEffect(() => {
    if (profile) {
      setEditForm(profile);
    }
  }, [profile]);

  // 2. Mutation to update profile via API
  const updateProfileMutation = useMutation({
    mutationFn: (payload: any) => profileService.updateProfile(payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(['admin-profile'], updated);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Failed to update profile');
    },
  });

  // 3. Password change state & mutation
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  const changePasswordMutation = useMutation({
    mutationFn: (payload: { currentPassword: string; newPassword: string }) =>
      profileService.changePassword(payload),
    onSuccess: () => {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
      setPasswordSaved(true);
      toast.success('Password changed successfully');
      setTimeout(() => setPasswordSaved(false), 3000);
    },
    onError: (err: any) => {
      setPasswordError(err?.message || 'Failed to change password. Please verify your current password.');
      toast.error(err?.message || 'Password update failed');
    },
  });

  const handleSaveProfile = () => {
    if (!editForm.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    updateProfileMutation.mutate(editForm);
  };

  const handleChangePassword = () => {
    setPasswordError('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All password fields are required');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    changePasswordMutation.mutate({
      currentPassword,
      newPassword,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 rounded-lg" />
        <div className="h-64 bg-slate-100 rounded-3xl" />
        <div className="h-48 bg-slate-100 rounded-3xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-6 bg-rose-50 border border-rose-200 rounded-3xl text-center space-y-4">
        <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
        <div>
          <h3 className="text-base font-bold text-rose-800">Failed to load profile data from API</h3>
          <p className="text-xs text-rose-600 mt-1">{(error as any)?.message || 'Something went wrong while connecting to the server.'}</p>
        </div>
        <Button
          onClick={() => refetch()}
          className="bg-rose-600 hover:bg-rose-700 text-white gap-2 h-9 px-4 text-xs font-semibold rounded-xl"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry Loading Profile</span>
        </Button>
      </div>
    );
  }

  const currentProfile = profile || editForm;
  const initials = (currentProfile.name || 'Admin')
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2.5">
          <User className="h-7 w-7 text-indigo-500" />
          Profile Settings
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal information, school details, and security settings.
        </p>
      </div>

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
              <h3 className="text-2xl font-bold">{currentProfile.name}</h3>
              <p className="text-white/80 text-sm mt-0.5">{currentProfile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  <Shield className="h-3 w-3 mr-1" />
                  {currentProfile.role || 'Super Admin'}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  <Building className="h-3 w-3 mr-1" />
                  {currentProfile.schoolName || 'EduTrio International Academy'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-base font-bold text-slate-800">Personal Information</h4>
            <Button
              variant={isEditing ? 'outline' : 'default'}
              onClick={() => {
                if (isEditing) {
                  setEditForm(currentProfile);
                }
                setIsEditing(!isEditing);
              }}
              size="sm"
              className={
                isEditing
                  ? 'border-slate-200 text-slate-600'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
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
                <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">
                  {currentProfile.name}
                </p>
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
                <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">
                  {currentProfile.email}
                </p>
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
                <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">
                  {currentProfile.phone}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" /> Role
              </Label>
              <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">
                {currentProfile.role || 'Super Admin'}
              </p>
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
                <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">
                  {currentProfile.schoolName || 'EduTrio International Academy'}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Joined Date
              </Label>
              <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">
                {currentProfile.joinDate || '2024-01-15'}
              </p>
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
                <p className="text-sm font-medium text-slate-800 bg-slate-50 px-3 py-2.5 rounded-lg border border-slate-100">
                  {currentProfile.address || '123 Knowledge Park, Edu City'}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-5 flex justify-end">
              <Button
                onClick={handleSaveProfile}
                disabled={updateProfileMutation.isPending}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 gap-2"
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-rose-100 flex items-center justify-center">
              <Key className="h-4 w-4 text-rose-600" />
            </div>
            Change Password
          </CardTitle>
          <CardDescription>Update your account password via secure API</CardDescription>
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
              <AlertCircle className="h-4 w-4" />
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
          <Button
            onClick={handleChangePassword}
            disabled={changePasswordMutation.isPending}
            className="bg-rose-600 hover:bg-rose-700 text-white gap-2"
          >
            {changePasswordMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating Password...
              </>
            ) : (
              <>
                <Key className="h-4 w-4" />
                Update Password
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileView;
