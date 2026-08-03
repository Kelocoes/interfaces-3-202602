import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CatService } from './cat.service';
import { type Cat } from './cat.interface';

@Controller('cats')
export class CatController {
    constructor(private readonly catService: CatService) {}

    @Get()
    findAll(): Cat[] {
        return this.catService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Cat | undefined {
        return this.catService.findOne(id);
    }

    @Post()
    create(@Body('name') name: string): Cat {
        return this.catService.create(name);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body('name') name: string): Cat | undefined {
        return this.catService.update(id, name);
    }

    @Delete(':id')
    remove(@Param('id') id: string): boolean {
        return this.catService.remove(id);
    }
}
