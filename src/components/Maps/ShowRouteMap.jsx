import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const ShowRouteMap = ({ origin, destination }) => {
  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
    shadowSize: [41, 41], 
  });

  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker1, setMarker1] = useState(null);
  const [marker2, setMarker2] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);

  // Ініціалізація мапи
  useEffect(() => {
    if (!mapRef.current) return;
    const initMap = L.map(mapRef.current).setView([50.01, 30.005], 9);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(initMap);

    setMap(initMap);
  }, []);

  // Додаємо перший маркер (незалежно від origin чи destination)
  useEffect(() => {
    if (map && origin) {
      if (marker1) map.removeLayer(marker1);
      const newMarker = L.marker([origin.lat, origin.lng], {
        icon: customIcon,
      }).addTo(map);
      setMarker1(newMarker);
      map.setView([origin.lat, origin.lng], 9); 
    }
  }, [origin, map]);

  // Додаємо другий маркер (незалежно від origin чи destination)
  useEffect(() => {
    if (map && destination) {
      if (marker2) map.removeLayer(marker2);
      const newMarker = L.marker([destination.lat, destination.lng], {
        icon: customIcon,
      }).addTo(map);
      setMarker2(newMarker);
      map.setView([destination.lat, destination.lng], 9);
    }
  }, [destination, map]);

  // Створюємо маршрут, коли обидва маркери присутні
  useEffect(() => {
    if (map && marker1 && marker2) {
      // Видаляємо попередній маршрут
      if (routeControl) {
        map.removeControl(routeControl);
      }

      // Додаємо маршрут між маркерами
      const newRouteControl = L.Routing.control({
        waypoints: [
          L.latLng(origin.lat, origin.lng),
          L.latLng(destination.lat, destination.lng),
        ],
        routeWhileDragging: true,
        show: false, // Вимикає відображення детальної панелі маршруту
        createMarker: function(i, waypoint, n) {
          return L.marker(waypoint.latLng, {
            icon: customIcon // Встановлюємо кастомну іконку для всіх waypoint-маркерів
          });
        }
      }).addTo(map);

      // Додаємо слухач події для отримання інформації про маршрут
      newRouteControl.on("routesfound", function (e) {
        const routes = e.routes;
        const summary = routes[0].summary;

        setDistance((summary.totalDistance / 1000).toFixed(1));
        setTime((summary.totalTime / 3600).toFixed(1));
      });

      setRouteControl(newRouteControl);

      // Позиціонуємо мапу, щоб маршрут був у центрі
      const bounds = L.latLngBounds(
        [origin.lat, origin.lng],
        [destination.lat, destination.lng]
      );
      map.fitBounds(bounds);
    }
  }, [marker1, marker2, map]);

  return (
    <>
      <div>Відстань: {distance} км</div>
      <div>Час: {time} год</div>
      <div
        ref={mapRef}
        style={{ height: "500px", width: "100%", marginTop: "10px" }}
      ></div>
    </>
  );
};

export default ShowRouteMap;
