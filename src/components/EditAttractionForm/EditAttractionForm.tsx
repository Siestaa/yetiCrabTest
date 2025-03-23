'use client';

import {useAttractionStore} from '@/store/useAttractionStore';
import {CreateAttractionForm} from '../createForm/CreateAttractionForm';

interface EditAttractionFormProps {
    id: string;
}

export const EditAttractionForm = ({id}: EditAttractionFormProps) => {
    const {attractions} = useAttractionStore();

    return (
        <>
            <CreateAttractionForm
                attraction={attractions.find((attraction) => attraction.id === id)}
            />
        </>
    );
};
