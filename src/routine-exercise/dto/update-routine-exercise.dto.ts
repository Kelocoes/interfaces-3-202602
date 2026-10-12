import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateRoutineExerciseDto } from './create-routine-exercise.dto';

export class UpdateRoutineExerciseDto extends PartialType(
    OmitType(CreateRoutineExerciseDto, ['routineId', 'exerciseId'] as const),
) {}
