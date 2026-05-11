import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { FeeRecord, INITIAL_FEE_RECORDS } from '../../features/fee-management/Constants';
import { FeeStats } from '../../features/fee-management/Components/FeeStats';
import { FeeFilters } from '../../features/fee-management/Components/FeeFilters';
import { FeeTable } from '../../features/fee-management/Components/FeeTable';
import { FeePaymentForm } from '../../features/fee-management/Components/FeePaymentForm';
import { FeeReceiptModal } from '../../features/fee-management/Components/FeeReceiptModal';

export default function FeeManagementPage() {
  const [records, setRecords] = useState<FeeRecord[]>(INITIAL_FEE_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | undefined>(undefined);
  
  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
    const matchesClass = selectedClass === 'all' || record.className === `${selectedClass}`;
    const matchesMonth = selectedMonth === 'all' || new Date(record.dueDate).getMonth() + 1 === parseInt(selectedMonth);
    
    return matchesSearch && matchesStatus && matchesClass && matchesMonth;
  });

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredRecords.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRecords.map(r => r.id));
    }
  };

  const handleBulkRemind = () => {
    alert(`Successfully sent reminders to ${selectedIds.length} student(s) via Email and SMS.`);
    setSelectedIds([]); // Clear selection after action
  };

  const handleRecordPayment = (record: FeeRecord) => {
    setSelectedRecord(record);
    setIsPaymentFormOpen(true);
  };

  const handleViewReceipt = (record: FeeRecord) => {
    setSelectedRecord(record);
    setIsReceiptModalOpen(true);
  };

  const handleSendReminder = (record: FeeRecord) => {
    // In a real app, this would dispatch an API call
    alert(`Reminder sent successfully to ${record.studentName}'s parents via Email and SMS.`);
  };

  const handleSavePayment = (updatedRecord: FeeRecord) => {
    setRecords(records.map(r => r.id === updatedRecord.id ? updatedRecord : r));
    setIsPaymentFormOpen(false);
    setSelectedRecord(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center print:hidden">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Fee Management</h2>
          <p className="text-sm text-slate-500 mt-1">Manage student fee payments and track dues</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200">
            <Download className="h-4 w-4 text-amber-500" />
            Export Report
          </Button>
          <Button 
            className="gap-2 gradient-amber text-white shadow-colored-amber hover:scale-[1.02] transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="print:hidden space-y-6">
        <FeeStats records={records} />

        <FeeFilters 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          selectedStatus={selectedStatus} 
          onStatusChange={setSelectedStatus}
          selectedClass={selectedClass}
          onClassChange={setSelectedClass}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </div>

      <FeeTable 
        records={filteredRecords} 
        onRecordPayment={handleRecordPayment} 
        onViewReceipt={handleViewReceipt} 
        onSendReminder={handleSendReminder}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onBulkRemind={handleBulkRemind}
      />

      <FeePaymentForm 
        record={selectedRecord} 
        isOpen={isPaymentFormOpen} 
        onClose={() => setIsPaymentFormOpen(false)} 
        onSave={handleSavePayment} 
      />

      <FeeReceiptModal
        record={selectedRecord}
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
      />
    </div>
  );
}
