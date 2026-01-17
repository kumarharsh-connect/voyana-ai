export function buildGenerationPrompt({
  destination,
  days,
  groupType,
  minBudget,
  maxBudget,
  currency,
  pace,
}: {
  destination: string;
  days: number;
  groupType: string;
  minBudget?: number | null;
  maxBudget?: number | null;
  currency: string;
  pace: string;
}) {
  return `
  Trip details:
Destination: ${destination}
Number of days: ${days}
Group type: ${groupType}
Pace: ${pace ?? 'balanced'}

Budget: ${
    minBudget && maxBudget
      ? `${minBudget}-${maxBudget} ${currency}`
      : `Flexible`
  }

Task:
Generate a realistic, well paced ${days}-day travel itinerary.
Each day should have multiple activities.
Consider the group type and budget while planning.
  `;
}
