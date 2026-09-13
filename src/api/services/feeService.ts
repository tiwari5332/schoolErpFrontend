import httpClient from '../httpClient';
import { LocalStorageSync } from '../../services/LocalStorageSync';

export interface FeeRecordDTO {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  totalAmount: number;
  amountPaid: number;
  balance: number;
  status: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  dueDate: string;
  lastPaymentDate?: string;
  paymentHistory?: any[];
  [key: string]: any;
}

export const feeService = {
  async getFees(params: Record<string, any> = {}): Promise<FeeRecordDTO[]> {
    try {
      const res = await httpClient.get<FeeRecordDTO[]>('/api/v1/fees', { params });
      return res.data;
    } catch {
      return LocalStorageSync.get<FeeRecordDTO[]>('edu_trio_fees') || [];
    }
  },

  async createFeeRecord(record: Omit<FeeRecordDTO, 'id'>): Promise<FeeRecordDTO> {
    try {
      const res = await httpClient.post<FeeRecordDTO>('/api/v1/fees', record);
      return res.data;
    } catch {
      const stored = LocalStorageSync.get<FeeRecordDTO[]>('edu_trio_fees') || [];
      const newRecord = { ...record, id: `FEE${Date.now()}` } as FeeRecordDTO;
      LocalStorageSync.set('edu_trio_fees', [...stored, newRecord]);
      return newRecord;
    }
  },
};

export default feeService;
