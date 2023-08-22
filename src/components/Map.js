import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Map({ listing }) {
    const [position, setPosition] = useState([]);
    const [loading, setLoading] = useState(true);

    // get geolocation based on address
    useEffect(() => {
        const getPosition = async () => {
            const url = `https://geocode.maps.co/search?q=${encodeURIComponent(listing.address)}`;

            const response = await axios.get(url);
            const pos = response.data[0];
            // default lat = 0 lon = 0 if pos not avaiable
            setPosition([pos ? pos.lat : null, pos ? pos.lon : null]);
            setLoading(false);
        };
        getPosition();
    }, [listing]);
    if (!loading && !position && !position[0]) {
        return (
            <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                    <Popup>{listing.address}</Popup>
                </Marker>
            </MapContainer>
        );
    } else {
        return (
            <div className="h-full flex justify-center items-center">
                <div className="text-gray-500 font-semibold">Cannot show the address on map</div>
            </div>
        );
    }
}
