import { PartialType } from '@nestjs/mapped-types';

import { CreateExerciseDto } from './create-exercise.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {}
