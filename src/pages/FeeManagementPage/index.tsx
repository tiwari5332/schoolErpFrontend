import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { FeeRecord } from '../../features/fee-management/Constants';
import { useFeeManagement } from '../../features/fee-management/hooks/useFeeManagement';
import { FeeStats } from '../../features/fee-management/Components/FeeStats';
import { FeeFilters } from '../../features/fee-management/Components/FeeFilters';
import { FeeTable } from '../../features/fee-management/Components/FeeTable';
import { FeePaymentForm } from '../../features/fee-management/Components/FeePaymentForm';
import { FeeReceiptModal } from '../../features/fee-management/Components/FeeReceiptModal';

export default function FeeManagementPage() {
  const {
    records,
    filteredRecords,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedClass,
    setSelectedClass,
    selectedMonth,
    setSelectedMonth,
    isPaymentFormOpen,
    setIsPaymentFormOpen,
    isReceiptModalOpen,
    setIsReceiptModalOpen,
    selectedRecord,
    selectedIds,
    handleToggleSelect,
    handleToggleSelectAll,
    handleBulkRemind,
    handleRecordPayment,
    handleViewReceipt,
    handleSendReminder,
    handleSavePayment
  } = useFeeManagement();

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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      ) : (
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
      )}

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
