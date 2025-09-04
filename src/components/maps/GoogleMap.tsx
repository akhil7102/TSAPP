import React, { useEffect, useRef } from 'react';
import type { Temple } from '../../data/temples';

declare global {
  interface Window { google?: any }
}

function loadGoogleMaps(apiKey: string): Promise<any> {
  if (window.google?.maps) return Promise.resolve(window.google.maps);
  return new Promise((resolve, reject) => {
    const scriptId = 'google-maps-js';
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google?.maps));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google?.maps);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

interface GoogleMapProps {
  temples: Temple[];
  userLocation: { lat: number; lng: number } | null;
  routeTo: { lat: number; lng: number } | null;
  onMarkerClick?: (temple: Temple) => void;
}

export function GoogleMap({ temples, userLocation, routeTo, onMarkerClick }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const dirServiceRef = useRef<any | null>(null);
  const dirRendererRef = useRef<any | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
    if (!mapRef.current || !apiKey) return;

    let cancelled = false;
    loadGoogleMaps(apiKey)
      .then((maps) => {
        if (cancelled) return;
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new maps.Map(mapRef.current, {
            center: { lat: 17.385, lng: 78.4867 },
            zoom: 7,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          });
          dirServiceRef.current = new maps.DirectionsService();
          dirRendererRef.current = new maps.DirectionsRenderer({ suppressMarkers: true });
          dirRendererRef.current.setMap(mapInstanceRef.current);
        }
        renderMarkers(maps);
        fitBounds(maps);
      })
      .catch(() => {
        // ignore load errors; component will simply not render the map
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!window.google?.maps || !mapInstanceRef.current) return;
    renderMarkers(window.google.maps);
    fitBounds(window.google.maps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temples, userLocation]);

  useEffect(() => {
    if (!window.google?.maps || !mapInstanceRef.current) return;
    const maps = window.google.maps;
    if (routeTo && userLocation) {
      dirServiceRef.current.route(
        {
          origin: userLocation,
          destination: routeTo,
          travelMode: maps.TravelMode.DRIVING,
        },
        (result: any, status: string) => {
          if (status === 'OK') {
            dirRendererRef.current.setDirections(result);
          }
        }
      );
    } else {
      dirRendererRef.current?.set('directions', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeTo, userLocation]);

  function renderMarkers(maps: any) {
    // clear
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    temples.forEach((t) => {
      const position = { lat: t.location.latitude, lng: t.location.longitude };
      const marker = new maps.Marker({ position, map: mapInstanceRef.current, title: t.name.english });
      marker.addListener('click', () => onMarkerClick?.(t));
      markersRef.current.push(marker);
    });

    if (userLocation) {
      const userMarker = new maps.Marker({ position: userLocation, map: mapInstanceRef.current, icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 6,
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
      } });
      markersRef.current.push(userMarker);
    }
  }

  function fitBounds(maps: any) {
    if (!mapInstanceRef.current) return;
    const bounds = new maps.LatLngBounds();
    let hasAny = false;
    markersRef.current.forEach((m) => {
      if (m.getPosition) {
        bounds.extend(m.getPosition());
        hasAny = true;
      }
    });
    if (hasAny) {
      mapInstanceRef.current.fitBounds(bounds);
    }
  }

  const apiKeyMissing = !import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="w-full h-full">
      {apiKeyMissing ? (
        <div className="w-full h-full flex items-center justify-center bg-muted/20">
          <div className="text-center p-6 text-sm text-muted-foreground">
            Google Maps API key missing. Add VITE_GOOGLE_MAPS_API_KEY to enable the map.
          </div>
        </div>
      ) : (
        <div ref={mapRef} className="w-full h-full" />
      )}
    </div>
  );
}
