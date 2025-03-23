import {useMapEvents} from 'react-leaflet';

export const MapEventsHandler = ({
    setCoordinates,
    setPosition,
    setLocation,
}: {
    setCoordinates: (coords: {latitude: number; longitude: number}) => void;
    setPosition: (pos: [number, number] | null) => void;
    setLocation: (loc: string) => void;
}) => {
    useMapEvents({
        click(e) {
            const {lat, lng} = e.latlng;
            setPosition([lat, lng]);
            setCoordinates({latitude: lat, longitude: lng});

            fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            )
                .then((response) => response.json())
                .then((data) => {
                    const locationName = data.display_name || 'Неизвестное место';
                    const reversedLocationName = locationName.split(', ').reverse().join(', ');
                    setLocation(reversedLocationName);
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.error('Ошибка геокодирования:', error);
                });
        },
    });
    return null;
};
