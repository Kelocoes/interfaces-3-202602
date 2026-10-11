import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositiveIntPipe } from '../../common/pipes/positive-int-pipe';
import { PermissionsGuard } from '../guards/permissions/permissions.guard';
import { Permissions } from '../decorators/permissions.decorator';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post() //crea un nuevo recurso
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('manage_users')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get() // Endpoint para obtener todos los usuarios
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('manage_users') // revisa si tienes ese permiso especifico para para dejarte pasar a esa sección en particular.
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('manage_users')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('manage_users')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            return await this.userService.update(+id, updateUserDto);
        } catch (error) {
            // Si la excepción es del negocio (como UserNotFoundException), se relanza directamente
            if (error instanceof Error && 'status' in error) {
                throw error;
            }
            throw new InternalServerErrorException('Fallo al actualizar el usuario', {
                cause: error,
                description: 'Error inesperado al persistir los cambios en la base de datos.',
            });
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('manage_users')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        await this.userService.remove(+id);
    }
}
