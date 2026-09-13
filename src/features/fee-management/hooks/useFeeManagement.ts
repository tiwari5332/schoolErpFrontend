import { useState, useMemo } from 'react';
import { FeeRecord } from '../Constants';
import { useFeesList } from '../../../api/queries/useFeesQuery';
import { useUIFilters } from '../../../store';
import { LocalStorageSync } from '../../../services/LocalStorageSync';

export function useFeeManagement() {
  const { searchQuery, setSearchQuery } = useUIFilters();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  
  const { fees, isLoading } = useFeesList();
  
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | undefined>(undefined);
  
  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const safeFees = useMemo(() => Array.isArray(fees) ? (fees as FeeRecord[]) : [], [fees]);

  const filteredRecords = useMemo(() => {
    return safeFees.filter(record => {
      if (!record) return false;
      const studentName = record.studentName || '';
      const studentId = record.studentId || '';
      const query = (searchQuery || '').toLowerCase();

      const matchesSearch = studentName.toLowerCase().includes(query) ||
                           studentId.toLowerCase().includes(query);
      const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;
      const matchesClass = selectedClass === 'all' || record.className === `${selectedClass}`;
      const matchesMonth = selectedMonth === 'all' || (record.dueDate ? new Date(record.dueDate).getMonth() + 1 === parseInt(selectedMonth) : false);
      
      return matchesSearch && matchesStatus && matchesClass && matchesMonth;
    });
  }, [safeFees, searchQuery, selectedStatus, selectedClass, selectedMonth]);

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
    alert(`Reminder sent successfully to ${record.studentName}'s parents via Email and SMS.`);
  };

  const handleSavePayment = async (updatedRecord: FeeRecord) => {
    const updated = (fees as FeeRecord[]).map(r => r.id === updatedRecord.id ? updatedRecord : r);
    LocalStorageSync.set("edu_trio_fees", updated);

    // Sync student status in edu_trio_students
    const students = LocalStorageSync.get<any[]>("edu_trio_students") || [];
    const studentIndex = students.findIndex(s => s.id === updatedRecord.studentId);
    if (studentIndex !== -1) {
      students[studentIndex].feeStatus = updatedRecord.status;
      LocalStorageSync.set("edu_trio_students", students);
    }

    setIsPaymentFormOpen(false);
    setSelectedRecord(undefined);
  };

  return {
    records: safeFees,
    filteredRecords,
    isLoading,
    searchTerm: searchQuery,
    setSearchTerm: setSearchQuery,
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
  };
}
