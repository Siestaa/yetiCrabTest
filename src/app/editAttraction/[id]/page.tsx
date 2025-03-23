import {EditAttractionForm} from '@/components/EditAttractionForm/EditAttractionForm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditAttractionPage({params}: {params: any}) {
    return <EditAttractionForm id={params.id} />;
}
