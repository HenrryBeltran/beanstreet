"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  center: number[];
};

export default function Map({ center }: Props) {
  const customIcon = new Icon({
    iconUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/map-pin.png`,
    iconSize: [32, 32],
  });

  return (
    <MapContainer
      className="block h-1/2 w-full"
      center={center as LatLngExpression}
      zoom={15}
    >
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center as LatLngExpression} icon={customIcon} />
    </MapContainer>
  );
}
