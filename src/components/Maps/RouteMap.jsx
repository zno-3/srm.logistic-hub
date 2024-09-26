import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

const RouteMap = (props) => {
  const mapRef = useRef(null); // Використовуємо реф для збереження стану карти
  const div = "map";

  useEffect(() => {
    // Якщо карта вже існує, не ініціалізуємо її знову
    if (mapRef.current !== null) return;

    const map = L.map(div).setView([49.83826, 24.02324], 7); // Початкова позиція карти
    mapRef.current = map; // Зберігаємо карту в рефі

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const control = L.Routing.control({
      show: false,
      waypoints: [
        L.latLng(49.83826, 24.02324), // Початкова точка
        L.latLng(50.4501, 30.5234),   // Кінцева точка
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [
          {
            color: "#0E1C36",
            opacity: 0.6,
            weight: 5
          }
        ]
      },
    }).addTo(map);

    // Очищаємо карту при демонтажі компонента
    return () => {
      if (mapRef.current !== null) {
        mapRef.current.remove(); // Видаляємо карту
        mapRef.current = null;   // Очищаємо реф
      }
    };
  }, [div]);

  return <div id={div} style={{ height: "400px" }}></div>;
};

export default RouteMap;
