export default function TripsHeader() {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <h2 className='text-4xl font-heading font-semibold'>Your Trips</h2>
        <p className='mt-1 text-muted-foreground'>
          Continue planning or revisit past adventures
        </p>
      </div>
    </div>
  );
}
