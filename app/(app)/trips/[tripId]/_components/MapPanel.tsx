import dynamic from 'next/dynamic';

const ItineraryMap = dynamic(() => import('./ItineraryMap'), {
  ssr: false,
});

export default function MapPanel({ itinerary }: { itinerary: any }) {
  const locations =
    itinerary?.days?.flatMap((day: any) =>
      day.activities
        .filter((a: any) => a.location)
        .map((a: any) => ({
          lat: a.location.lat,
          lng: a.location.lng,
          address: a.location.address,
        })),
    ) ?? [];

  return (
    <aside className='sticky top-24 h-[calc(100vh-6rem)] rounded-2xl border border-border bg-background overflow-hidden'>
      <div className='border-b px-4 py-3'>
        <h3 className='font-semibold'>Places Covered</h3>
      </div>

      {locations.length === 0 ? (
        <div className='p-4 text-sm text-muted-foreground'>
          Enable map view to see locations
        </div>
      ) : (
        <ItineraryMap locations={locations} />
      )}
    </aside>
  );
}
