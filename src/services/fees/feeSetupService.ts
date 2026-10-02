import { FeeHead, FeeStructure, InstallmentPlan, TransportRoute } from './types';

// Mock storage for fee setup configuration
let mockFeeHeads: FeeHead[] = [
  { id: 'fh-1', code: 'TUIT', name: 'Tuition Fee', type: 'TUITION', description: 'Academic tuition fee per term', isActive: true },
  { id: 'fh-2', code: 'TRNS', name: 'Transport Fee', type: 'TRANSPORT', description: 'School bus transport fare', isActive: true },
  { id: 'fh-3', code: 'LIBR', name: 'Library & Digital Lab', type: 'LIBRARY', description: 'Access to library books and e-learning resources', isActive: true },
  { id: 'fh-4', code: 'LAB', name: 'Science & Computer Lab', type: 'LABORATORY', description: 'Laboratory consumables and equipment maintenance', isActive: true },
  { id: 'fh-5', code: 'EXAM', name: 'Annual Examination Fee', type: 'EXAMINATION', description: 'Mid-term and board exam paper processing', isActive: true },
  { id: 'fh-6', code: 'MISC', name: 'Annual Sports & Activity', type: 'MISCELLANEOUS', description: 'Co-curricular and sports equipment fee', isActive: true },
];

let mockFeeStructures: FeeStructure[] = [
  {
    id: 'fs-2026-27-10A',
    academicYear: '2026-27',
    className: '10A',
    termType: 'TERM_WISE',
    totalAmountPaise: 4500000, // ₹45,000
    isProratedForMidYear: true,
    items: [
      { feeHeadId: 'fh-1', feeHeadName: 'Tuition Fee', amountPaise: 3000000 },
      { feeHeadId: 'fh-2', feeHeadName: 'Transport Fee', amountPaise: 800000 },
      { feeHeadId: 'fh-3', feeHeadName: 'Library & Digital Lab', amountPaise: 200000 },
      { feeHeadId: 'fh-4', feeHeadName: 'Science & Computer Lab', amountPaise: 300000 },
      { feeHeadId: 'fh-5', feeHeadName: 'Annual Examination Fee', amountPaise: 200000 },
    ]
  }
];

let mockInstallmentPlans: InstallmentPlan[] = [
  {
    id: 'ip-2026-27-10A',
    academicYear: '2026-27',
    className: '10A',
    totalPercentage: 100,
    installments: [
      { id: 'inst-1', name: 'Term 1 (April - July)', dueDate: '2026-04-15', percentage: 40, amountPaise: 1800000 },
      { id: 'inst-2', name: 'Term 2 (Aug - Nov)', dueDate: '2026-08-15', percentage: 30, amountPaise: 1350000 },
      { id: 'inst-3', name: 'Term 3 (Dec - March)', dueDate: '2026-12-15', percentage: 30, amountPaise: 1350000 },
    ]
  }
];

let mockTransportRoutes: TransportRoute[] = [
  { id: 'tr-1', routeName: 'Route 1 - City Center / Station', distanceKm: '0 - 5 km', monthlyAmountPaise: 100000, annualAmountPaise: 1000000 },
  { id: 'tr-2', routeName: 'Route 2 - Suburb Bypass / Ring Road', distanceKm: '5 - 10 km', monthlyAmountPaise: 150000, annualAmountPaise: 1500000 },
  { id: 'tr-3', routeName: 'Route 3 - Outer Highway / Township', distanceKm: '10 - 20 km', monthlyAmountPaise: 200000, annualAmountPaise: 2000000 },
];

export const feeSetupService = {
  // Fee Heads Master
  async getFeeHeads(): Promise<FeeHead[]> {
    return [...mockFeeHeads];
  },

  async saveFeeHead(head: Partial<FeeHead>): Promise<FeeHead> {
    if (head.id) {
      mockFeeHeads = mockFeeHeads.map(h => h.id === head.id ? { ...h, ...head } as FeeHead : h);
      return mockFeeHeads.find(h => h.id === head.id)!;
    } else {
      const newHead: FeeHead = {
        id: `fh-${Date.now()}`,
        code: head.code || 'FEE',
        name: head.name || 'New Fee Head',
        type: head.type || 'TUITION',
        description: head.description || '',
        isActive: head.isActive !== undefined ? head.isActive : true,
      };
      mockFeeHeads.push(newHead);
      return newHead;
    }
  },

  async toggleFeeHeadStatus(id: string): Promise<FeeHead | undefined> {
    const head = mockFeeHeads.find(h => h.id === id);
    if (head) {
      head.isActive = !head.isActive;
    }
    return head;
  },

  // Fee Structure
  async getFeeStructures(academicYear?: string, className?: string): Promise<FeeStructure[]> {
    let result = [...mockFeeStructures];
    if (academicYear) {
      result = result.filter(fs => fs.academicYear === academicYear);
    }
    if (className) {
      result = result.filter(fs => fs.className === className);
    }
    return result;
  },

  async saveFeeStructure(structure: FeeStructure): Promise<FeeStructure> {
    const index = mockFeeStructures.findIndex(s => s.academicYear === structure.academicYear && s.className === structure.className);
    if (index >= 0) {
      mockFeeStructures[index] = structure;
    } else {
      mockFeeStructures.push(structure);
    }
    return structure;
  },

  // Installment Plans
  async getInstallmentPlans(academicYear?: string, className?: string): Promise<InstallmentPlan[]> {
    let result = [...mockInstallmentPlans];
    if (academicYear) {
      result = result.filter(ip => ip.academicYear === academicYear);
    }
    if (className) {
      result = result.filter(ip => ip.className === className);
    }
    return result;
  },

  async saveInstallmentPlan(plan: InstallmentPlan): Promise<InstallmentPlan> {
    const index = mockInstallmentPlans.findIndex(p => p.academicYear === plan.academicYear && p.className === plan.className);
    if (index >= 0) {
      mockInstallmentPlans[index] = plan;
    } else {
      mockInstallmentPlans.push(plan);
    }
    return plan;
  },

  // Transport Fare Slabs
  async getTransportRoutes(): Promise<TransportRoute[]> {
    return [...mockTransportRoutes];
  },

  async saveTransportRoute(route: TransportRoute): Promise<TransportRoute> {
    const index = mockTransportRoutes.findIndex(r => r.id === route.id);
    if (index >= 0) {
      mockTransportRoutes[index] = route;
    } else {
      mockTransportRoutes.push(route);
    }
    return route;
  }
};
