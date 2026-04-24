"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import type { ProgramOffering } from "@prisma/client";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const COLOMBIA_CENTER: [number, number] = [4.5709, -74.2973];
const DEFAULT_ZOOM = 5;
const FOCUS_ZOOM   = 13;

const CHARACTER_COLOR: Record<string, string> = {
  Oficial: "#6366f1",
  Privada: "#f59e0b",
};

const DEFAULT_MARKER_COLOR = "#64748b";

interface MarkersLayerProps {
  offerings:       ProgramOffering[];
  focusedOffering: ProgramOffering | null;
}

function MarkersLayer({ offerings, focusedOffering }: MarkersLayerProps) {
  const map        = useMap();
  const clusterRef = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      import("leaflet"),
      import("leaflet.markercluster"),
    ]).then(([L]) => {
      if (cancelled) return;

      if (clusterRef.current) {
        map.removeLayer(clusterRef.current as Parameters<typeof map.removeLayer>[0]);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cluster = (L as any).markerClusterGroup();
      clusterRef.current = cluster;

      const geocoded = offerings.filter((o) => o.lat !== null && o.lng !== null);

      for (const offering of geocoded) {
        const color = CHARACTER_COLOR[offering.character] ?? DEFAULT_MARKER_COLOR;

        const icon = L.divIcon({
          className: "",
          html: `<div style="width:12px;height:12px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35);"></div>`,
          iconSize:   [12, 12],
          iconAnchor: [6, 6],
        });

        const marker = L.marker([offering.lat!, offering.lng!], { icon });
        marker.bindPopup(
          `<strong style="font-size:12px;line-height:1.4">${offering.institutionName}</strong>` +
          `<br><span style="font-size:11px;color:#64748b">${offering.municipality}, ${offering.department}</span>`,
        );
        cluster.addLayer(marker);
      }

      map.addLayer(cluster);
    });

    return () => {
      cancelled = true;
      if (clusterRef.current) {
        map.removeLayer(clusterRef.current as Parameters<typeof map.removeLayer>[0]);
      }
    };
  }, [offerings, map]);

  useEffect(() => {
    if (focusedOffering?.lat != null && focusedOffering?.lng != null) {
      map.flyTo([focusedOffering.lat, focusedOffering.lng], FOCUS_ZOOM, { duration: 0.8 });
    }
  }, [focusedOffering, map]);

  return null;
}

interface UniversityMapProps {
  offerings:       ProgramOffering[];
  focusedOffering: ProgramOffering | null;
}

export function UniversityMap({ offerings, focusedOffering }: UniversityMapProps) {
  return (
    <MapContainer
      center={COLOMBIA_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ height: "100%", width: "100%", minHeight: "300px" }}
      className="rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkersLayer offerings={offerings} focusedOffering={focusedOffering} />
    </MapContainer>
  );
}
