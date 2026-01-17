export default function MapPanel({ itinerary }: { itinerary: any }) {
  const location =
    itinerary?.days?.flatMap((day: any) =>
      day.activities.filter((a: any) => a.location).map((a: any) => a.location)
    ) ?? [];

  return (
    <aside
      id='map-panel'
      className='sticky top-24 h-[calc(100vh-6rem)] rounded-2xl border border-border bg-muted/30 overflow-hidden'
    >
      <h3 className='font-semibold mb-3'>Places Covered</h3>
      {location.length === 0 ? (
        <p className='text-muted-foreground text-sm'>Mapping places...</p>
      ) : (
        <ul className='space-y-2 text-sm'>
          {location.map((loc: any, i: number) => (
            <li key={i}>{loc.address}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
