import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositiveIntPipe } from '../common/pipes/positive-int-pipe';
import { PermissionsGuard } from '../auth/guards/permissions/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Controller('routines')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RoutineController {
    constructor(private readonly routineService: RoutineService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('create_routine')
    create(@Body() dto: CreateRoutineDto) {
        return this.routineService.create(dto);
    }

    @Get()
    @Permissions('read_routine')
    findAll() {
        return this.routineService.findAll();
    }

    @Get(':id')
    @Permissions('read_routine')
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.routineService.findOne(id);
    }

    @Patch(':id')
    @Permissions('update_routine')
    update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateRoutineDto) {
        return this.routineService.update(id, dto);
    }

    @Delete(':id')
    @Permissions('delete_routine')
    remove(@Param('id', PositiveIntPipe) id: number) {
        return this.routineService.remove(id);
    }
}
