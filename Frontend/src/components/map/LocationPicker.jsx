import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);

      onLocationSelect({
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      });
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function LocationPicker({ onLocationSelect }) {
  return (
    <MapContainer
      center={[11.0168, 76.9558]} // Coimbatore
      zoom={13}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "12px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
}