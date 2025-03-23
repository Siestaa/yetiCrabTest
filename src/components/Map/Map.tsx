'use client';

import {ILocationMarker} from '@/types/attraction';
import L from 'leaflet';
import {useState} from 'react';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import {MapEventsHandler} from './MapEventsHandler';

export const Map = ({setCoordinates, formData, setLocation}: ILocationMarker) => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    const customIcon = L.icon({
        iconUrl: '/marker-icon.png',
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    });

    return (
        <MapContainer
            center={[formData.coordinates.latitude, formData.coordinates.longitude]}
            zoom={13}
            style={{height: '300px', width: '100%'}}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapEventsHandler
                setCoordinates={setCoordinates}
                setPosition={setPosition}
                setLocation={setLocation}
            />
            <Marker
                position={
                    position
                        ? position
                        : [formData.coordinates.latitude, formData.coordinates.longitude]
                }
                icon={customIcon}
            />
        </MapContainer>
    );
};
