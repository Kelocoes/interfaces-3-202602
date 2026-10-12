import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateActivityLogDto } from './create-activity-log.dto';

export class UpdateActivityLogDto extends PartialType(
    OmitType(CreateActivityLogDto, ['userId', 'routineId'] as const),
) {}
