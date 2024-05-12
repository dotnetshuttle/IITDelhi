import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./ReactMap.css";

export default function ReactMap({ formData, setFormData }) {
  const center = { lat: 51.505, lng: -0.09 };

  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(formData.position || center);
    const markerRef = useRef(null);

    useEffect(() => {
      if (formData.position) {
        setPosition(formData.position);
      }
    }, [formData.position]);

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            const newPosition = marker.getLatLng();
            setPosition(newPosition);
            setFormData({ ...formData, position: newPosition });
          }
        },
      }),
      [formData, setFormData]
    );

    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90} position={position}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    );
  }

  return (
    <MapContainer center={center} zoom={16} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DraggableMarker />
    </MapContainer>
  );
}
