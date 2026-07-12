import ApiService, { delay } from '../../../services/ApiService';
import { 
  FeeRecord, 
  FeeBreakdown, 
  FeeTransaction 
} from '../Constants';
import { LocalStorageSync } from '../../../services/LocalStorageSync';

const USE_MOCK = true;

export const FeeApi = {
  getFees: async (): Promise<FeeRecord[]> => {
    if (USE_MOCK) {
      await delay(500);
      const data = LocalStorageSync.get<FeeRecord[]>("edu_trio_fees");
      return data || [];
    }
    return await ApiService.get<FeeRecord[]>('/fees');
  },

  getFeeById: async (id: string): Promise<FeeRecord | undefined> => {
    if (USE_MOCK) {
      await delay(300);
      const data = LocalStorageSync.get<FeeRecord[]>("edu_trio_fees") || [];
      return data.find(f => f.id === id);
    }
    return await ApiService.get<FeeRecord>(`/fees/${id}`);
  },

  processPayment: async (feeId: string, amount: number, method: string): Promise<FeeRecord> => {
    if (USE_MOCK) {
      await delay(600);
      const list = LocalStorageSync.get<FeeRecord[]>("edu_trio_fees") || [];
      const recordIndex = list.findIndex(f => f.id === feeId);
      if (recordIndex === -1) throw new Error("Fee record not found");
      const record = list[recordIndex];
      
      const newTransaction: FeeTransaction = {
        id: `TRX${Date.now()}`,
        date: new Date().toISOString(),
        amount,
        method,
        remarks: 'Processed via API Mock'
      };

      const updatedRecord: FeeRecord = {
        ...record,
        amountPaid: record.amountPaid + amount,
        balance: Math.max(0, record.balance - amount),
        status: (record.balance - amount <= 0) ? 'Paid' : 'Pending',
        transactions: [...(record.transactions || []), newTransaction]
      };

      list[recordIndex] = updatedRecord;
      LocalStorageSync.set("edu_trio_fees", list);

      // Sync feeStatus to edu_trio_students
      const studentId = record.studentId;
      const students = LocalStorageSync.get<any[]>("edu_trio_students") || [];
      const studentIndex = students.findIndex(s => s.id === studentId);
      if (studentIndex !== -1) {
        students[studentIndex].feeStatus = updatedRecord.status;
        LocalStorageSync.set("edu_trio_students", students);
      }
      
      return updatedRecord;
    }
    return await ApiService.post<FeeRecord>(`/fees/${feeId}/pay`, { amount, method });
  }
};
