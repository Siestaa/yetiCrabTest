import {EditAttractionForm} from '@/components/EditAttractionForm/EditAttractionForm';

export default function EditAttractionPage({params}: {params: {id: string}}) {
    return <EditAttractionForm id={params.id} />;
}
