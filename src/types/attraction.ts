export interface Attraction {
    id: string;
    title: string;
    description: string;
    createdAt: Date | string;
    rating: 1 | 2 | 3 | 4 | 5;
    photoUrl: string;
    location: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    status: 'planned' | 'visited';
}

export interface IFormData {
    title: string;
    description: string;
    rating: string;
    photoFile: File | null;
    photoUrl: string;
    location: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

export interface ILocationMarker {
    formData: IFormData;
    setCoordinates: (coords: {latitude: number; longitude: number}) => void;
    setLocation: (location: string) => void;
}
