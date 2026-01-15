import TripCard from './TripCard';

type TripGridProps = {
  trips: any[];
};

export default function TripGrid({ trips }: TripGridProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}
