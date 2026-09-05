import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from '../entities/role.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        const newRole = this.roleRepository.create(createRoleDto);
        return await this.roleRepository.save(newRole);
    }

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find();
    }

    async findOne(id: number): Promise<Role | null> {
        return await this.roleRepository.findOneBy({ id });
    }

    async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
        await this.roleRepository.update(id, updateRoleDto);
        return await this.roleRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<{ id: number } | null> {
        const result = await this.roleRepository.delete(id);
        if (result.affected) {
            return { id };
        }
        return null;
    }

    /**
     * Retorna todos los roles junto con su listado de usuarios asociados.
     * Utiliza find() con carga de relaciones.
     */
    async findAllWithUsers(): Promise<Role[]> {
        return await this.roleRepository.find({
            relations: {
                users: true,
            },
            order: {
                name: 'ASC',
            },
        });
    }

    /**
     * Retorna un rol con todos sus permisos anidados
     * a través de la relación rolePermissions -> permission.
     */
    async findOneWithPermissions(id: number): Promise<Role | null> {
        return await this.roleRepository.findOne({
            where: { id },
            relations: {
                rolePermissions: {
                    permission: true,
                },
            },
        });
    }

    /**
     * Busca roles cuyo nombre contenga un texto parcial (insensible a mayúsculas/minúsculas).
     * Utiliza ILike dentro de find().
     */
    async searchByName(term: string): Promise<Role[]> {
        return await this.roleRepository.find({
            where: {
                name: ILike(`%${term}%`),
            },
            order: {
                name: 'ASC',
            },
        });
    }
}
