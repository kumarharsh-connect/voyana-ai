'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export type MapLocation = {
  lat: number;
  lng: number;
  address: string;
};

export default function ItineraryMap({
  locations,
}: {
  locations: MapLocation[];
}) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  if (!locations.length) return null;

  const center: [number, number] = [locations[0].lat, locations[0].lng];

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom
      className='h-full w-full'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {locations.map((loc, i) => (
        <Marker key={i} position={[loc.lat, loc.lng]}>
          <Popup>
            <p className='text-sm font-medium'>{loc.address}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
