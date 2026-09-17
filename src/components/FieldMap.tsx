import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { FieldRecord } from '@/lib/workspace';

export default function FieldMap({ records, onSelect }: { records: FieldRecord[]; onSelect: (id: string) => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!root.current) return;
    const map = L.map(root.current).setView([39, -111], 5);
    const tiles = L.tileLayer(import.meta.env.VITE_MAP_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: import.meta.env.VITE_MAP_ATTRIBUTION || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    tiles.on('tileerror', () => setFailed(true));
    const points: L.LatLngTuple[] = [];
    records.forEach(record => {
      const positions = record.location ? [record.location] : record.interpretations;
      positions.forEach(position => {
        const {latitude, longitude} = position;
        if (latitude === null || longitude === null || !Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) return;
        const point: L.LatLngTuple = [latitude, longitude]; points.push(point);
        const label = document.createElement('span'); label.textContent = record.original || 'Field observation';
        L.circleMarker(point, { radius: 8, color: '#f59e0b', fillOpacity: .85 }).bindTooltip(label).on('click', () => onSelect(record.id)).addTo(map);
      });
    });
    if (points.length) map.fitBounds(L.latLngBounds(points), { padding: [30, 30], maxZoom: 15 });
    const observer = new ResizeObserver(() => map.invalidateSize()); observer.observe(root.current);
    return () => { observer.disconnect(); map.remove(); };
  }, [records, onSelect]);
  return <section aria-label="Field observation map"><div ref={root} className="h-[380px] relative z-0 rounded-lg" />{failed && <p role="status">Some map tiles could not load. Your records remain available below.</p>}<p className="text-xs text-muted-foreground py-2">Only records with supplied coordinates appear as markers. Basemap tiles load from the map provider; observations stay in TerraSatch. <a href="https://www.openstreetmap.org/fixthemap" className="underline">Report a map issue</a></p></section>;
}
