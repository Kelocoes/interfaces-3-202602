import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateRoutineExerciseDto {
    @IsInt()
    @Min(1)
    routineId: number;

    @IsInt()
    @Min(1)
    exerciseId: number;

    @IsInt()
    @Min(1)
    orderIndex: number; // posición del ejercicio dentro de la rutina

    @IsOptional()
    @IsInt()
    @Min(0)
    targetSets?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    targetReps?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    targetWeightKg?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    targetDurationMin?: number;
}
