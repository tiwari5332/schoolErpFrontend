export interface FeeTransaction {
  id: string;
  date: string;
  amount: number;
  method: string;
  remarks: string;
}

export interface FeeBreakdown {
  tuition: number;
  transport: number;
  library: number;
  miscellaneous: number;
  discount: number;
  lateFee: number;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  totalAmount: number;
  amountPaid: number;
  balance: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  avatar: string;
  breakdown: FeeBreakdown;
  transactions: FeeTransaction[];
}

export const INITIAL_FEE_RECORDS: FeeRecord[] = [
  {
    id: 'FEE001',
    studentId: 'STU001',
    studentName: 'Alice Johnson',
    className: '10A',
    totalAmount: 5000,
    amountPaid: 5000,
    balance: 0,
    dueDate: '2024-03-01',
    status: 'Paid',
    avatar: '',
    breakdown: { tuition: 3000, transport: 1000, library: 500, miscellaneous: 500, discount: 0, lateFee: 0 },
    transactions: [
      { id: 'TRX1001', date: '2024-02-15T10:30:00Z', amount: 2000, method: 'Card', remarks: 'First installment' },
      { id: 'TRX1002', date: '2024-02-28T14:20:00Z', amount: 3000, method: 'Bank Transfer', remarks: 'Final installment' }
    ]
  },
  {
    id: 'FEE002',
    studentId: 'STU002',
    studentName: 'Bob Smith',
    className: '9B',
    totalAmount: 4300,
    amountPaid: 2000,
    balance: 2300,
    dueDate: '2024-04-15',
    status: 'Pending',
    avatar: '',
    breakdown: { tuition: 3000, transport: 1000, library: 300, miscellaneous: 200, discount: 200, lateFee: 0 },
    transactions: [
      { id: 'TRX1003', date: '2024-04-01T09:15:00Z', amount: 2000, method: 'Cash', remarks: 'Partial payment' }
    ]
  },
  {
    id: 'FEE003',
    studentId: 'STU003',
    studentName: 'Charlie Brown',
    className: '8C',
    totalAmount: 4200,
    amountPaid: 0,
    balance: 4200,
    dueDate: '2024-02-15',
    status: 'Overdue',
    avatar: '',
    breakdown: { tuition: 2500, transport: 1000, library: 500, miscellaneous: 0, discount: 0, lateFee: 200 },
    transactions: []
  },
  {
    id: 'FEE004',
    studentId: 'STU004',
    studentName: 'Diana Prince',
    className: '10A',
    totalAmount: 4500,
    amountPaid: 4500,
    balance: 0,
    dueDate: '2024-03-01',
    status: 'Paid',
    avatar: '',
    breakdown: { tuition: 3000, transport: 1000, library: 500, miscellaneous: 500, discount: 500, lateFee: 0 },
    transactions: [
      { id: 'TRX1004', date: '2024-02-20T11:00:00Z', amount: 4500, method: 'UPI', remarks: 'Full payment with sibling discount' }
    ]
  },
  {
    id: 'FEE005',
    studentId: 'STU005',
    studentName: 'Evan Wright',
    className: '11A',
    totalAmount: 6000,
    amountPaid: 3000,
    balance: 3000,
    dueDate: '2024-05-10',
    status: 'Pending',
    avatar: '',
    breakdown: { tuition: 4000, transport: 1000, library: 500, miscellaneous: 500, discount: 0, lateFee: 0 },
    transactions: [
      { id: 'TRX1005', date: '2024-04-20T16:45:00Z', amount: 3000, method: 'Bank Transfer', remarks: 'Half payment' }
    ]
  }
];

export const FEE_STATUSES = ['Paid', 'Pending', 'Overdue'];
export const CLASSES = ['8C', '9B', '10A', '11A', '12A'];
export const MONTHS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];
