import { Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, Min } from 'class-validator';

export class CreateActivityLogDto {
    @IsInt()
    @Min(1)
    userId: number;

    @IsInt()
    @Min(1)
    routineId: number;

    @Type(() => Date) // convierte el texto ISO del JSON en un objeto Date
    @IsDate()
    startedAt: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    completedAt?: Date;
}
