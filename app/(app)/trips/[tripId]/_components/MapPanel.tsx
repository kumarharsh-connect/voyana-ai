export default function MapPanel({ itinerary }: { itinerary: any }) {
  return (
    <aside className='sticky top-24 h-[calc(100vh-6rem)] rounded-2xl border border-border bg-muted/30 overflow-hidden'>
      <div className='h-full flex items-center justify-center text-muted-foreground'>
        Map goes here
      </div>
    </aside>
  );
}
