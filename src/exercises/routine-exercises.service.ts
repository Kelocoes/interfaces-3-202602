import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityExercise } from './entities/activity-exercise.entity';
import { Exercise } from './entities/exercise.entity';
import { Routine } from './entities/routine.entity';
import { RoutineExercise } from './entities/routine-exercise.entity';
import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';

@Injectable()
export class RoutineExercisesService {
    constructor(
        @InjectRepository(RoutineExercise)
        private readonly routineExerciseRepository: Repository<RoutineExercise>,
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
        @InjectRepository(Exercise)
        private readonly exerciseRepository: Repository<Exercise>,
        @InjectRepository(ActivityExercise)
        private readonly activityExerciseRepository: Repository<ActivityExercise>,
    ) {}

    async create(
        routineId: number,
        userId: number,
        dto: CreateRoutineExerciseDto,
    ): Promise<RoutineExercise> {
        await this.findOwnedRoutine(routineId, userId);
        const exercise = await this.findExercise(dto.exerciseId);

        const routineExercise = this.routineExerciseRepository.create({
            ...dto,
            routine: { id: routineId },
            exercise,
        });

        const saved = await this.routineExerciseRepository.save(routineExercise);
        return this.findOne(routineId, saved.id, userId);
    }

    async findAll(routineId: number, userId: number): Promise<RoutineExercise[]> {
        await this.findOwnedRoutine(routineId, userId);

        return this.routineExerciseRepository.find({
            where: {
                routine: {
                    id: routineId,
                    user: { id: userId },
                },
            },
            relations: { exercise: true },
            order: { orderIndex: 'ASC' },
        });
    }

    async findOne(
        routineId: number,
        id: number,
        userId: number,
    ): Promise<RoutineExercise> {
        const routineExercise = await this.routineExerciseRepository.findOne({
            where: {
                id,
                routine: {
                    id: routineId,
                    user: { id: userId },
                },
            },
            relations: { exercise: true },
        });

        if (!routineExercise) {
            throw new NotFoundException(
                `No se encontró el ejercicio ${id} dentro de la rutina ${routineId}`,
            );
        }

        return routineExercise;
    }

    async update(
        routineId: number,
        id: number,
        userId: number,
        dto: UpdateRoutineExerciseDto,
    ): Promise<RoutineExercise> {
        const routineExercise = await this.findOne(routineId, id, userId);

        if (dto.exerciseId !== undefined) {
            routineExercise.exercise = await this.findExercise(dto.exerciseId);
        }

        if (dto.orderIndex !== undefined) {
            routineExercise.orderIndex = dto.orderIndex;
        }

        if (dto.targetSets !== undefined) {
            routineExercise.targetSets = dto.targetSets;
        }

        if (dto.targetReps !== undefined) {
            routineExercise.targetReps = dto.targetReps;
        }

        if (dto.targetWeightKg !== undefined) {
            routineExercise.targetWeightKg = dto.targetWeightKg;
        }

        if (dto.targetDurationMin !== undefined) {
            routineExercise.targetDurationMin = dto.targetDurationMin;
        }

        await this.routineExerciseRepository.save(routineExercise);
        return this.findOne(routineId, id, userId);
    }

    async remove(routineId: number, id: number, userId: number): Promise<void> {
        const routineExercise = await this.findOne(routineId, id, userId);
        const activityCount = await this.activityExerciseRepository.count({
            where: { routineExercise: { id } },
        });

        if (activityCount > 0) {
            throw new ConflictException(
                'No se puede quitar este ejercicio porque ya aparece en sesiones registradas',
            );
        }

        await this.routineExerciseRepository.remove(routineExercise);
    }

    private async findOwnedRoutine(routineId: number, userId: number): Promise<Routine> {
        const routine = await this.routineRepository.findOne({
            where: { id: routineId, user: { id: userId } },
        });

        if (!routine) {
            throw new NotFoundException(`No se encontró la rutina con id ${routineId}`);
        }

        return routine;
    }

    private async findExercise(exerciseId: number): Promise<Exercise> {
        const exercise = await this.exerciseRepository.findOneBy({ id: exerciseId });

        if (!exercise) {
            throw new NotFoundException(`No se encontró el ejercicio con id ${exerciseId}`);
        }

        return exercise;
    }
}