// export function buildUnifiedGenerationPrompt({
//   destination,
//   days,
//   groupType,
//   minBudget,
//   maxBudget,
//   currency,
//   pace,
// }: {
//   destination: string;
//   days: number;
//   groupType: string;
//   minBudget?: number | null;
//   maxBudget?: number | null;
//   currency: string;
//   pace: string;
// }) {
//   return `
// Trip Details:
// Destination: ${destination}
// Number of days: ${days}
// Group type: ${groupType}
// Pace: ${pace ?? 'balanced'}

// Budget: ${
//     minBudget && maxBudget
//       ? `${minBudget}-${maxBudget} ${currency}`
//       : `Flexible`
//   }

// Task:
// Generate a comprehensive ${days}-day travel itinerary that includes:

// 1. **Complete Itinerary Structure**:
//    - Overview with destination and summary
//    - ${days} days with multiple activities each
//    - Consider group type, budget, and pace

// 2. **Location Data**:
//    - Include real coordinates (lat/lng) and addresses for most activities
//    - Use well-known landmarks and attractions
//    - Ensure locations are within reasonable distance of ${destination}

// 3. **Time Management**:
//    - Assign each activity to morning (9:00-12:00), afternoon (13:00-17:00), or evening (18:00-21:00)
//    - Distribute activities across all time blocks for balanced days
//    - Include dayTimeBlocks for each day

// 4. **Local Experience**:
//    - Add one practical, location-specific tip per day
//    - Focus on local insights that enhance the travel experience

// Generate realistic, well-paced activities that match the group type and budget. Ensure the itinerary is geographically coherent and practically achievable.
//   `;
// }

export function buildUnifiedGenerationPrompt({
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
DATA:
- Loc: ${destination}
- Dur: ${days} days
- Group: ${groupType}
- Pace: ${pace ?? 'balanced'}
- Budget: ${minBudget && maxBudget ? `${minBudget}-${maxBudget} ${currency}` : 'Flexible'}

REQ:
1. Generate ${days} days matching Schema.
2. High-accuracy lat/lng for attractions.
3. Logical morning/afternoon/evening distribution.
4. One concise local tip per day.
5. All descriptions < 25 words.
  `.trim();
}
