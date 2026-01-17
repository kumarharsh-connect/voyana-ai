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
  
  CRITICAL: You MUST preserve all "location" objects from the current itinerary.
  - If an activity has a location object (with lat, lng, address, placeId), keep it exactly as is
  - Only activities that are completely new should not have location objects
  - Do NOT remove or modify existing location data
  `;
}
