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

import { Permissions } from '../auth/decorators/permissions.decorator';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { User } from '../auth/entities/user.entity';

import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { RoutinesService } from './routines.service';

interface AuthenticatedRequest extends Request {
    user: User;
}

@Controller('routines')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RoutinesController {
    constructor(private readonly routinesService: RoutinesService) {}

    @Post()
    @Permissions('create_routine')
    @HttpCode(HttpStatus.CREATED)
    create(
        @Req() request: AuthenticatedRequest,
        @Body() dto: CreateRoutineDto,
    ) {
        return this.routinesService.create(request.user.id, dto);
    }

    @Get()
    @Permissions('read_routine')
    findAll(@Req() request: AuthenticatedRequest) {
        return this.routinesService.findAll(request.user.id);
    }

    @Get(':id')
    @Permissions('read_routine')
    findOne(
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
    ) {
        return this.routinesService.findOne(id, request.user.id);
    }

    @Patch(':id')
    @Permissions('update_routine')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
        @Body() dto: UpdateRoutineDto,
    ) {
        return this.routinesService.update(id, request.user.id, dto);
    }

    @Delete(':id')
    @Permissions('delete_routine')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(
        @Param('id', ParseIntPipe) id: number,
        @Req() request: AuthenticatedRequest,
    ) {
        return this.routinesService.remove(id, request.user.id);
    }
}