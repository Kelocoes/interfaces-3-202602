import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, ILike, IsNull, Not, Repository } from 'typeorm';

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
        private roleService: RoleService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const role = await this.roleService.findOne(createUserDto.roleId);
        if (!role) {
            throw new RoleNotFoundException(createUserDto.roleId);
        }

        const newUser = this.userRepository.create({
            ...createUserDto,
            role,
        });
        return await this.userRepository.save(newUser);
    }

    findAll() {
        return this.userRepository.find({
            relations: {
                role: true,
            },
        });
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new UserNotFoundException(id);
        }
        return user;
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
        await this.userRepository.update(id, updateUserDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        await this.findOne(id);
        const result = await this.userRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
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
