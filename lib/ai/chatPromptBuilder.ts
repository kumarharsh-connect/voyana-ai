export function buildChatPrompt({
  itinerary,
  userMessage,
  destination,
  groupType,
}: {
  itinerary: any;
  userMessage: string;
  destination: string;
  groupType: string | null;
}) {
  return `
  Context: 
  Destination: ${destination}
  Group type: ${groupType ?? 'unknown'}

  Current itinerary JSON: 
  ${JSON.stringify(itinerary, null, 2)}

  User request: 
  "${userMessage}"

  Task:
  Update the itinerary JSON to satisfy the user's request.
  Return the updated itinerary and a short reply.
  `;
}
