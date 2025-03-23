'use client';

import {Attraction} from '@/types/attraction';
import {create} from 'zustand';

interface AttractionStore {
    attractions: Attraction[];
    fetchAttractions: () => Promise<void>;
    addAttraction: (attraction: Omit<Attraction, 'id' | 'createdAt'>) => Promise<void>;
    updateStatus: (id: string, status: 'planned' | 'visited') => Promise<void>;
    updateAttraction: (
        id: string,
        attraction: Omit<Attraction, 'id' | 'createdAt'>,
    ) => Promise<void>;
    deleteAttraction: (id: string) => Promise<void>;
}

export const useAttractionStore = create<AttractionStore>((set) => ({
    attractions: [],
    fetchAttractions: async () => {
        const response = await fetch('/api/attractions');
        const data = await response.json();
        set({attractions: data});
    },
    addAttraction: async (attraction) => {
        const response = await fetch('/api/attractions', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(attraction),
        });
        const newAttraction = await response.json();
        set((state) => ({attractions: [...state.attractions, newAttraction]}));
    },
    updateAttraction: async (id, attraction) => {
        const response = await fetch(`/api/attractions/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(attraction),
        });
        const updatedAttraction = await response.json();
        if (response.ok) {
            set((state) => ({
                attractions: state.attractions.map((attr) =>
                    attr.id === id ? updatedAttraction : attr,
                ),
            }));
        }
    },
    updateStatus: async (id, status) => {
        const response = await fetch(`/api/attractions/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({status}),
        });
        const updatedAttraction = await response.json();
        if (response.ok) {
            set((state) => ({
                attractions: state.attractions.map((attr) =>
                    attr.id === id ? updatedAttraction : attr,
                ),
            }));
        }
    },
    deleteAttraction: async (id) => {
        const response = await fetch(`/api/attractions/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            set((state) => ({
                attractions: state.attractions.filter((attr) => attr.id !== id),
            }));
        } else {
            throw new Error('Ошибка при удалении');
        }
    },
}));
