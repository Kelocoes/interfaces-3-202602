import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateRoutineDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;

    @IsOptional()
    @IsString()
    @MaxLength(2000)
    description?: string | null;
}
