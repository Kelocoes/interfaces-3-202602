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

import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';
import { ActivityLogsService } from './activity-logs.service';

interface AuthenticatedRequest extends Request {
    user: User;
}

@Controller('activity-logs')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ActivityLogsController {
    constructor(private readonly activityLogsService: ActivityLogsService) {}

    @Post()
    @Permissions('create_activity_log')
    @HttpCode(HttpStatus.CREATED)
    create(
        @Req() request: AuthenticatedRequest,
        @Body() dto: CreateActivityLogDto,
    ) {
        return this.activityLogsService.create(request.user.id, dto);
    }

    @Get()
    @Permissions('read_activity_log')
    findAll(@Req() request: AuthenticatedRequest) {
        return this.activityLogsService.findAll(request.user.id);
    }

    @Get(':id')
    @Permissions('read_activity_log')
    findOne(
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
    ) {
        return this.activityLogsService.findOne(id, request.user.id);
    }

    @Patch(':id')
    @Permissions('update_activity_log')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
        @Body() dto: UpdateActivityLogDto,
    ) {
        return this.activityLogsService.update(id, request.user.id, dto);
    }

    @Delete(':id')
    @Permissions('delete_activity_log')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
    ) {
        return this.activityLogsService.remove(id, request.user.id);
    }
}