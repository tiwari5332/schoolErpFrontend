import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Settings, Crown, MessageSquare, Mail, Phone, History,
  Check, ArrowUpRight, Zap, Shield, Star, CreditCard,
  Clock, AlertTriangle, Sparkles, ChevronRight, IndianRupee,
  Send, MessageCircle
} from "lucide-react";
import { LocalStorageSync } from "../../services/LocalStorageSync";

// ─── Types ──────────────────────────────────────────────────

interface PlanInfo {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  maxStudents: number;
  maxTeachers: number;
  smsIncluded: number;
  whatsappIncluded: number;
  emailIncluded: number;
  color: string;
  gradient: string;
  popular?: boolean;
}

interface CurrentSubscription {
  planId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expiring' | 'expired';
  smsBalance: number;
  whatsappBalance: number;
  emailBalance: number;
  amountDue: number;
  lastPaymentDate: string;
}

interface RechargePackage {
  id: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
  isCustom?: boolean;
}

interface RechargeRecord {
  id: string;
  type: 'sms' | 'whatsapp' | 'email' | 'plan';
  packageName: string;
  quantity: number;
  amount: number;
  date: string;
  status: 'success' | 'pending' | 'failed';
}

// ─── Data ───────────────────────────────────────────────────

const PLANS: PlanInfo[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 2999,
    billingCycle: 'monthly',
    features: ['Up to 200 students', '10 teachers', 'Basic reports', 'Email support', 'Attendance module'],
    maxStudents: 200,
    maxTeachers: 10,
    smsIncluded: 500,
    whatsappIncluded: 200,
    emailIncluded: 1000,
    color: 'slate',
    gradient: 'from-slate-500 to-slate-700',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 5999,
    billingCycle: 'monthly',
    features: ['Up to 500 students', '30 teachers', 'Advanced reports', 'Priority support', 'All modules', 'Fee management'],
    maxStudents: 500,
    maxTeachers: 30,
    smsIncluded: 2000,
    whatsappIncluded: 1000,
    emailIncluded: 5000,
    color: 'indigo',
    gradient: 'from-indigo-500 to-indigo-700',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 9999,
    billingCycle: 'monthly',
    features: ['Up to 2000 students', '100 teachers', 'Custom reports', '24/7 support', 'All modules', 'API access', 'White-label'],
    maxStudents: 2000,
    maxTeachers: 100,
    smsIncluded: 5000,
    whatsappIncluded: 3000,
    emailIncluded: 15000,
    color: 'purple',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 19999,
    billingCycle: 'monthly',
    features: ['Unlimited students', 'Unlimited teachers', 'Custom development', 'Dedicated account manager', 'All modules', 'On-premise option', 'SLA guarantee'],
    maxStudents: 99999,
    maxTeachers: 99999,
    smsIncluded: 15000,
    whatsappIncluded: 10000,
    emailIncluded: 50000,
    color: 'amber',
    gradient: 'from-amber-500 to-amber-700',
  },
];

const SMS_PACKAGES: RechargePackage[] = [
  { id: 'sms-basic', name: 'Basic', quantity: 1000, pricePerUnit: 0.22, total: 220 },
  { id: 'sms-standard', name: 'Standard', quantity: 5000, pricePerUnit: 0.22, total: 1100 },
  { id: 'sms-premium', name: 'Premium', quantity: 10000, pricePerUnit: 0.22, total: 2200 },
  { id: 'sms-custom', name: 'Custom Plan', quantity: 0, pricePerUnit: 0.22, total: 0, isCustom: true },
];

const WHATSAPP_PACKAGES: RechargePackage[] = [
  { id: 'wa-basic', name: 'Basic', quantity: 500, pricePerUnit: 0.50, total: 250 },
  { id: 'wa-standard', name: 'Standard', quantity: 2000, pricePerUnit: 0.45, total: 900 },
  { id: 'wa-premium', name: 'Premium', quantity: 5000, pricePerUnit: 0.40, total: 2000 },
  { id: 'wa-custom', name: 'Custom Plan', quantity: 0, pricePerUnit: 0.50, total: 0, isCustom: true },
];

