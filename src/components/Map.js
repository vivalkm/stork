import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Map({ listing }) {
    const [position, setPosition] = useState([0, 0]);
    const [loading, setLoading] = useState(true);

    // get geolocation based on address
    useEffect(() => {
        const getPosition = async () => {
            const url = `https://geocode.maps.co/search?q=${encodeURIComponent(listing.address)}`;

            const response = await axios.get(url);
            const pos = response.data[0];
            setPosition([pos.lat, pos.lon]);
            setLoading(false);
        };
        getPosition();
    }, [listing]);

    if (!loading)
        return (
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>{listing.address}</Popup>
                </Marker>
            </MapContainer>
        );
}
