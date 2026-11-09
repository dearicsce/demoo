/**
 * Formats a number in Indian Rupee format (e.g. 17,980 or 1,25,000)
 */
export function formatINR(amount: number): string {
  try {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return amount.toString();
  }
}
