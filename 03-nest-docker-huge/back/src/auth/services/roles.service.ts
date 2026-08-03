import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
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

    async update(
        id: number,
        updateRoleDto: UpdateRoleDto,
    ): Promise<Role | null> {
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

    async findByName(name: string): Promise<Role | null> {
        return await this.roleRepository.findOneBy({ name });
    }
}
