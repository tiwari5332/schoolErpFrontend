import { useState, useEffect } from 'react';
import { FeeRecord } from '../Constants';
import { FeeApi } from '../api/FeeApi';
import { LocalStorageSync } from '../../../services/LocalStorageSync';

export function useFeeManagement() {
  const [records, setRecords] = useState<FeeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | undefined>(undefined);
  
  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        setIsLoading(true);
        const data = await FeeApi.getFees();
        setRecords(data);
      } catch (error) {
        console.error("Failed to fetch fees", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFees();
  }, []);

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

  const handleSavePayment = async (updatedRecord: FeeRecord) => {
    const updated = records.map(r => r.id === updatedRecord.id ? updatedRecord : r);
    setRecords(updated);
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
  };
}
