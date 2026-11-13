import { NextResponse } from 'next/server';
import { routinesStore } from '@/features/routines/store';
import { validateRoutine } from '@/features/routines/validation';

export async function GET() {
    return NextResponse.json(routinesStore.list());
}


export async function POST(request: Request) {
    const body = await request.json().catch(() => null);

    const input = {
        name: String(body?.name ?? ''),
        description: String(body?.description ?? ''),
        level: String(body?.level ?? ''),
        exerciseIds: Array.isArray(body?.exerciseIds) ? body.exerciseIds.map(Number) : [],
    };

    const errors = validateRoutine(input);
    if (Object.keys(errors).length > 0) {
        return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json(routinesStore.create(input), { status: 201 });
}