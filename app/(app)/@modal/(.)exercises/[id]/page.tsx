import { notFound } from 'next/navigation';
import { Modal } from '@/components/modal';
import { ExerciseDetail } from '@/features/exercises/components/ExerciseDetail';
import { getExerciseById } from '@/features/exercises/services/exercises.service';

export default async function ExerciseModal({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const exercise = await getExerciseById(Number(id));
    if (!exercise) notFound();
    return (
        <Modal>
            <ExerciseDetail exercise={exercise} />
        </Modal>
    );
}