const EMAIL_PACKAGES: RechargePackage[] = [
  { id: 'em-basic', name: 'Basic', quantity: 2000, pricePerUnit: 0.10, total: 200 },
  { id: 'em-standard', name: 'Standard', quantity: 10000, pricePerUnit: 0.08, total: 800 },
  { id: 'em-premium', name: 'Premium', quantity: 25000, pricePerUnit: 0.06, total: 1500 },
  { id: 'em-custom', name: 'Custom Plan', quantity: 0, pricePerUnit: 0.10, total: 0, isCustom: true },
];

// Default subscription
const DEFAULT_SUBSCRIPTION: CurrentSubscription = {
  planId: 'standard',
  startDate: '2025-01-15',
  endDate: '2026-01-14',
  status: 'active',
  smsBalance: 1245,
  whatsappBalance: 780,
  emailBalance: 3200,
  amountDue: 0,
  lastPaymentDate: '2025-12-15',
};

// ─── Recharge Card ──────────────────────────────────────────

function RechargeCard({
  pkg,
  type,
  onRecharge,
}: {
  pkg: RechargePackage;
  type: 'sms' | 'whatsapp' | 'email';
  onRecharge: (pkg: RechargePackage, qty?: number) => void;
}) {
  const [customQty, setCustomQty] = useState('');

  const typeColors = {
    sms: { bg: 'bg-blue-50', border: 'border-blue-200', btn: 'bg-blue-600 hover:bg-blue-700', dot: 'bg-blue-500' },
    whatsapp: { bg: 'bg-emerald-50', border: 'border-emerald-200', btn: 'bg-emerald-600 hover:bg-emerald-700', dot: 'bg-emerald-500' },
    email: { bg: 'bg-purple-50', border: 'border-purple-200', btn: 'bg-purple-600 hover:bg-purple-700', dot: 'bg-purple-500' },
  };

  const colors = typeColors[type];

  if (pkg.isCustom) {
    const customTotal = customQty ? parseInt(customQty) * pkg.pricePerUnit : 0;
    return (
      <Card className={`border ${colors.border} hover:shadow-lg transition-all duration-300`}>
        <CardContent className="p-5">
          <h4 className="font-bold text-slate-800 text-base mb-4">{pkg.name}</h4>
          <div className="space-y-2.5 mb-5">
            <div className="flex items-center gap-2 text-sm">
              <div className={`h-2 w-2 rounded-full ${colors.dot}`}></div>
              <span className="text-slate-600">Quantity:</span>
              <Input
                type="number"
                placeholder="Enter qty"
                value={customQty}
                onChange={(e) => setCustomQty(e.target.value)}
                className="h-7 w-24 text-xs"
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-amber-500"></div>
              <span className="text-slate-600">Price:</span>
              <span className="font-semibold text-slate-800">₹{pkg.pricePerUnit} /Sms</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-orange-500"></div>
              <span className="text-slate-600">Total:</span>
              <span className="font-semibold text-slate-800">
                {customQty ? `₹${customTotal.toFixed(0)}` : '- Based on usage'}
              </span>
            </div>
          </div>
          <Button
            onClick={() => onRecharge(pkg, parseInt(customQty) || 0)}
            disabled={!customQty || parseInt(customQty) <= 0}
            className={`w-full ${colors.btn} text-white h-9 text-sm font-semibold rounded-lg`}
          >
            Recharge
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border ${colors.border} hover:shadow-lg transition-all duration-300`}>
      <CardContent className="p-5">
        <h4 className="font-bold text-slate-800 text-base mb-4">{pkg.name}</h4>
        <div className="space-y-2.5 mb-5">
          <div className="flex items-center gap-2 text-sm">
            <div className={`h-2 w-2 rounded-full ${colors.dot}`}></div>
            <span className="text-slate-600">Quantity:</span>
            <span className="font-semibold text-slate-800">{pkg.quantity.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-amber-500"></div>
            <span className="text-slate-600">Price:</span>
            <span className="font-semibold text-slate-800">₹{pkg.pricePerUnit} /Sms</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            <span className="text-slate-600">Total:</span>
            <span className="font-semibold text-slate-800">₹{pkg.total.toLocaleString()}</span>
          </div>
        </div>
        <Button
          onClick={() => onRecharge(pkg)}
          className={`w-full ${colors.btn} text-white h-9 text-sm font-semibold rounded-lg`}
        >
          Recharge
        </Button>
      </CardContent>
    </Card>
  );
}

// ─── Main Component ─────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'plan' | 'sms' | 'whatsapp' | 'email' | 'history'>('plan');
  const [subscription, setSubscription] = useState<CurrentSubscription>(DEFAULT_SUBSCRIPTION);
  const [rechargeHistory, setRechargeHistory] = useState<RechargeRecord[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = LocalStorageSync.get<CurrentSubscription>('edu_trio_subscription');
    if (saved) setSubscription(saved);

    const history = LocalStorageSync.get<RechargeRecord[]>('edu_trio_recharge_history');
    if (history) setRechargeHistory(history);
  }, []);

  const currentPlan = PLANS.find(p => p.id === subscription.planId) || PLANS[1];

  const daysRemaining = Math.max(0, Math.ceil(
    (new Date(subscription.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  ));

  const handleRecharge = (pkg: RechargePackage, type: 'sms' | 'whatsapp' | 'email', customQty?: number) => {
    const qty = customQty || pkg.quantity;
    const amount = customQty ? customQty * pkg.pricePerUnit : pkg.total;

    if (qty <= 0) return;

    // Add balance
    const updated = { ...subscription };
    if (type === 'sms') updated.smsBalance += qty;
    else if (type === 'whatsapp') updated.whatsappBalance += qty;
    else updated.emailBalance += qty;

    setSubscription(updated);
    LocalStorageSync.set('edu_trio_subscription', updated);

    // Add to history
    const record: RechargeRecord = {
      id: Date.now().toString(),
      type,
      packageName: pkg.name,
      quantity: qty,
      amount,
      date: new Date().toISOString(),
      status: 'success',
    };
    const newHistory = [record, ...rechargeHistory];
    setRechargeHistory(newHistory);
    LocalStorageSync.set('edu_trio_recharge_history', newHistory);
  };

  const handlePlanUpgrade = (planId: string) => {
    const plan = PLANS.find(p => p.id === planId);
    if (!plan) return;

    const updated: CurrentSubscription = {
      ...subscription,
      planId,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
      smsBalance: subscription.smsBalance + plan.smsIncluded,
      whatsappBalance: subscription.whatsappBalance + plan.whatsappIncluded,
      emailBalance: subscription.emailBalance + plan.emailIncluded,
      amountDue: 0,
      lastPaymentDate: new Date().toISOString().split('T')[0],
    };

    setSubscription(updated);
    LocalStorageSync.set('edu_trio_subscription', updated);

    // Record plan upgrade
    const record: RechargeRecord = {
      id: Date.now().toString(),
      type: 'plan',
      packageName: `Upgraded to ${plan.name}`,
      quantity: 1,
      amount: plan.price,
      date: new Date().toISOString(),
      status: 'success',
    };
    const newHistory = [record, ...rechargeHistory];
    setRechargeHistory(newHistory);
    LocalStorageSync.set('edu_trio_recharge_history', newHistory);
  };

  const handlePayDue = () => {
    const updated = { ...subscription, amountDue: 0, lastPaymentDate: new Date().toISOString().split('T')[0] };
    setSubscription(updated);
    LocalStorageSync.set('edu_trio_subscription', updated);
  };

  const tabs = [
    { id: 'plan' as const, label: 'Current Plan', icon: Crown },
    { id: 'sms' as const, label: 'SMS', icon: Phone },
    { id: 'whatsapp' as const, label: 'WhatsApp', icon: MessageCircle },
    { id: 'email' as const, label: 'E-Mail', icon: Mail },
    { id: 'history' as const, label: 'Recharge History', icon: History },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2.5">
          <Settings className="h-7 w-7 text-indigo-500" />
          Settings & Billing
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Manage your subscription, purchase messaging credits, and handle payments.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-indigo-50/50 p-2 rounded-2xl border border-indigo-100/50 shadow-inner">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
            className={`gap-2 rounded-xl px-5 transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'text-slate-600 hover:bg-white/60 hover:text-indigo-600'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* ══════════════════ TAB: Current Plan ══════════════════ */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          {/* Current Plan Card */}
          <Card className="border-0 shadow-xl glass-card overflow-hidden">
            <div className={`bg-gradient-to-r ${currentPlan.gradient} p-6 text-white`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="h-5 w-5" />
                    <span className="text-sm font-medium opacity-90">Current Plan</span>
                  </div>
                  <h3 className="text-3xl font-bold">{currentPlan.name}</h3>
                  <p className="text-white/80 text-sm mt-1">
                    ₹{currentPlan.price.toLocaleString()}/month • Billed yearly
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`${
                    subscription.status === 'active' ? 'bg-emerald-500' :
                    subscription.status === 'expiring' ? 'bg-amber-500' : 'bg-rose-500'
                  } text-white border-0 px-3 py-1`}>
                    {subscription.status === 'active' ? '● Active' :
                     subscription.status === 'expiring' ? '⚠ Expiring Soon' : '✕ Expired'}
                  </Badge>
                  <span className="text-white/80 text-xs">
                    {daysRemaining} days remaining
                  </span>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* SMS Balance */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700">SMS Balance</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800">{subscription.smsBalance.toLocaleString()}</p>
                </div>
                {/* WhatsApp Balance */}
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-700">WhatsApp</span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-800">{subscription.whatsappBalance.toLocaleString()}</p>
                </div>
                {/* Email Balance */}
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-700">Email</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800">{subscription.emailBalance.toLocaleString()}</p>
                </div>
                {/* Due Amount */}
                <div className={`p-4 rounded-xl border ${
                  subscription.amountDue > 0 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className={`h-4 w-4 ${subscription.amountDue > 0 ? 'text-rose-600' : 'text-emerald-600'}`} />
                    <span className={`text-xs font-semibold ${subscription.amountDue > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                      Amount Due
                    </span>
                  </div>
                  <p className={`text-2xl font-bold ${subscription.amountDue > 0 ? 'text-rose-800' : 'text-emerald-800'}`}>
                    ₹{subscription.amountDue.toLocaleString()}
                  </p>
                  {subscription.amountDue > 0 && (
                    <Button onClick={handlePayDue} size="sm" className="mt-2 bg-rose-600 hover:bg-rose-700 text-white h-7 text-xs w-full">
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>

              {/* Plan details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>Valid: {subscription.startDate} to {subscription.endDate}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CreditCard className="h-4 w-4 text-slate-400" />
                  <span>Last Payment: {subscription.lastPaymentDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Plans */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-indigo-500" />
              Upgrade Your Plan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {PLANS.map(plan => {
                const isCurrent = plan.id === subscription.planId;
                return (
                  <Card
                    key={plan.id}
                    className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                      isCurrent ? 'ring-2 ring-indigo-400' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-400 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                        ⭐ POPULAR
                      </div>
                    )}
                    {isCurrent && (
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-br-xl">
                        CURRENT
                      </div>
                    )}

                    <CardContent className="p-5 pt-8">
                      <div className="text-center mb-4">
                        <div className={`inline-flex h-12 w-12 rounded-xl bg-gradient-to-br ${plan.gradient} items-center justify-center shadow-lg mb-3`}>
                          {plan.id === 'basic' && <Zap className="h-6 w-6 text-white" />}
                          {plan.id === 'standard' && <Star className="h-6 w-6 text-white" />}
                          {plan.id === 'premium' && <Crown className="h-6 w-6 text-white" />}
                          {plan.id === 'enterprise' && <Shield className="h-6 w-6 text-white" />}
                        </div>
                        <h4 className="text-lg font-bold text-slate-800">{plan.name}</h4>
                        <div className="mt-2">
                          <span className="text-3xl font-extrabold text-slate-900">₹{plan.price.toLocaleString()}</span>
                          <span className="text-sm text-slate-500">/mo</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-5">
                        {plan.features.slice(0, 5).map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <Check className={`h-3.5 w-3.5 text-${plan.color}-500 shrink-0`} />
                            <span>{feat}</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-slate-100 space-y-1.5">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>SMS included</span>
                            <span className="font-semibold text-slate-700">{plan.smsIncluded.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>WhatsApp included</span>
                            <span className="font-semibold text-slate-700">{plan.whatsappIncluded.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => !isCurrent && handlePlanUpgrade(plan.id)}
                        disabled={isCurrent}
                        className={`w-full h-10 font-bold text-sm rounded-xl transition-all ${
                          isCurrent
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                            : `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl hover:scale-[1.02]`
                        }`}
                      >
                        {isCurrent ? 'Current Plan' : 'Upgrade'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════ TAB: SMS ══════════════════ */}
      {activeTab === 'sms' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-500" />
              SMS Recharge Plans
            </h3>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
              Balance: {subscription.smsBalance.toLocaleString()} SMS
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SMS_PACKAGES.map(pkg => (
              <RechargeCard
                key={pkg.id}
                pkg={pkg}
                type="sms"
                onRecharge={(p, qty) => handleRecharge(p, 'sms', qty)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════ TAB: WhatsApp ══════════════════ */}
      {activeTab === 'whatsapp' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-emerald-500" />
              WhatsApp Recharge Plans
            </h3>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
              Balance: {subscription.whatsappBalance.toLocaleString()} Messages
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHATSAPP_PACKAGES.map(pkg => (
              <RechargeCard
                key={pkg.id}
                pkg={pkg}
                type="whatsapp"
                onRecharge={(p, qty) => handleRecharge(p, 'whatsapp', qty)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════ TAB: Email ══════════════════ */}
      {activeTab === 'email' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-500" />
              Email Recharge Plans
            </h3>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
              Balance: {subscription.emailBalance.toLocaleString()} Emails
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {EMAIL_PACKAGES.map(pkg => (
              <RechargeCard
                key={pkg.id}
                pkg={pkg}
                type="email"
                onRecharge={(p, qty) => handleRecharge(p, 'email', qty)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════ TAB: History ══════════════════ */}
      {activeTab === 'history' && (
        <Card className="border-0 shadow-xl glass-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <History className="h-5 w-5 text-indigo-500" />
              Recharge History
            </CardTitle>
            <CardDescription>All your past recharges and plan upgrades</CardDescription>
          </CardHeader>
          <CardContent>
            {rechargeHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                  <History className="h-8 w-8 text-slate-300" />
                </div>
                <p className="text-sm font-semibold text-slate-500">No recharge history yet</p>
                <p className="text-xs text-slate-400 mt-1">Your purchases will appear here</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {rechargeHistory.map(record => {
                  const typeIcon = record.type === 'sms' ? Phone :
                                   record.type === 'whatsapp' ? MessageCircle :
                                   record.type === 'email' ? Mail : Crown;
                  const typeColor = record.type === 'sms' ? 'blue' :
                                    record.type === 'whatsapp' ? 'emerald' :
                                    record.type === 'email' ? 'purple' : 'amber';
                  const TypeIcon = typeIcon;

                  return (
                    <div key={record.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-xl bg-${typeColor}-100 flex items-center justify-center`}>
                          <TypeIcon className={`h-5 w-5 text-${typeColor}-600`} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{record.packageName}</p>
                          <p className="text-xs text-slate-500">
                            {record.type.toUpperCase()} • {record.quantity.toLocaleString()} credits •{' '}
                            {new Date(record.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-800">₹{record.amount.toLocaleString()}</p>
                        <Badge className={`text-[10px] px-2 py-0 ${
                          record.status === 'success' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                          record.status === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                          'bg-rose-100 text-rose-700 border-rose-200'
                        }`}>
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
