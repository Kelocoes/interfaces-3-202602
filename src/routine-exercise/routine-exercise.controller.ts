import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositiveIntPipe } from '../common/pipes/positive-int-pipe';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

import { RoutineExerciseService } from './routine-exercise.service';
import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';

// Agregar/quitar ejercicios de una rutina; modificar la rutina, por eso reutiliza los permisos de rutina
@Controller('routine-exercises')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RoutineExerciseController {
    constructor(private readonly service: RoutineExerciseService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('update_routine')
    create(@Body() dto: CreateRoutineExerciseDto) {
        return this.service.create(dto);
    }

    @Get()
    @Permissions('read_routine')
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @Permissions('read_routine')
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @Permissions('update_routine')
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateRoutineExerciseDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @Permissions('update_routine')
    remove(@Param('id', PositiveIntPipe) id: number) {
        return this.service.remove(id);
    }
}
