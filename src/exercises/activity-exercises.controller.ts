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
import type { Request } from 'express';

import { User } from '../auth/entities/user.entity';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';

import { CreateActivityExerciseDto } from './dto/create-activity-exercise.dto';
import { UpdateActivityExerciseDto } from './dto/update-activity-exercise.dto';
import { ActivityExercisesService } from './activity-exercises.service';

interface AuthenticatedRequest extends Request {
    user: User;
}

@Controller('activity-logs/:activityLogId/exercises')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ActivityExercisesController {
    constructor(
        private readonly activityExercisesService: ActivityExercisesService,
    ) {}

    @Post()
    @Permissions('update_activity_log')
    @HttpCode(HttpStatus.CREATED)
    create(
        @Param('activityLogId', ParseIntPipe) activityLogId: number,
        @Req() request: AuthenticatedRequest,
        @Body() dto: CreateActivityExerciseDto,
    ) {
        return this.activityExercisesService.create(
            activityLogId,
            request.user.id,
            dto,
        );
    }

    @Get()
    @Permissions('read_activity_log')
    findAll(
        @Param('activityLogId', ParseIntPipe) activityLogId: number,
        @Req() request: AuthenticatedRequest,
    ) {
        return this.activityExercisesService.findAll(
            activityLogId,
            request.user.id,
        );
    }

    @Get(':id')
    @Permissions('read_activity_log')
    findOne(
        @Param('activityLogId', ParseIntPipe) activityLogId: number,
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
    ) {
        return this.activityExercisesService.findOne(
            activityLogId,
            id,
            request.user.id,
        );
    }

    @Patch(':id')
    @Permissions('update_activity_log')
    update(
        @Param('activityLogId', ParseIntPipe) activityLogId: number,
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
        @Body() dto: UpdateActivityExerciseDto,
    ) {
        return this.activityExercisesService.update(
            activityLogId,
            id,
            request.user.id,
            dto,
        );
    }

    @Delete(':id')
    @Permissions('delete_activity_log')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Param('activityLogId', ParseIntPipe) activityLogId: number,
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
    ) {
        return this.activityExercisesService.remove(
            activityLogId,
            id,
            request.user.id,
        );
    }
}