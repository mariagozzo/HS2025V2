import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number as currency
 */
export function formatCurrency(amount: number | string, currency: string = "USD"): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return '---';
  
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numAmount);
}

/**
 * Converts currency between USD and VEF
 */
export function convertCurrency(amount: number, from: 'USD' | 'VEF', to: 'USD' | 'VEF', rate: number): number {
  if (from === to) return amount;
  
  if (from === 'USD' && to === 'VEF') {
    return amount * rate;
  } else {
    return amount / rate;
  }
}
