import L from 'leaflet';

const COLORS = ['#ef4444', '#22c55e', '#3b82f6', '#a855f7', '#f97316'];

export function getDayIcon(day: number) {
  const color = COLORS[(day - 1) % COLORS.length];

  return L.divIcon({
    className: '',
    html: `
    <div style="
    background:${color};
    width: 14px;
    height: 14px;
    border-radius:50%;
    border: 2px solid white;
    box-shadow: 0 0 0 2px rgba(0,0,0,0.2)
    ">
    </div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}
