import React, { useState } from 'react';
import { MessageSquare, Smartphone, Mail, AlertTriangle, Plus, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useCommunicationBalance } from '../hooks/useDashboardQueries';
import { WidgetState } from './WidgetState';
import { ChannelBalance } from '../../../types/dashboard';
import { toast } from '@/components/ui/Toast';

export function CommunicationBalance() {
  const { data, isLoading, isError, error, refetch } = useCommunicationBalance();
  const [topUpModalChannel, setTopUpModalChannel] = useState<'SMS' | 'WhatsApp' | 'Email' | null>(null);
  const [amount, setAmount] = useState('1000');

  const handleTopUpConfirm = () => {
    toast.success(`${amount} credits successfully recharged for ${topUpModalChannel}`);
    setTopUpModalChannel(null);
  };

  const renderChannelBar = (
    name: string,
    channel: ChannelBalance | undefined,
    Icon: React.ElementType,
    themeColor: string
  ) => {
    if (!channel) return null;

    const available = Number(channel.available ?? 0);
    const total = Number(channel.total ?? 1) || 1;
    const threshold = Number(channel.threshold ?? 0);

    const percent = Math.min(
      100,
      Math.max(0, Math.round((available / total) * 100))
    );

    const isLow = Boolean(channel.lowBalance || available < threshold);

    return (
      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div
              className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                isLow ? 'bg-rose-100 text-rose-700' : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div>
              <span className="font-semibold text-slate-800">{name}</span>
              {isLow && (
                <span className="ml-1.5 text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                  Low Balance
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className={`font-bold ${isLow ? 'text-rose-600' : 'text-slate-900'}`}>
              {available.toLocaleString('en-IN')}
            </span>
            <span className="text-slate-400 text-[10px]"> / {total.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full bg-slate-200/70 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isLow ? 'bg-rose-500' : themeColor
              }`}
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-400 pt-0.5">
          <span>{percent}% available</span>
          <button
            type="button"
            onClick={() => setTopUpModalChannel(name as any)}
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
          >
            + Top Up
          </button>
        </div>
      </div>
    );
  };

  return (
    <Card className="border border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden flex flex-col justify-between">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-indigo-600" />
            <span>Communication Balance</span>
          </CardTitle>
          <span className="text-xs text-slate-400">SMS, WhatsApp & Email Credits</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 pt-2">
        <WidgetState
          isLoading={isLoading}
          isError={isError}
          error={error as Error}
          onRetry={refetch}
          isEmpty={!data}
          emptyMessage="No communication balances found."
          skeletonHeight="h-56"
        >
          <div className="space-y-2.5">
            {renderChannelBar('SMS', data?.sms, Smartphone, 'bg-indigo-600')}
            {renderChannelBar('WhatsApp', data?.whatsapp, MessageSquare, 'bg-emerald-600')}
            {renderChannelBar('Email', data?.email, Mail, 'bg-cyan-600')}
          </div>
        </WidgetState>
      </CardContent>

      {/* Top Up Dialog */}
      <Dialog open={!!topUpModalChannel} onOpenChange={(open) => !open && setTopUpModalChannel(null)}>
        <DialogContent className="sm:max-w-xs bg-white rounded-2xl p-5 border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold text-slate-800">
              Top Up {topUpModalChannel} Credits
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-2">
            <label className="text-xs font-semibold text-slate-700">Select Credit Pack</label>
            <div className="grid grid-cols-3 gap-2">
              {['500', '1000', '5000'].map((pack) => (
                <button
                  key={pack}
                  type="button"
                  onClick={() => setAmount(pack)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${amount === pack
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  +{pack}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="mt-4 flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTopUpModalChannel(null)}
              className="text-xs h-8 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleTopUpConfirm}
              className="text-xs h-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
              Recharge Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default CommunicationBalance;

