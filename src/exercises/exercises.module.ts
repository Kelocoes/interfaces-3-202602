import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityLog } from './entities/activity-log.entity';
import { Exercise } from './entities/exercise.entity';
import { Routine } from './entities/routine.entity';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { RoutinesController } from './routines.controller';
import { RoutinesService } from './routines.service';
import { ActivityExercise } from './entities/activity-exercise.entity';
import { RoutineExercise } from './entities/routine-exercise.entity';
import { RoutineExercisesController } from './routine-exercises.controller';
import { RoutineExercisesService } from './routine-exercises.service';
import { ActivityLogsController } from './activity-logs.controller';
import { ActivityLogsService } from './activity-logs.service';
import { ActivityExercisesController } from './activity-exercises.controller';
import { ActivityExercisesService } from './activity-exercises.service';

@Module({
    imports: [TypeOrmModule.forFeature([Exercise, Routine, ActivityLog, ActivityExercise, RoutineExercise])],
    controllers: [ExercisesController, RoutinesController, RoutineExercisesController, ActivityLogsController, ActivityExercisesController],
    providers: [ExercisesService, RoutinesService, RoutineExercisesService, ActivityLogsService, ActivityExercisesService],
})
export class ExercisesModule {}
