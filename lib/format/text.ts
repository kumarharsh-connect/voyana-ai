export function getGroupTypeLabel(groupType?: string | null): string {
  if (!groupType) return 'Solo';
  return groupType.charAt(0).toUpperCase() + groupType.slice(1);
}

export function getDestinationInitials(destination: string): string {
  return destination
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
