import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FeeRecord } from '../Constants';
import { Printer } from 'lucide-react';
import { EduTrioLogoSimple } from "@/components/EduTrioLogo";

interface FeeReceiptModalProps {
  record?: FeeRecord;
  isOpen: boolean;
  onClose: () => void;
}

export function FeeReceiptModal({ record, isOpen, onClose }: FeeReceiptModalProps) {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  const receiptDate = new Date().toLocaleDateString();
  const receiptNo = `REC-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-2xl p-0 overflow-hidden border border-slate-200/80 shadow-2xl">
        <DialogHeader className="p-5 border-b border-slate-100 print:hidden flex flex-row items-center justify-between">
          <DialogTitle className="text-base font-bold text-slate-900">Fee Receipt</DialogTitle>
          <div className="flex gap-2 mr-6">
            <Button variant="outline" size="sm" className="gap-1.5 rounded-xl h-9 text-xs border-slate-200" onClick={handlePrint}>
              <Printer className="h-3.5 w-3.5" />
              Print / Save PDF
            </Button>
          </div>
        </DialogHeader>

        {/* Printable Area */}
        <div id="receipt-printable-area" className="p-8 bg-white max-h-[75vh] overflow-y-auto">
          {/* School Header */}
          <div className="flex justify-between items-center border-b-2 border-slate-200 pb-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-50 rounded-xl">
                <EduTrioLogoSimple size="lg" className="drop-shadow-sm" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">EduTrio International School</h1>
                <p className="text-xs text-slate-500">123 Education Boulevard, Knowledge City, 10001</p>
                <p className="text-xs text-slate-500">Phone: +1 234-567-8900 | Email: accounts@edutrio.edu</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-black text-slate-300 uppercase tracking-widest">Receipt</h2>
              <div className="mt-1">
                <p className="text-xs font-semibold text-slate-900">Receipt No: <span className="font-normal text-slate-600">{receiptNo}</span></p>
                <p className="text-xs font-semibold text-slate-900">Date: <span className="font-normal text-slate-600">{receiptDate}</span></p>
              </div>
            </div>
          </div>

          {/* Student Details */}
          <div className="grid grid-cols-2 gap-6 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Student Details</p>
              <h3 className="text-base font-bold text-slate-900">{record.studentName}</h3>
              <p className="text-xs text-slate-600">Student ID: {record.studentId}</p>
              <p className="text-xs text-slate-600">Class: {record.className}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Fee Status</p>
              <h3 className={`text-base font-bold ${record.balance === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {record.balance === 0 ? 'Fully Paid' : 'Balance Pending'}
              </h3>
              <p className="text-xs text-slate-600">Total Due: ₹{record.totalAmount.toLocaleString()}</p>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1.5 uppercase tracking-wider">Fee Breakdown</h4>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-2 font-semibold">Description</th>
                  <th className="pb-2 font-semibold text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 text-slate-700">Tuition Fee</td>
                  <td className="py-2.5 text-right font-medium text-slate-900">{record.breakdown.tuition.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-700">Transport Fee</td>
                  <td className="py-2.5 text-right font-medium text-slate-900">{record.breakdown.transport.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-700">Library Fee</td>
                  <td className="py-2.5 text-right font-medium text-slate-900">{record.breakdown.library.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-2.5 text-slate-700">Miscellaneous</td>
                  <td className="py-2.5 text-right font-medium text-slate-900">{record.breakdown.miscellaneous.toLocaleString()}</td>
                </tr>
                {record.breakdown.lateFee > 0 && (
                  <tr>
                    <td className="py-2.5 text-rose-600 font-semibold">Late Fee</td>
                    <td className="py-2.5 text-right font-semibold text-rose-600">+{record.breakdown.lateFee.toLocaleString()}</td>
                  </tr>
                )}
                {record.breakdown.discount > 0 && (
                  <tr>
                    <td className="py-2.5 text-emerald-600 font-semibold">Discount / Concession</td>
                    <td className="py-2.5 text-right font-semibold text-emerald-600">-{record.breakdown.discount.toLocaleString()}</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-800">
                  <td className="py-2.5 font-bold text-slate-900">Total Amount Payable</td>
                  <td className="py-2.5 text-right font-bold text-slate-900">₹{record.totalAmount.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Recent Transactions */}
          {record.transactions && record.transactions.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1.5 uppercase tracking-wider">Payment History</h4>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200">
                    <th className="pb-2 font-semibold">Date</th>
                    <th className="pb-2 font-semibold">Method</th>
                    <th className="pb-2 font-semibold">Remarks</th>
                    <th className="pb-2 font-semibold text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {record.transactions.map((trx) => (
                    <tr key={trx.id}>
                      <td className="py-2 text-slate-700">{new Date(trx.date).toLocaleDateString()}</td>
                      <td className="py-2 text-slate-700">{trx.method}</td>
                      <td className="py-2 text-slate-500 italic">{trx.remarks}</td>
                      <td className="py-2 text-right font-semibold text-emerald-600">+{trx.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Summary Totals */}
          <div className="flex justify-end pt-3 border-t-2 border-slate-200">
            <div className="w-64 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Total Amount:</span>
                <span className="font-semibold text-slate-900">₹{record.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Total Paid:</span>
                <span className="font-semibold text-emerald-600">₹{record.amountPaid.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-200">
                <span className="text-slate-900">Balance Due:</span>
                <span className="text-rose-600">₹{record.balance.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Footer Signatures */}
          <div className="mt-12 flex justify-between items-end border-t border-slate-200 pt-6">
            <div className="text-center w-40">
              <div className="border-b border-slate-400 h-6 mb-1"></div>
              <p className="text-[10px] text-slate-500">Parent/Guardian Signature</p>
            </div>
            <div className="text-center w-40">
              <div className="border-b border-slate-400 h-6 mb-1 relative">
                <span className="absolute bottom-0.5 right-0 left-0 text-slate-300 italic text-base select-none">Authorized</span>
              </div>
              <p className="text-[10px] text-slate-500">Authorized Signatory</p>
            </div>
          </div>

          <div className="mt-6 text-center text-[10px] text-slate-400">
            This is a computer generated document and does not require a physical signature.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
