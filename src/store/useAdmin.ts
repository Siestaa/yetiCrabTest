import {create} from 'zustand';

interface AdminStore {
    isAdmin: boolean;
    setIsAdmin: () => void;
}

export const useAdmin = create<AdminStore>((set) => ({
    isAdmin: false,
    setIsAdmin: () => {
        set((state) => ({
            isAdmin: !state.isAdmin,
        }));
    },
}));
