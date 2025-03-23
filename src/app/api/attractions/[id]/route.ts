import {Attraction} from '@/types/attraction';
import {NextRequest, NextResponse} from 'next/server';
import {attractionsData} from '../attractionsList';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(req: NextRequest, {params}: {params: any}) {
    const id = params.id;

    try {
        const {status} = await req.json();

        const index = attractionsData.findIndex((a) => a.id === id);
        if (index === -1) {
            return NextResponse.json({message: 'Attraction not found'}, {status: 404});
        }

        attractionsData[index] = {...attractionsData[index], status};
        return NextResponse.json(attractionsData[index]);
    } catch (error) {
        return NextResponse.json({message: 'Invalid request body'}, {status: 400});
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: NextRequest, {params}: {params: any}) {
    const id = params.id;

    try {
        const body: Omit<Attraction, 'id' | 'createdAt'> = await req.json();
        const index = attractionsData.findIndex((a) => a.id === id);

        const updatedAttraction: Attraction = {
            ...body,
            id,
            createdAt: attractionsData[index].createdAt,
        };
        attractionsData[index] = updatedAttraction;
        return NextResponse.json(updatedAttraction);
    } catch (error) {
        return NextResponse.json({message: 'Invalid request body'}, {status: 400});
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(_req: NextRequest, {params}: {params: any}) {
    const id = params.id;

    try {
        const index = attractionsData.findIndex((a) => a.id === id);

        attractionsData.splice(index, 1);
        return NextResponse.json({message: 'Attraction deleted'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: 'Error deleting attraction'}, {status: 500});
    }
}
