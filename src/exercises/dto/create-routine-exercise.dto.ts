import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateRoutineExerciseDto {
    @IsInt()
    @Min(1)
    exerciseId!: number;

    @IsInt()
    @Min(1)
    orderIndex!: number;

    @IsInt()
    @Min(0)
    targetSets!: number;

    @IsInt()
    @Min(0)
    targetReps!: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    targetWeightKg!: number;

    @IsInt()
    @Min(0)
    targetDurationMin!: number;
}
