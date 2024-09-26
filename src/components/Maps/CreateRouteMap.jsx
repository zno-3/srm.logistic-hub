import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

// Імпорт твоїх маркерів
import greenMarkerIcon from "../../assets/markers/marker-green.png"; // Змінити на правильний шлях
import redMarkerIcon from "../../assets/markers/marker-red.png"; // Змінити на правильний шлях
import yellowMarkerIcon from "../../assets/markers/marker-yellow.png"; // Змінити на правильний шлях

const CreateRouteMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const [intermediateMarkers, setIntermediateMarkers] = useState([]); // Список для жовтих маркерів

  useEffect(() => {
    const initializeMap = () => {
      const leafletMap = L.map(mapRef.current).setView([48.4647, 35.0469], 6); // Вказати координати

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(leafletMap);

      setMap(leafletMap);
    };

    if (!map) {
      initializeMap();
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map]);

  useEffect(() => {
    calculateRoute();
  }, [startMarker, endMarker]);

  const handleMapClick = (e) => {
    const latlng = e.latlng;
    console.log("Map clicked at:", latlng); // Логування координат

    if (!startMarker) {
      const marker = L.marker(latlng, {
        icon: L.icon({
          iconUrl: greenMarkerIcon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
        draggable: true, // Зробимо стартовий маркер перетягуваним
      }).addTo(map);

      // Відстеження перетягування маркера
      marker.on("dragend", () => {
        setStartMarker(marker); // Оновлюємо початковий маркер після перетягування
        calculateRoute(); // Перераховуємо маршрут після перетягування
      });

      setStartMarker(marker);
      console.log("Start marker set at:", latlng);
    } else if (!endMarker) {
      const marker = L.marker(latlng, {
        icon: L.icon({
          iconUrl: redMarkerIcon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
        draggable: true, // Зробимо кінцевий маркер перетягуваним
      }).addTo(map);

      // Відстеження перетягування маркера
      marker.on("dragend", () => {
        setEndMarker(marker); // Оновлюємо кінцевий маркер після перетягування
        calculateRoute(); // Перераховуємо маршрут після перетягування
      });

      setEndMarker(marker);
      console.log("End marker set at:", latlng);
    } else {
      console.log("Both markers are already set."); // Якщо обидва маркери вже встановлені
    }
  };

  const calculateRoute = () => {
    if (!startMarker || !endMarker) {
      console.log("Start or end marker is missing."); // Логування помилки
      return; // Вихід, якщо маркери не встановлені
    }

    const startLatLng = startMarker.getLatLng();
    const endLatLng = endMarker.getLatLng();
    console.log("Calculating route from:", startLatLng, "to:", endLatLng);

    if (routeControl) {
      map.removeControl(routeControl); // Якщо контроль маршруту вже є, видаляємо
    }

    // Видаляємо стартовий і кінцевий маркери після встановлення маршруту
    startMarker.remove();
    endMarker.remove();
    setStartMarker(null); // Очищуємо стейт
    setEndMarker(null);

    const routingControl = L.Routing.control({
      waypoints: [startLatLng, endLatLng],
      routeWhileDragging: true,
      show: false,
      createMarker: (i, waypoint, n) => {
        if (!waypoint || !waypoint.latLng) {
          return null;
        }

        if (i === 0) {
          const marker = L.marker(waypoint.latLng, {
            icon: L.icon({
              iconUrl: greenMarkerIcon,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }),
            draggable: true, // Стартовий маркер перетягуваний
          });

          // Відстеження перетягування стартового маркера
          marker.on("dragend", () => {
            setStartMarker(marker);
            calculateRoute(); // Перераховуємо маршрут після перетягування
          });

          return marker;
        } else if (i === n - 1) {
          const marker = L.marker(waypoint.latLng, {
            icon: L.icon({
              iconUrl: redMarkerIcon,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }),
            draggable: true, // Кінцевий маркер перетягуваний
          });

          // Відстеження перетягування кінцевого маркера
          marker.on("dragend", () => {
            setEndMarker(marker);
            calculateRoute(); // Перераховуємо маршрут після перетягування
          });

          return marker;
        }
        return null;
      },
    }).addTo(map);

    // Видаляємо всі попередні жовті маркери
    intermediateMarkers.forEach((marker) => marker.remove());
    setIntermediateMarkers([]);

    // Додаємо жовтий маркер при перетаскуванні проміжних точок
    routingControl.on("waypointschanged", function (e) {
      intermediateMarkers.forEach((marker) => marker.remove());

      const newMarkers = [];

      e.waypoints.forEach((waypoint, i) => {
        if (i > 0 && i < e.waypoints.length - 1 && waypoint.latLng) {
          const marker = L.marker(waypoint.latLng, {
            icon: L.icon({
              iconUrl: yellowMarkerIcon,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }),
            draggable: true, // Жовті маркери також перетягувані
          }).addTo(map);

          // Відстеження перетягування проміжного маркера
          marker.on("dragend", () => {
            calculateRoute(); // Перерахунок маршруту після перетягування
          });

          newMarkers.push(marker);
        }
      });

      setIntermediateMarkers(newMarkers); // Оновлюємо проміжні маркери
    });

    setRouteControl(routingControl);
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
  }, [map, startMarker, endMarker]);

  return <div style={{ height: "500px", width: "100%" }} ref={mapRef}></div>;
};

export default CreateRouteMap;
