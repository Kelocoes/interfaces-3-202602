
import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Body,
    Param,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';

import { RoutinesService } from './routines.service';

@Controller('routines')
export class RoutinesController {
    constructor(private readonly routinesService: RoutinesService) {}

    @Get()
    findAll() {
        return this.routinesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.routinesService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: any) {
        return this.routinesService.create(body);
    }

    @Patch(':id/toggle/:exerciseId')
    toggleDone(
        @Param('id', ParseIntPipe) id: number,
        @Param('exerciseId', ParseIntPipe) exerciseId: number,
    ) {
        return this.routinesService.toggleDone(id, exerciseId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.routinesService.remove(id);
    }
}
