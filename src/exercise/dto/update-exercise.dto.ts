import { PartialType } from '@nestjs/mapped-types';

import { CreateExerciseDto } from './create-exercise.dto';

// PartialType = el mismo DTO pero con todos los campos opcionales (para PATCH)
export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {}