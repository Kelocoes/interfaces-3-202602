import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';

export class CreateActivityLogDto {
    @IsInt()
    @IsPositive()
    routineId!: number;

    @IsDateString()
    startedAt!: string;

    @IsOptional()
    @IsDateString()
    completedAt?: string | null;
}
