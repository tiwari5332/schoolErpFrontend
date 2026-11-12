import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AcademicSession } from '../../../types/session';
import { useSetCurrentSession } from '../hooks/useSessions';
import { Loader2 } from 'lucide-react';

interface SetCurrentConfirmDialogProps {
  session: AcademicSession | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SetCurrentConfirmDialog({ session, isOpen, onClose }: SetCurrentConfirmDialogProps) {
  const setCurrentMutation = useSetCurrentSession();

  if (!session) return null;

  const handleConfirm = async () => {
    try {
      await setCurrentMutation.mutateAsync(session.id);
      onClose();
    } catch {
      // Handled by mutation onError toast
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white border-slate-200 sm:max-w-[420px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-slate-800">
            Set Session {session.name} as Current?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-slate-600 leading-relaxed">
            This changes the active session for all users. System-wide attendance, fee invoicing, and grade cohorts will default to this session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel
            disabled={setCurrentMutation.isPending}
            onClick={onClose}
            className="border-slate-200 text-slate-600"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={setCurrentMutation.isPending}
            onClick={handleConfirm}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
          >
            {setCurrentMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Updating...
              </>
            ) : (
              'Confirm Change'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SetCurrentConfirmDialog;

