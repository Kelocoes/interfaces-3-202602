import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Role } from '../entities/role.entity';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
    controllers: [RoleController],
    providers: [RoleService],
    imports: [TypeOrmModule.forFeature([Role])],
})
export class RoleModule {}
