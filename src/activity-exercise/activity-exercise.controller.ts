import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositiveIntPipe } from '../common/pipes/positive-int-pipe';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

import { ActivityExerciseService } from './activity-exercise.service';
import { CreateActivityExerciseDto } from './dto/create-activity-exercise.dto';
import { UpdateActivityExerciseDto } from './dto/update-activity-exercise.dto';

// Registrar lo realizado en una sesión (reutiliza los permisos de activity_log)
@Controller('activity-exercises')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ActivityExerciseController {
    constructor(private readonly service: ActivityExerciseService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('update_activity_log')
    create(@Body() dto: CreateActivityExerciseDto) {
        return this.service.create(dto);
    }

    @Get()
    @Permissions('read_activity_log')
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @Permissions('read_activity_log')
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @Permissions('update_activity_log')
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateActivityExerciseDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @Permissions('update_activity_log')
    remove(@Param('id', PositiveIntPipe) id: number) {
        return this.service.remove(id);
    }
}
