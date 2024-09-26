import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerComponent from "./Marker";
import RouteControl from "./Route";

const CreateRouteMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [startLatLng, setStartLatLng] = useState(null);
  const [endLatLng, setEndLatLng] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const leafletMap = L.map(mapRef.current).setView([48.4647, 35.0469], 6);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(leafletMap);
      setMap(leafletMap);
    };

    if (!map) {initializeMap(); }

    return () => {
      if (map) {map.remove();}
    };
  }, [map]);

  const handleMapClick = (e) => {
    const { latlng } = e;
    if (!startLatLng) {
      setStartLatLng(latlng);
    } else if (!endLatLng) {
      setEndLatLng(latlng);
    }
  };

  useEffect(() => {
    if (map) {
      map.on("click", handleMapClick);
    }
    return () => {
      if (map) {
        map.off("click", handleMapClick);
      }
    };
  }, [map, startLatLng, endLatLng]);

  return (
    <div style={{ height: "500px", width: "100%" }} ref={mapRef}>
      {map && startLatLng && (
        <MarkerComponent
          map={map}
          latlng={startLatLng}
          iconType="start"
          onDragEnd={setStartLatLng}
        />
      )}
      {map && endLatLng && (
        <MarkerComponent
          map={map}
          latlng={endLatLng}
          iconType="end"
          onDragEnd={setEndLatLng}
        />
      )}
      {map && startLatLng && endLatLng && (
        <RouteControl
          map={map}
          startLatLng={startLatLng}
          endLatLng={endLatLng}
        />
      )}
    </div>
  );
};

export default CreateRouteMap;
