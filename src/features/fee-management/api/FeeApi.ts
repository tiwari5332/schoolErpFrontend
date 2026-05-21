import ApiService, { delay } from '../../../services/ApiService';
import { 
  FeeRecord, 
  FeeBreakdown, 
  FeeTransaction, 
  INITIAL_FEE_RECORDS 
} from '../Constants';

const USE_MOCK = true;

export const FeeApi = {
  getFees: async (): Promise<FeeRecord[]> => {
    if (USE_MOCK) {
      await delay(500);
      return [...INITIAL_FEE_RECORDS];
    }
    return await ApiService.get<FeeRecord[]>('/fees');
  },

  getFeeById: async (id: string): Promise<FeeRecord | undefined> => {
    if (USE_MOCK) {
      await delay(300);
      return INITIAL_FEE_RECORDS.find(f => f.id === id);
    }
    return await ApiService.get<FeeRecord>(`/fees/${id}`);
  },

  processPayment: async (feeId: string, amount: number, method: string): Promise<FeeRecord> => {
    if (USE_MOCK) {
      await delay(600);
      const record = INITIAL_FEE_RECORDS.find(f => f.id === feeId);
      if (!record) throw new Error("Fee record not found");
      
      const newTransaction: FeeTransaction = {
        id: `TRX${Date.now()}`,
        date: new Date().toISOString(),
        amount,
        method,
        remarks: 'Processed via API Mock'
      };

      const updatedRecord = {
        ...record,
        amountPaid: record.amountPaid + amount,
        balance: record.balance - amount,
        status: (record.balance - amount <= 0) ? 'Paid' : 'Pending',
        transactions: [...record.transactions, newTransaction]
      };
      
      return updatedRecord as FeeRecord;
    }
    return await ApiService.post<FeeRecord>(`/fees/${feeId}/pay`, { amount, method });
  }
};
