export function formatBudget(
  min?: number | null,
  max?: number | null,
  currency: string = 'INR',
): string {
  if (!min && !max) return '';
  if (min && max)
    return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
  if (min) return `From ${currency} ${min.toLocaleString()}`;
  if (max) return `Up to ${currency} ${max.toLocaleString()}`;
  return '';
}
