import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  FileText,
  BadgePercent,
  Check,
  X,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { usePendingActions } from '../hooks/useDashboardQueries';
import { PendingActionItem } from '../../../types/dashboard';
import { formatPaiseToRupees } from '../utils/dashboardFormatters';
import { WidgetState } from './WidgetState';

export function PendingApprovals() {
  const { data, isLoading, isError, error, refetch, approveAction, isApproving, rejectAction, isRejecting } =
    usePendingActions();

  const [confirmModal, setConfirmModal] = useState<{
    action: 'approve' | 'reject';
    item: PendingActionItem;
  } | null>(null);

  const items = data?.items || [];

  const handleConfirm = () => {
    if (!confirmModal) return;
    if (confirmModal.action === 'approve') {
      approveAction(confirmModal.item.id);
    } else {
      rejectAction(confirmModal.item.id);
    }
    setConfirmModal(null);
  };

  const getTypeIcon = (type: PendingActionItem['type']) => {
    switch (type) {
      case 'leave_request':
        return <UserCheck className="h-4 w-4 text-amber-600" />;
      case 'fee_concession':
        return <BadgePercent className="h-4 w-4 text-indigo-600" />;
      case 'document_verification':
      case 'admission_approval':
      default:
        return <FileText className="h-4 w-4 text-cyan-600" />;
    }
  };

  return (
    <Card id="pending-approvals-section" className="border border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
            <span>Pending Approvals</span>
            {items.length > 0 && (
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                {items.length} pending
              </span>
            )}
          </CardTitle>
          <span className="text-xs text-slate-400">Requires administrative sign-off</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-2">
        <WidgetState
          isLoading={isLoading}
          isError={isError}
          error={error as Error}
          onRetry={refetch}
          isEmpty={items.length === 0}
          emptyMessage="No pending approval requests. All clear!"
          skeletonHeight="h-56"
        >
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-slate-100">
            {items.map((item) => (
              <div
                key={item.id}
                className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2 pt-0.5">
                      <span>By: {item.requestedBy}</span>
                      <span>•</span>
                      <span>{item.date}</span>
                      {item.amount && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-indigo-600">
                            {formatPaiseToRupees(item.amount)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Approve / Reject buttons */}
                <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isApproving || isRejecting}
                    onClick={() => setConfirmModal({ action: 'approve', item })}
                    className="h-7 px-2.5 text-xs text-emerald-700 bg-emerald-50/60 hover:bg-emerald-100/80 border-emerald-200 rounded-lg font-semibold gap-1"
                  >
                    <Check className="h-3 w-3" />
                    <span>Approve</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isApproving || isRejecting}
                    onClick={() => setConfirmModal({ action: 'reject', item })}
                    className="h-7 px-2 text-xs text-rose-700 bg-rose-50/60 hover:bg-rose-100/80 border-rose-200 rounded-lg font-semibold gap-1"
                  >
                    <X className="h-3 w-3" />
                    <span>Reject</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </WidgetState>
      </CardContent>

      {/* Confirmation Dialog */}
      <Dialog open={!!confirmModal} onOpenChange={(open) => !open && setConfirmModal(null)}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-slate-800">
              Confirm {confirmModal?.action === 'approve' ? 'Approval' : 'Rejection'}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 pt-1">
              Are you sure you want to {confirmModal?.action} the request: &quot;
              {confirmModal?.item?.title}&quot; requested by {confirmModal?.item?.requestedBy}?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmModal(null)}
              className="text-xs h-8 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleConfirm}
              className={`text-xs h-8 rounded-xl text-white font-semibold ${
                confirmModal?.action === 'approve'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              Confirm {confirmModal?.action === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default PendingApprovals;

