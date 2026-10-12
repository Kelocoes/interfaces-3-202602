import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Routine } from '../routine/entities/routine.entity';
import { Exercise } from '../exercise/entities/exercise.entity';

import { RoutineExercise } from './entities/routine-exercise.entity';
import { RoutineExerciseService } from './routine-exercise.service';
import { RoutineExerciseController } from './routine-exercise.controller';

@Module({
    imports: [TypeOrmModule.forFeature([RoutineExercise, Routine, Exercise])],
    controllers: [RoutineExerciseController],
    providers: [RoutineExerciseService],
    exports: [RoutineExerciseService],
})
export class RoutineExerciseModule {}
