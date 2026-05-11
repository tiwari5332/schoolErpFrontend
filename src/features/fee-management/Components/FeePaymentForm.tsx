import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FeeRecord, FeeTransaction } from '../Constants';

interface FeePaymentFormProps {
  record?: FeeRecord;
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: FeeRecord) => void;
}

export function FeePaymentForm({ record, isOpen, onClose, onSave }: FeePaymentFormProps) {
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash');
  const [remarks, setRemarks] = useState<string>('');
  const [applyDiscount, setApplyDiscount] = useState<string>('0');
  const [applyLateFee, setApplyLateFee] = useState<string>('0');

  useEffect(() => {
    if (isOpen && record) {
      setPaymentAmount('');
      setPaymentMethod('Cash');
      setRemarks('');
      setApplyDiscount('0');
      
      const isOverdue = new Date() > new Date(record.dueDate) && record.balance > 0;
      const suggestedLateFee = isOverdue ? 100 : 0;
      // Use existing late fee if present, else suggest one
      setApplyLateFee((record.breakdown.lateFee > 0 ? record.breakdown.lateFee : suggestedLateFee).toString());
    }
  }, [isOpen, record]);

  const currentBalance = record ? record.balance : 0;
  const discountAmount = Number(applyDiscount) || 0;
  const lateFeeAmount = Number(applyLateFee) || 0;
  
  // Calculate effective dues considering new discounts/late fees
  const oldDiscount = record?.breakdown.discount || 0;
  const oldLateFee = record?.breakdown.lateFee || 0;
  
  const additionalDiscount = discountAmount - oldDiscount;
  const additionalLateFee = lateFeeAmount - oldLateFee;
  
  const effectiveDues = currentBalance - additionalDiscount + additionalLateFee;

  const handleSave = () => {
    if (!record) return;

    const amount = Number(paymentAmount);
    if (isNaN(amount) || amount <= 0) return;

    // The new total amount required for the term
    const newTotalAmount = record.totalAmount - additionalDiscount + additionalLateFee;
    const newAmountPaid = record.amountPaid + amount;
    const newBalance = Math.max(0, newTotalAmount - newAmountPaid);
    
    const newStatus = newBalance === 0 ? 'Paid' : (new Date() > new Date(record.dueDate) ? 'Overdue' : 'Pending');

    const newTransaction: FeeTransaction = {
      id: `TRX${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString(),
      amount: amount,
      method: paymentMethod,
      remarks: remarks || 'Payment received'
    };

    const updatedRecord: FeeRecord = {
      ...record,
      totalAmount: newTotalAmount,
      amountPaid: newAmountPaid,
      balance: newBalance,
      status: newStatus as 'Paid' | 'Pending' | 'Overdue',
      breakdown: {
        ...record.breakdown,
        discount: discountAmount,
        lateFee: lateFeeAmount
      },
      transactions: [...(record.transactions || []), newTransaction]
    };

    onSave(updatedRecord);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md glass-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            Record Fee Payment
          </DialogTitle>
          <DialogDescription>
            {record ? `Enter payment details for ${record.studentName} (${record.studentId})` : 'Select a student to record payment'}
          </DialogDescription>
        </DialogHeader>
        {record && (
          <div className="space-y-6 py-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Current Balance:</span>
                <span className="font-medium">₹{record.balance.toLocaleString()}</span>
              </div>
              {(additionalDiscount > 0 || additionalLateFee > 0 || oldDiscount > 0 || oldLateFee > 0) && (
                <>
                  <div className="flex justify-between items-center text-emerald-600">
                    <span className="text-sm">Total Discount:</span>
                    <span className="text-sm">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-rose-500">
                    <span className="text-sm">Late Fees:</span>
                    <span className="text-sm">+₹{lateFeeAmount.toLocaleString()}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between items-center pt-2 border-t mt-1">
                <p className="text-sm font-semibold text-slate-700">Effective Dues</p>
                <p className="text-xl font-bold text-rose-600">₹{effectiveDues.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount" className="text-sm font-medium text-emerald-600">Add Discount (₹)</Label>
                <Input 
                  id="discount" 
                  type="number"
                  placeholder="0" 
                  className="h-10 border-slate-200 focus:border-emerald-300 focus:ring-emerald-100" 
                  value={applyDiscount}
                  onChange={(e) => setApplyDiscount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lateFee" className="text-sm font-medium text-rose-500">Apply Late Fee (₹)</Label>
                <Input 
                  id="lateFee" 
                  type="number"
                  placeholder="0" 
                  className="h-10 border-slate-200 focus:border-rose-300 focus:ring-rose-100" 
                  value={applyLateFee}
                  onChange={(e) => setApplyLateFee(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">Payment Amount (₹) *</Label>
                <Input 
                  id="amount" 
                  type="number"
                  placeholder={`Max: ₹${effectiveDues}`} 
                  className="h-10 border-slate-200 focus:border-emerald-300 focus:ring-emerald-100" 
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  max={effectiveDues}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="method" className="text-sm font-medium">Payment Method *</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="h-10 border-slate-200 focus:border-emerald-300">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Card">Credit/Debit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks" className="text-sm font-medium">Remarks</Label>
                <Textarea 
                  id="remarks" 
                  placeholder="Enter any additional notes..." 
                  rows={2} 
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="border-slate-200 focus:border-emerald-300 focus:ring-emerald-100"
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="gradient-emerald text-white shadow-colored-emerald"
            disabled={!paymentAmount || Number(paymentAmount) <= 0 || Number(paymentAmount) > effectiveDues}
          >
            Record Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
