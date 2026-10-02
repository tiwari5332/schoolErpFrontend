/**
 * Fee Management Module - Domain Type Definitions
 */

export type FeeHeadType = 'TUITION' | 'TRANSPORT' | 'LIBRARY' | 'LABORATORY' | 'EXAMINATION' | 'MISCELLANEOUS';

export interface FeeHead {
  id: string;
  code: string;
  name: string;
  type: FeeHeadType;
  description?: string;
  isActive: boolean;
  isTaxable?: boolean;
}

export interface FeeStructureItem {
  feeHeadId: string;
  feeHeadName: string;
  amountPaise: number; // Stored in Paise internally
}

export interface FeeStructure {
  id: string;
  academicYear: string; // e.g. "2026-27"
  className: string;
  items: FeeStructureItem[];
  totalAmountPaise: number;
  termType: 'ANNUAL' | 'TERM_WISE' | 'MONTHLY';
  isProratedForMidYear?: boolean;
}

export interface InstallmentRow {
  id: string;
  name: string;
  dueDate: string;
  percentage: number;
  amountPaise: number;
}

export interface InstallmentPlan {
  id: string;
  academicYear: string;
  className: string;
  installments: InstallmentRow[];
  totalPercentage: number;
}

export interface TransportRoute {
  id: string;
  routeName: string;
  distanceKm: string;
  monthlyAmountPaise: number;
  annualAmountPaise: number;
}

export type ConcessionCategory = 
  | 'MERIT' 
  | 'SIBLING' 
  | 'EWS' 
  | 'STAFF_WARD' 
  | 'DEFENSE_QUOTA' 
  | 'RTE' 
  | 'BPL';

export interface ConcessionRule {
  id: string;
  code: string;
  name: string;
  category: ConcessionCategory;
  discountType: 'PERCENTAGE' | 'FIXED';
  value: number; // percentage (e.g. 25) or amount in Paise
  applicableFeeHeadIds: string[];
  isActive: boolean;
}

export interface StudentConcessionAssignment {
  id: string;
  studentId: string;
  studentName: string;
  concessionRuleId: string;
  concessionName: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  value: number;
  reason: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  approverComments?: string;
  approvedBy?: string;
  createdAt: string;
}

export interface InvoiceLine {
  id: string;
  feeHeadId: string;
  feeHeadName: string;
  amountPaise: number;
  discountPaise: number;
  netAmountPaise: number;
}

export type InvoiceStatus = 'PAID' | 'PARTIAL' | 'OVERDUE' | 'UNPAID';

export interface Invoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  className: string;
  section: string;
  academicYear: string;
  installmentName: string;
  dueDate: string;
  lines: InvoiceLine[];
  subtotalPaise: number;
  discountPaise: number;
  lateFeePaise: number;
  totalPaise: number;
  paidPaise: number;
  balancePaise: number;
  status: InvoiceStatus;
  hasBouncedCheque?: boolean;
  createdAt: string;
}

export type PaymentMode = 'CASH' | 'CHEQUE' | 'DD' | 'NEFT' | 'UPI' | 'CARD' | 'NET_BANKING';

export interface PaymentAllocation {
  feeHeadId: string;
  feeHeadName: string;
  allocatedAmountPaise: number;
}

export interface Payment {
  id: string;
  paymentNo: string;
  invoiceId: string;
  studentId: string;
  studentName: string;
  amountPaise: number;
  paymentMode: PaymentMode;
  paymentDate: string;
  referenceNo?: string;
  chequeNo?: string;
  bankName?: string;
  chequeDate?: string;
  remarks?: string;
  allocations: PaymentAllocation[];
  status: 'SUCCESS' | 'CHEQUE_PENDING' | 'CHEQUE_BOUNCED' | 'FAILED';
  collectedBy: string;
}

export interface Receipt {
  id: string;
  receiptNo: string;
  paymentId: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  className: string;
  amountPaise: number;
  paymentMode: PaymentMode;
  date: string;
  amountInWords: string;
}

export interface ChequeRecord {
  id: string;
  chequeNo: string;
  bankName: string;
  chequeDate: string;
  amountPaise: number;
  studentId: string;
  studentName: string;
  paymentId: string;
  status: 'PENDING' | 'CLEARED' | 'BOUNCED';
  clearanceDate?: string;
  bounceReason?: string;
}

export interface LateFeeRule {
  id: string;
  graceDays: number;
  calculationType: 'FLAT' | 'PER_DAY' | 'PERCENTAGE';
  rate: number;
  monthlyCapPaise: number;
  applicableFeeHeadIds: string[];
}

export interface RefundRequest {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  reason: string;
  calculatedRefundPaise: number;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
  approverComments?: string;
  createdAt: string;
}

export interface ReminderTemplate {
  id: string;
  title: string;
  templateText: string;
  channels: ('WHATSAPP' | 'SMS' | 'IN_APP' | 'EMAIL')[];
}

export interface ReminderLog {
  id: string;
  studentId: string;
  studentName: string;
  sentAt: string;
  channel: string;
  status: 'SENT' | 'DELIVERED' | 'FAILED';
  messageSnippet: string;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  entity: string;
  entityId: string;
  beforeState?: Record<string, any>;
  afterState?: Record<string, any>;
}
