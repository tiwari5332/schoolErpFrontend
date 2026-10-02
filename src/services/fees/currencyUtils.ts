/**
 * Utility functions for Indian Rupee (INR) formatting and Paise precision calculations.
 */

export function formatINR(paise: number): string {
  const rupees = (paise || 0) / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(rupees);
}

export function rupeesToPaise(rupees: number): number {
  return Math.round((rupees || 0) * 100);
}

export function paiseToRupees(paise: number): number {
  return (paise || 0) / 100;
}
