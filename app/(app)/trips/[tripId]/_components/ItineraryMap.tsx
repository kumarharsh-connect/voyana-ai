'use client';

import { useEffect } from 'react';

import { MapLocation } from '@/types/map';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';
import { getDayIcon } from '@/lib/maps/markerIcons';

function MapController({ focus }: { focus?: MapLocation }) {
  const map = useMap();

  useEffect(() => {
    if (focus) {
      map.flyTo([focus.lat, focus.lng], 15, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [focus, map]);

  return null;
}

export default function ItineraryMap({
  locations,
  focus,
}: {
  locations: MapLocation[];
  focus?: MapLocation;
}) {
  if (!locations.length) return null;

  const center: [number, number] = [locations[0].lat, locations[0].lng];

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

  const routesByDay = locations.reduce<Record<number, [number, number][]>>(
    (acc, loc) => {
      acc[loc.day] ??= [];
      acc[loc.day].push([loc.lat, loc.lng]);
      return acc;
    },
    {},
  );

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

      <MapController focus={focus} />

      {Object.entries(routesByDay).map(([day, points]) => (
        <Polyline key={day} positions={points} pathOptions={{ weight: 3 }} />
      ))}

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
