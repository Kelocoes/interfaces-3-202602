import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EXERCISES } from '@/features/exercises/data';
import { ExerciseDetail } from '@/features/exercises/components/ExerciseDetail';
import { getExerciseById } from '@/features/exercises/services/exercises.service';

interface PageProps {
    params: Promise<{ id: string }>;
}

export function generateStaticParams() {
    return EXERCISES.map((e) => ({ id: String(e.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const exercise = await getExerciseById(Number(id));
    return { title: exercise?.name ?? 'Ejercicio no encontrado' };
}

export default async function ExercisePage({ params }: PageProps) {
    const { id } = await params;
    const exercise = await getExerciseById(Number(id));
    if (!exercise) notFound();

    return (
        <div className="space-y-4">
            <Link href="/exercises" className="link">← Volver a ejercicios</Link>
            <ExerciseDetail exercise={exercise} />
        </div>
    );
}
