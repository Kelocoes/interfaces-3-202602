import {
    IsDateString,
    IsInt,
    IsNumber,
    IsOptional,
    IsPositive,
    Min,
} from 'class-validator';

export class CreateActivityExerciseDto {
    @IsInt()
    @IsPositive()
    routineExerciseId!: number;

    @IsInt()
    @Min(0)
    actualSets!: number;

    @IsInt()
    @Min(0)
    actualReps!: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    actualWeightKg!: number;

    @IsInt()
    @Min(0)
    actualDurationMin!: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    caloriesBurned!: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    distanceCoveredKm!: number;

    @IsDateString()
    startedAt!: string;

    @IsOptional()
    @IsDateString()
    completedAt?: string | null;
}
