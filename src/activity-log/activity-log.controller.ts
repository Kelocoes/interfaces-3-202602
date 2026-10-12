import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositiveIntPipe } from '../common/pipes/positive-int-pipe';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

import { ActivityLogService } from './activity-log.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Controller('activity-logs')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ActivityLogController {
    constructor(private readonly service: ActivityLogService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('create_activity_log')
    create(@Body() dto: CreateActivityLogDto) {
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
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateActivityLogDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @Permissions('delete_activity_log')
    remove(@Param('id', PositiveIntPipe) id: number) {
        return this.service.remove(id);
    }
}
