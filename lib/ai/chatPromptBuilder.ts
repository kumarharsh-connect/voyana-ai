export function buildChatPrompt({
  itinerary,
  userMessage,
  destination,
  groupSize,
  groupType,
}: {
  itinerary: any;
  userMessage: string;
  destination: string;
  groupSize: number | null;
  groupType: string | null;
}) {
  return `
  Context: 
  Destination: ${destination}
  Group size: ${groupSize ?? 'unknown'}
  Group type: ${groupType ?? 'unknown'}

  Current itinerary JSON: 
  ${JSON.stringify(itinerary, null, 2)}

  User request: 
  "${userMessage}"

  Task:
  Update the itinerary JSON to satidfy the user's request.
  Return the updated itinerary and a short reply.
  `;
}
