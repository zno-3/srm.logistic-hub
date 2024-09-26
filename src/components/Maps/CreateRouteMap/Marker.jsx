import React, { useEffect } from "react";
import L from "leaflet";
import greenMarkerIcon from "../../../assets/markers/marker-green.png";
import redMarkerIcon from "../../../assets/markers/marker-red.png";
import markerShadow from "../../../assets/markers/marker-shadow.png";


const Marker = ({ map, latlng, iconType, onDragEnd }) => {
    useEffect(() => {
        const markerIcon = L.icon({
          iconUrl: iconType === "start" ? greenMarkerIcon : redMarkerIcon,
          shadowUrl: markerShadow, // Додаємо тінь
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          shadowSize: [41, 41],
        });
    
        const marker = L.marker(latlng, {
          icon: markerIcon,
          draggable: true,
        }).addTo(map);
    
        // Відкриття попапу при створенні маркера
        const popup = L.popup({
          autoClose: false,
          closeOnClick: false,
          closeButton: false, // Приховуємо кнопку закриття
          className: "", // Без додаткових класів
          offset: L.point(0, -20)
        })
          .setLatLng(latlng)
          .setContent(iconType === "start" ? "Початкова точка" : "Кінцева точка")
          .openOn(map);
    
        // Додаємо інлайн-стилі до попапу для зникнення через 2 секунди
        const popupElement = popup.getElement();
        popupElement.style.transition = "opacity 0.5s ease-out";
        popupElement.style.opacity = "1";
    
        setTimeout(() => {
          popupElement.style.opacity = "0"; // Плавне зникання
          setTimeout(() => {
            map.closePopup(popup);
          }, 500); // Закриття попапу після анімації
        }, 1000);
    
        marker.on("dragend", (e) => {
          onDragEnd(e.target.getLatLng());
        });
    
        return () => {
          map.removeLayer(marker);
        };
      }, [map, latlng, iconType, onDragEnd]);
    
      return null;
    };
export default Marker;
