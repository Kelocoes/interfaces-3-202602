import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateActivityExerciseDto {
    @IsInt()
    @Min(1)
    activityLogId: number;

    @IsInt()
    @Min(1)
    routineExerciseId: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    actualSets?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    actualReps?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    actualWeightKg?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    actualDurationMin?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    caloriesBurned?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    distanceCoveredKm?: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    startedAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    completedAt?: Date;
}
