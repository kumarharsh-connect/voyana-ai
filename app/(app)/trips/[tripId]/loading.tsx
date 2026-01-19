export default function TripLoading() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className='h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin' />
        <p className='text-sm text-muted-foreground'>Loading your itinerary…</p>
      </div>
    </div>
  );
}
