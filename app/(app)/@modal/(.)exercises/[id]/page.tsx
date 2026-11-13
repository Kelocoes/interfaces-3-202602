import { notFound } from 'next/navigation';
import { Modal } from '@/components/modal';
import { ExerciseDetail } from '@/features/exercises/components/ExerciseDetail';
import { getExerciseById } from '@/features/exercises/services/exercises.service';

interface PageProps {
    params: Promise<{ id: string }>;
}


export default async function ExerciseModalPage({ params }: PageProps) {
    const { id } = await params;
    const exercise = await getExerciseById(Number(id));

    if (!exercise) notFound();

    return (
        <Modal>
            <ExerciseDetail exercise={exercise} />
        </Modal>
    );
}