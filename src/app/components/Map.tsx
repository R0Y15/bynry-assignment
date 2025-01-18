'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Profile } from '@/app/types';
import 'leaflet/dist/leaflet.css';
import type { Icon, IconOptions } from 'leaflet';
import axios from 'axios';

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const MapContent = dynamic(
  () => Promise.resolve(({ center, zoom, profile, icon }: any) => {
    const { TileLayer, Marker, Popup } = require('react-leaflet');
    return (
      <>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {profile && icon && (
          <Marker position={center} icon={icon}>
            <Popup>
              <div>
                <h3 className="font-semibold">{profile.name}</h3>
                <p className="text-sm">{profile.location}</p>
                <p className="text-sm text-gray-500">{profile.description}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </>
    );
  }),
  { ssr: false }
);

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapProps {
  profile?: Profile;
  center?: Coordinates;
}

const defaultCenter = {
  lat: 37.0902,
  lng: -95.7129 // Center of USA since the sample location is in the US
};

const defaultZoom = 4;
const profileZoom = 13;

// Define marker icon options
const markerIcon: IconOptions = {
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
};

async function getCoordinates(location: string): Promise<Coordinates | null> {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );
    if (response.data && response.data[0]) {
      return {
        lat: parseFloat(response.data[0].lat),
        lng: parseFloat(response.data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding location:', error);
    return null;
  }
}

export default function Map({ profile, center: initialCenter }: MapProps) {
  const [icon, setIcon] = useState<Icon | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [key, setKey] = useState(0); // Add key for forcing remount

  // Get coordinates when profile changes
  useEffect(() => {
    if (profile?.location) {
      getCoordinates(profile.location).then(coords => {
        if (coords) {
          setCoordinates(coords);
          setKey(prev => prev + 1); // Force remount when coordinates change
        }
      });
    }
  }, [profile]);

  useEffect(() => {
    // Import Leaflet dynamically on client side
    import('leaflet').then((L) => {
      setIcon(L.icon(markerIcon));
    });
  }, []);

  const mapCenter = coordinates || initialCenter || defaultCenter;
  const zoom = coordinates ? profileZoom : defaultZoom;

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <MapContainer
        key={key} // Force remount when coordinates change
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <MapContent
          center={[mapCenter.lat, mapCenter.lng]}
          zoom={zoom}
          profile={profile}
          icon={icon}
        />
      </MapContainer>
    </div>
  );
} 