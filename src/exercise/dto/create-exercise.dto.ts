import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateExerciseDto {
    @IsString() @IsNotEmpty() @MaxLength(100)
    name: string;

    @IsOptional() @IsString()          // opcional
    description?: string;

    @IsString() @IsNotEmpty() @MaxLength(50)
    type: string;

    @IsOptional() @IsNumber() @Min(0)
    estimatedCalories?: number;

    @IsOptional() @IsNumber() @Min(0)
    estimatedDistanceKm?: number;

    @IsOptional() @IsInt() @Min(0)
    estimatedDurationMin?: number;

    @IsOptional() @IsString() @MaxLength(100)
    icon?: string;
}