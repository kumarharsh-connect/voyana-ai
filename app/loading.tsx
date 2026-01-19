export default function Loading() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-background'>
      <div className='flex flex-col items-center gap-6'>
        {/* Spinner */}
        <div className='relative h-14 w-14'>
          <div className='absolute inset-0 rounded-full border-4 border-primary/20' />
          <div className='absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin' />
        </div>

        {/* Text */}
        <div className='text-center space-y-1'>
          <p className='text-sm font-semibold text-foreground'>
            Voyana is planning your trip
          </p>
          <p className='text-xs text-muted-foreground'>
            Creating something special for you ✨
          </p>
        </div>
      </div>
    </div>
  );
}
