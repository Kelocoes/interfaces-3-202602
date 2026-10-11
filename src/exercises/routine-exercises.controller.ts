import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { User } from '../auth/entities/user.entity';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';

import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';
import { RoutineExercisesService } from './routine-exercises.service';

interface AuthenticatedRequest extends Request {
    user: User;
}

@Controller('routines/:routineId/exercises')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RoutineExercisesController {
    constructor(
        private readonly routineExercisesService: RoutineExercisesService,
    ) {}

    @Post()
    @Permissions('update_routine')
    @HttpCode(HttpStatus.CREATED)
    create(
        @Param('routineId', ParseIntPipe) routineId: number,
        @Req() request: AuthenticatedRequest,
        @Body() dto: CreateRoutineExerciseDto,
    ) {
        return this.routineExercisesService.create(
            routineId,
            request.user.id,
            dto,
        );
    }

    @Get()
    @Permissions('read_routine')
    findAll(
        @Param('routineId', ParseIntPipe) routineId: number,
        @Req() request: AuthenticatedRequest,
    ) {
        return this.routineExercisesService.findAll(routineId, request.user.id);
    }

    @Get(':id')
    @Permissions('read_routine')
    findOne(
        @Param('routineId', ParseIntPipe) routineId: number,
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
    ) {
        return this.routineExercisesService.findOne(
            routineId,
            id,
            request.user.id,
        );
    }

    @Patch(':id')
    @Permissions('update_routine')
    update(
        @Param('routineId', ParseIntPipe) routineId: number,
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
        @Body() dto: UpdateRoutineExerciseDto,
    ) {
        return this.routineExercisesService.update(
            routineId,
            id,
            request.user.id,
            dto,
        );
    }

    @Delete(':id')
    @Permissions('delete_routine')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Param('routineId', ParseIntPipe) routineId: number,
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
    ) {
        return this.routineExercisesService.remove(
            routineId,
            id,
            request.user.id,
        );
    }
}