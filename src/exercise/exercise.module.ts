import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Exercise } from './entities/exercise.entity';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Exercise])], // registra Repository<Exercise>
    controllers: [ExerciseController],
    providers: [ExerciseService],
    exports: [ExerciseService],
})
export class ExerciseModule {}
