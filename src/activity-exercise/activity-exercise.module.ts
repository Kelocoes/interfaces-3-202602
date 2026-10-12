import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityLog } from '../activity-log/entities/activity-log.entity';
import { RoutineExercise } from '../routine-exercise/entities/routine-exercise.entity';

import { ActivityExercise } from './entities/activity-exercise.entity';
import { ActivityExerciseService } from './activity-exercise.service';
import { ActivityExerciseController } from './activity-exercise.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ActivityExercise, ActivityLog, RoutineExercise])],
    controllers: [ActivityExerciseController],
    providers: [ActivityExerciseService],
    exports: [ActivityExerciseService],
})
export class ActivityExerciseModule {}
