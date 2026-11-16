
import { NextResponse } from 'next/server';
import { validateRoutine } from '@/features/routines/validation';

const API_URL = 'http://localhost:4000/routines';

// GET /api/routines -> lista las rutinas desde NestJS
// GET /api/routines?level=intermedio -> filtra por nivel
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level');

    const response = await fetch(API_URL, {
        cache: 'no-store',
    });

    if (!response.ok) {
        return NextResponse.json(
            { message: 'No se pudieron obtener las rutinas' },
            { status: response.status }
        );
    }

    const routines = await response.json();

    const filteredRoutines = level
        ? routines.filter((routine: { level: string }) => routine.level === level)
        : routines;

    return NextResponse.json(filteredRoutines);
}

// POST /api/routines -> crea una rutina en NestJS
export async function POST(request: Request) {
    const body = await request.json().catch(() => null);

    const input = {
        name: String(body?.name ?? ''),
        description: String(body?.description ?? ''),
        level: String(body?.level ?? ''),
        exerciseIds: Array.isArray(body?.exerciseIds)
            ? body.exerciseIds.map(Number)
            : [],
    };

    const errors = validateRoutine(input);

    if (Object.keys(errors).length > 0) {
        return NextResponse.json({ errors }, { status: 400 });
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
}
