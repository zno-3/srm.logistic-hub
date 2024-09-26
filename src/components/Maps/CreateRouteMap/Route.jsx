import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import yellowMarkerIcon from "../../../assets/markers/marker-yellow.png";
import markerShadow from "../../../assets/markers/marker-shadow.png";


const Route = ({ map, startLatLng, endLatLng }) => {
  const [routeControl, setRouteControl] = useState(null);
  const [intermediateMarkers, setIntermediateMarkers] = useState([]);

  useEffect(() => {
    if (!startLatLng || !endLatLng) return;
  
    // Очищуємо попередній маршрут і проміжні маркери
    if (routeControl) {
      map.removeControl(routeControl);
      intermediateMarkers.forEach((marker) => marker.remove());
    }
  
    // Створюємо новий маршрут
    const control = L.Routing.control({
      waypoints: [startLatLng, endLatLng],
      routeWhileDragging: true,
      show: false,
      createMarker: () => null,
    }).addTo(map);
  
    // Оновлюємо проміжні маркери при зміні маршруту
    control.on("waypointschanged", (e) => {
      intermediateMarkers.forEach((marker) => marker.remove()); // Очищуємо старі маркери
      const newMarkers = e.waypoints
        .map((waypoint, i) => {
          if (i > 0 && i < e.waypoints.length - 1) {
            const yellowMarker = L.marker(waypoint.latLng, {
              icon: L.icon({
                iconUrl: yellowMarkerIcon,
                shadowUrl: markerShadow,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              }),
              draggable: true,
            }).addTo(map);
  
            yellowMarker.on("dragend", () => {
              control.spliceWaypoints(i, 1, yellowMarker.getLatLng());
            });
  
            return yellowMarker;
          }
          return null;
        })
        .filter(Boolean); // Очищуємо маркери, що не додалися
  
      setIntermediateMarkers(newMarkers); // Оновлюємо стан
    });
  
    setRouteControl(control);
  
    return () => {
      if (routeControl) {
        map.removeControl(control);
      }
    };
  }, [map, startLatLng, endLatLng]);

  return null;
};

export default Route;
