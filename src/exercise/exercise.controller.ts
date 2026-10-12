import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositiveIntPipe } from '../common/pipes/positive-int-pipe';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercises')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ExerciseController {
    constructor(private readonly exerciseService: ExerciseService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('manage_exercises')
    create(@Body() dto: CreateExerciseDto) {
        return this.exerciseService.create(dto);
    }

    @Get()
    @Permissions('read_exercise')
    findAll() {
        return this.exerciseService.findAll();
    }

    @Get(':id')
    @Permissions('read_exercise')
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.exerciseService.findOne(id);
    }

    @Patch(':id')
    @Permissions('manage_exercises')
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateExerciseDto) {
        return this.exerciseService.update(id, dto);
    }

    @Delete(':id')
    @Permissions('manage_exercises')
    remove(@Param('id', PositiveIntPipe) id: number) {
        return this.exerciseService.remove(id);
    }
}
