import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateExerciseDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    type!: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Max(100000)
    estimatedCalories!: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Max(100000)
    estimatedDistanceKm!: number;

    @IsInt()
    @Min(0)
    @Max(100000)
    estimatedDurationMin!: number;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    icon?: string;
}
