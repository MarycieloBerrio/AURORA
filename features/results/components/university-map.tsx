"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import type { EnrichedSniesProgram } from "@/services/snies-service";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const COLOMBIA_CENTER: [number, number] = [4.5709, -74.2973];
const DEFAULT_ZOOM = 5;
const FOCUS_ZOOM   = 13;

// Oficial = indigo hex, Privada = amber hex
const CHARACTER_COLOR: Record<string, string> = {
  Oficial: "#6366f1",
  Privada: "#f59e0b",
};

const DEFAULT_MARKER_COLOR = "#64748b";

interface MarkersLayerProps {
  offerings:       EnrichedSniesProgram[];
  focusedOffering: EnrichedSniesProgram | null;
}

function MarkersLayer({ offerings, focusedOffering }: MarkersLayerProps) {
  const map        = useMap();
  const clusterRef = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    import("leaflet")
      .then((leafletNS) => {
        // Use L.default (the actual Leaflet object) so the markercluster plugin,
        // which internally calls require('leaflet'), patches the same reference.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const LObj = (leafletNS as any).default ?? leafletNS;
        if (typeof window !== "undefined") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).L = LObj;
        }
        return import("leaflet.markercluster").then(() => LObj);
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((L: any) => {
        if (cancelled) return;

        if (clusterRef.current) {
          map.removeLayer(clusterRef.current as Parameters<typeof map.removeLayer>[0]);
        }

        const geocoded = offerings.filter((o) => o.lat !== null && o.lng !== null);

        const makeIcon = (character: string) => {
          const color = CHARACTER_COLOR[character] ?? DEFAULT_MARKER_COLOR;
          return L.divIcon({
            className: "",
            html: `<div style="width:12px;height:12px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.35);"></div>`,
            iconSize:   [12, 12],
            iconAnchor: [6, 6],
          });
        };

        const makePopup = (o: EnrichedSniesProgram) =>
          `<strong style="font-size:12px;line-height:1.4">${o.nombreinstitucion ?? "—"}</strong>` +
          `<br><span style="font-size:11px;color:#64748b">${o.nombremunicipioprograma ?? ""}, ${o.nombredepartprograma ?? ""}</span>`;

        if (typeof L.markerClusterGroup === "function") {
          const cluster = L.markerClusterGroup();
          clusterRef.current = cluster;
          for (const o of geocoded) {
            L.marker([o.lat!, o.lng!], { icon: makeIcon(o.nombrecaracteracademico ?? "") })
              .bindPopup(makePopup(o))
              .addTo(cluster);
          }
          map.addLayer(cluster);
        } else {
          // Fallback: add markers directly without clustering
          const group = L.featureGroup();
          clusterRef.current = group;
          for (const o of geocoded) {
            L.marker([o.lat!, o.lng!], { icon: makeIcon(o.nombrecaracteracademico ?? "") })
              .bindPopup(makePopup(o))
              .addTo(group);
          }
          map.addLayer(group);
        }
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
  offerings:       EnrichedSniesProgram[];
  focusedOffering: EnrichedSniesProgram | null;
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
