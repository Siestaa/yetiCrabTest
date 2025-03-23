import {Attraction} from '@/types/attraction';
import {NextRequest, NextResponse} from 'next/server';
import {attractionsData} from './attractionsList';

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json(attractionsData);
    }

    const attraction = attractionsData.find((a) => a.id === id);
    return attraction
        ? NextResponse.json(attraction)
        : NextResponse.json({message: 'Attraction not found'}, {status: 404});
}

export async function POST(req: NextRequest) {
    const body: Omit<Attraction, 'id' | 'createdAt'> = await req.json();
    const newAttraction: Attraction = {
        ...body,
        id: crypto.randomUUID(),
        createdAt: new Date(),
    };
    attractionsData.push(newAttraction);
    return NextResponse.json(newAttraction, {status: 201});
}

export async function PATCH(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({message: 'ID is required'}, {status: 400});
    }

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
}
