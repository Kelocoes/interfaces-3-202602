import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
    @MinLength(3, { message: 'El nombre de usuario debe contener al menos 3 caracteres' })
    username: string;

    @IsEmail({}, { message: 'Debe ingresar un correo electrónico válido' })
    @IsNotEmpty({ message: 'El correo electrónico es requerido' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener mínimo 8 caracteres' })
    passwordHash: string;

    @IsOptional()
    @IsString()
    @MaxLength(200, { message: 'La biografía no puede exceder 200 caracteres' })
    bio?: string;

    @IsNotEmpty({ message: 'Debe especificar el id del rol del usuario' })
    roleId: number;
}
