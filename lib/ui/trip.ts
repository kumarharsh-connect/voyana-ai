export function getStatusColor(status: string): string {
  switch (status) {
    case 'GENERATED':
      return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
    case 'DRAFT':
      return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
    case 'FINALIZED':
      return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
}
