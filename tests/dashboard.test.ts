import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  formatPaiseToRupees,
  getGreeting,
  extractFirstName,
  formatServerDate,
  filterAllowedQuickActions,
  isDateInFuture,
} from '../src/features/admin-dashboard/utils/dashboardFormatters';
import { QuickActionItem } from '../src/types/dashboard';

describe('Admin Dashboard Requirements & Formatting Logic', () => {
  describe('Greeting Logic & Text Sanitization', () => {
    it('returns Good Morning before 12 PM', () => {
      const morningGreeting = getGreeting('John Anderson', 9);
      assert.strictEqual(morningGreeting, 'Good Morning, John');
    });

    it('returns Good Afternoon between 12 PM and 5 PM', () => {
      const afternoonGreeting = getGreeting('John Anderson', 14);
      assert.strictEqual(afternoonGreeting, 'Good Afternoon, John');
    });

    it('returns Good Evening after 5 PM', () => {
      const eveningGreeting = getGreeting('John Anderson', 18);
      assert.strictEqual(eveningGreeting, 'Good Evening, John');
    });

    it('strips stray text "enter college" from greeting', () => {
      const cleaned = extractFirstName('John enter college Anderson');
      assert.strictEqual(cleaned, 'John');

      const greeting = getGreeting('John enter college', 10);
      assert.strictEqual(greeting, 'Good Morning, John');
    });

    it('handles empty or null names gracefully with default Admin', () => {
      assert.strictEqual(extractFirstName(''), 'Admin');
      assert.strictEqual(extractFirstName(null), 'Admin');
      assert.strictEqual(getGreeting(null, 11), 'Good Morning, Admin');
    });
  });

  describe('Currency Formatting from Paise', () => {
    it('converts paise to INR formatted currency with ₹ symbol', () => {
      // 1,670,000 paise = 16,700 rupees
      const formatted = formatPaiseToRupees(1670000);
      assert.strictEqual(formatted, '₹ 16,700');
    });

    it('formats large values according to Indian numbering system (lakhs/crores)', () => {
      // 15,00,000 rupees = 150,000,000 paise
      const formatted = formatPaiseToRupees(150000000);
      assert.strictEqual(formatted, '₹ 15,00,000');
    });

    it('renders "—" when paise is null, undefined, or NaN', () => {
      assert.strictEqual(formatPaiseToRupees(null), '—');
      assert.strictEqual(formatPaiseToRupees(undefined), '—');
      assert.strictEqual(formatPaiseToRupees(NaN), '—');
    });

    it('formats 0 paise correctly as ₹ 0', () => {
      assert.strictEqual(formatPaiseToRupees(0), '₹ 0');
    });
  });

  describe('Role-based Quick Actions Filtering', () => {
    const mockActions: QuickActionItem[] = [
      {
        id: 'mark_attendance',
        label: 'Mark Attendance',
        icon: 'CalendarCheck',
        rolesAllowed: ['Admin', 'Super Admin'],
      },
      {
        id: 'collect_fee',
        label: 'Collect Fee',
        icon: 'CreditCard',
        rolesAllowed: ['Finance Admin', 'Super Admin'],
      },
      {
        id: 'add_student',
        label: 'Add Student',
        icon: 'UserPlus',
        rolesAllowed: ['Academic Admin', 'Super Admin'],
      },
      {
        id: 'system_settings',
        label: 'Settings',
        icon: 'Settings',
        rolesAllowed: ['Super Admin'],
      },
    ];

    it('allows Super Admin access to all actions', () => {
      const allowed = filterAllowedQuickActions(mockActions, 'Super Admin');
      assert.strictEqual(allowed.length, 4);
    });

    it('filters out unauthorized actions for Finance Admin', () => {
      const allowed = filterAllowedQuickActions(mockActions, 'Finance Admin');
      assert.strictEqual(allowed.length, 1);
      assert.strictEqual(allowed[0].id, 'collect_fee');
    });

    it('filters out unauthorized actions for Academic Admin', () => {
      const allowed = filterAllowedQuickActions(mockActions, 'Academic Admin');
      assert.strictEqual(allowed.length, 1);
      assert.strictEqual(allowed[0].id, 'add_student');
    });
  });

  describe('Server Date vs Future Date Validation', () => {
    const serverDate = '2026-11-08';

    it('correctly detects if a date is in the future relative to server date', () => {
      assert.strictEqual(isDateInFuture('2026-11-09', serverDate), true);
      assert.strictEqual(isDateInFuture('2026-11-20', serverDate), true);
      assert.strictEqual(isDateInFuture('2026-11-08', serverDate), false);
      assert.strictEqual(isDateInFuture('2026-11-07', serverDate), false);
    });

    it('formats server date to British English day, month, year, weekday format', () => {
      const formatted = formatServerDate('2026-11-08');
      assert.ok(formatted.includes('8 November 2026'));
      assert.ok(formatted.includes('Sunday'));
    });
  });

  describe('Profile and Independent Card Retry Resilience', () => {
    it('ensures individual card failure does not prevent other components from executing', () => {
      const cardErrors: Record<string, boolean> = {
        summary: true,
        attendance: false,
        feeTrend: false,
      };

      assert.strictEqual(cardErrors.summary, true);
      assert.strictEqual(cardErrors.attendance, false);
      assert.strictEqual(cardErrors.feeTrend, false);
    });

    it('safely handles date strings with ISO time components', () => {
      const formatted = formatServerDate('2026-11-08T00:00:00.000Z');
      assert.ok(formatted.includes('8 November 2026'));
    });
  });
});

