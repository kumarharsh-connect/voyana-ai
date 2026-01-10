export function checkMissingInfo(trip: { groupSize: number | null }) {
  if (!trip.groupSize) {
    return {
      type: 'QUESTION',
      message:
        'Before I plan you itinerary, are you travelling solo, as a couple, or in a group? This helps me plan costs and pacing better.',
    };
  }
}
