import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Between, ILike, IsNull, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { RoleNotFoundException, UserNotFoundException } from '../../common/exceptions';
import { User } from '../entities/user.entity';
import { RoleService } from '../role/role.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RoleService,
        private readonly configService: ConfigService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { roleId, ...userData } = createUserDto;
        const role = await this.roleService.findOne(roleId);
        if (!role) {
            throw new RoleNotFoundException(roleId);
        }

        const saltRounds = parseInt(this.configService.get<string>('SALT_ROUNDS') ?? '10', 10);

        const passwordHashed = await bcrypt.hash(userData.passwordHash, saltRounds);
        // Hashea la contraseña utilizando bcrypt.hash con el número de iteraciones de salt especificado.

        // Crea y asigna los datos del usuario, la contraseña hasheada y el rol correspondiente.
        const user = this.userRepository.create({
            ...userData,
            passwordHash: passwordHashed,
            role,
        });

        //Esto es para guardar el usuario en la base de datos y devolverlo sin la contraseña hasheada.
        const savedUser = await this.userRepository.save(user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash: _, ...userWithoutPassword } = savedUser;
        return userWithoutPassword as User;
    }

    findAll() {
        return this.userRepository.find({
            relations: {
                //"cuando traigas cada User, tráeme también su Role completo pegado ahí mismo"
                role: true,
            },
        });
    }

    async findOne(id: number, relations: boolean = false): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: { role: relations ? { rolePermissions: { permission: true } } : false },
        });
        //si no se encontró nada devuelve "null" cuando no hay resultado (lanzas la excepción y cortas ahí).
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: {
                role: {
                    rolePermissions: {
                        permission: true,
                    },
                },
            },
        });
        return user || null;
    }

    // /**
    //  * Find one user with their role
    //  */
    // findOne(id: number) {
    //     return this.userRepository.findOne({
    //         where: { id },
    //         relations: ['role'],
    //     });
    // }

    // /**
    //  * Find user with role and permissions
    //  */
    // async findOneWithPermissions(id: number) {
    //     return await this.userRepository.findOne({
    //         where: { id },
    //         relations: ['role', 'role.permissions'],
    //     });
    // }

    // /**
    //  * Find all users with their roles and permissions
    //  */
    // async findAllWithPermissions() {
    //     return await this.userRepository.find({
    //         relations: ['role', 'role.permissions'],
    //         order: { createdAt: 'DESC' },
    //     });
    // }

    async update(id: number, updateUserDto: UpdateUserDto) {
        if (updateUserDto.roleId) {
            const role = await this.roleService.findOne(updateUserDto.roleId);
            if (!role) {
                throw new RoleNotFoundException(updateUserDto.roleId);
            }
        }

        await this.findOne(id);
        await this.userRepository.update(id, updateUserDto); //aplica solo aplica para crear registros nuevos directamente, no para actualizar registros existentes. Por eso se hace un findOne antes de actualizar.
        return this.findOne(id); //al final, vuelve a buscar el usuario ya actualizado y lo devuelve completo
    }

    async remove(id: number) {
        await this.findOne(id); //valida si el usuario existe antes de intentar eliminarlo, si no existe lanza la excepción UserNotFoundException
        const result = await this.userRepository.delete(id);
        if (result.affected) { //si se eliminó algún registro, devuelve un objeto con el id del usuario eliminado
            return { id };
        }
        return null; //si no se eliminó ningún registro, devuelve null
    }

    /**
     * Find users by role name
     */
    async findByRole(roleName: string) {
        return await this.userRepository.find({
            where: { role: { name: roleName } },
            relations: {
                role: true,
            },
            order: { username: 'ASC' },
        });
    }

    /**
     * Count total users
     */
    async count(): Promise<number> {
        return await this.userRepository.count();
    }

    /**
     * Count users by role
     */
    async countByRole(roleName: string): Promise<number> {
        return await this.userRepository.count({
            where: { role: { name: roleName } },
        });
    }

    /**
     * Retorna usuarios registrados dentro de un rango de fechas con paginación.
     * Demuestra el operador Between(), ordenamiento y paginación con findAndCount().
     */
    async findUsersCreatedBetween(startDate: Date, endDate: Date, limit = 10, offset = 0) {
        return await this.userRepository.findAndCount({
            where: {
                createdAt: Between(startDate, endDate),
            },
            relations: {
                role: true,
            },
            order: {
                createdAt: 'DESC',
            },
            take: limit,
            skip: offset,
        });
    }

    /**
     * Búsqueda por coincidencia parcial en username o email, requiriendo que tenga bio.
     * Demuestra condiciones tipo OR (pasando un arreglo a where) y el operador Not(IsNull()).
     */
    async searchUsersWithBio(term: string) {
        return await this.userRepository.find({
            where: [
                { username: ILike(`%${term}%`), bio: Not(IsNull()) },
                { email: ILike(`%${term}%`), bio: Not(IsNull()) },
            ],
            relations: {
                role: true,
            },
            order: {
                username: 'ASC',
            },
        });
    }

    /**
     * Obtiene el usuario con su rol y los permisos asociados cargando relaciones anidadas
     * con findOne() sin necesidad de QueryBuilder.
     */
    async getUserWithPermissions(userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: {
                role: {
                    rolePermissions: {
                        permission: true,
                    },
                },
            },
        });

        if (!user) {
            return null;
        }

        const permissions = user.role?.rolePermissions?.map((rp) => rp.permission) || [];
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            createdAt: user.createdAt,
            role: {
                id: user.role.id,
                name: user.role.name,
                description: user.role.description,
            },
            permissions,
        };
    }
}
