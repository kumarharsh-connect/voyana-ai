export function buildGenerationPrompt({
  destination,
  groupSize,
  groupType,
  budget,
  pace,
}: {
  destination: string;
  groupSize: number | null;
  groupType: string | null;
  budget: number | null;
  pace: string | null;
}) {
  return `
  Trip details:
Destination: ${destination}
Group size: ${groupSize ?? 'unknown'}
Group type: ${groupType ?? 'unknown'}
Budget: ${budget ?? 'flexible'}
Pace: ${pace ?? 'balanced'}

Task:
Generate a day-wise travel itinerary.
Each day should have multiple activities.
Use realistic travel planning.
  `;
}
