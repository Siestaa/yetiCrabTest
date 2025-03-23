import {Attraction} from '@/types/attraction';

export const createAttraction = (
    data: Omit<Attraction, 'id' | 'createdAt' | 'status'>,
): Attraction => {
    return {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        status: 'planned',
        ...data,
    };
};
