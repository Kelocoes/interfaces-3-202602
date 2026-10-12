import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateRoutineDto } from './create-routine.dto';

// No se permite cambiar el dueño (userId) al actualizar
export class UpdateRoutineDto extends PartialType(OmitType(CreateRoutineDto, ['userId'] as const)) {}
