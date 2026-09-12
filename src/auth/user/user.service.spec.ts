import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { RoleService } from '../role/role.service';

import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;

    const mockRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
    };

    const mockRoleService = {
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        jest.clearAllMocks();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: getRepositoryToken(User), useValue: mockRepository },
                { provide: RoleService, useValue: mockRoleService },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all users with relations role', async () => {
        const mockUsers = [
            {
                id: 1,
                username: 'user1',
                email: 'user1@gmail.com',
                bio: '',
                role: {
                    id: 1,
                    name: 'user',
                },
                passwordHash: '',
                createdAt: new Date(),
            },
        ];

        mockRepository.find.mockResolvedValue(mockUsers);

        expect(await service.findAll()).toEqual(mockUsers);
        expect(mockRepository.find).toHaveBeenCalledWith({
            relations: { role: true },
        });
    });

    it('should return one user by id', async () => {
        const mockUser = {
            id: 1,
            username: 'user1',
            email: 'user1@gmail.com',
            bio: '',
            role: {
                id: 1,
                name: 'user',
            },
            passwordHash: '',
            createdAt: new Date(),
        };

        mockRepository.findOne.mockResolvedValue(mockUser);

        expect(await service.findOne(1)).toEqual(mockUser);
        expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should create user when all data is correct', async () => {
        const createUserDto = {
            username: 'user1',
            email: 'user1@gmail.com',
            passwordHash: 'password',
            roleId: 1,
        };

        const mockRole = {
            id: 1,
            name: 'user',
        };

        const mockSavedUser = {
            id: 1,
            username: 'user1',
            email: 'user1@gmail.com',
            bio: '',
            role: mockRole,
            passwordHash: 'password',
            createdAt: new Date(),
        };

        mockRoleService.findOne.mockResolvedValue(mockRole);
        mockRepository.create.mockReturnValue(mockSavedUser);
        mockRepository.save.mockResolvedValue(mockSavedUser);

        expect(await service.create(createUserDto)).toEqual(mockSavedUser);
        expect(mockRoleService.findOne).toHaveBeenCalledWith(1);
        expect(mockRepository.save).toHaveBeenCalledWith(mockSavedUser);
    });

    it('should fail when role is not found', async () => {
        const createUserDto = {
            username: 'user1',
            email: 'user1@gmail.com',
            passwordHash: 'password',
            roleId: 1,
        };

        mockRoleService.findOne.mockResolvedValue(null);
        await expect(service.create(createUserDto)).rejects.toThrow();
    });
});
