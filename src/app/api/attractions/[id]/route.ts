import {Attraction} from '@/types/attraction';
import {NextRequest, NextResponse} from 'next/server';
import {attractionsData} from '../attractionsList';

export async function PATCH(req: NextRequest, {params}: {params: {id: string}}) {
    const id = params.id;

    if (!id) {
        return NextResponse.json({message: 'ID is required'}, {status: 400});
    }

    try {
        const {status} = await req.json();
        if (status !== 'planned' && status !== 'visited') {
            return NextResponse.json({message: 'Invalid status'}, {status: 400});
        }

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

export async function PUT(req: NextRequest, {params}: {params: {id: string}}) {
    const id = params.id;

    if (!id) {
        return NextResponse.json({message: 'ID is required'}, {status: 400});
    }

    try {
        const body: Omit<Attraction, 'id' | 'createdAt'> = await req.json();
        const index = attractionsData.findIndex((a) => a.id === id);
        if (index === -1) {
            return NextResponse.json({message: 'Attraction not found'}, {status: 404});
        }

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

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
    const id = params.id;

    if (!id) {
        return NextResponse.json({message: 'ID is required'}, {status: 400});
    }

    try {
        const index = attractionsData.findIndex((a) => a.id === id);
        if (index === -1) {
            return NextResponse.json({message: 'Attraction not found'}, {status: 404});
        }

        attractionsData.splice(index, 1);
        return NextResponse.json({message: 'Attraction deleted'}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: 'Error deleting attraction'}, {status: 500});
    }
}
