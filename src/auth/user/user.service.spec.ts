import {getRepositoryToken} from "@nestjs/typeorm";
import Test from "supertest/lib/test";
import {UserService} from "./user.service";
import {beforeEach} from "node:test";
import {RoleService} from "../role/role.service";
import {ConfigService} from "@nestjs/config";
import {User} from "../entities/user.entity";
import {Role} from "../entities/role.entity";


describe('UserService', () => {
    const mockUserRepository = {
        find: jest.fn(),
    };
    const mockRoleService = {};
    const mockConfigService = {};
    
    // Test cases for UserService
    beforeEach(async () => 

        //limpia los mocks antes de cada test
        jest.clearAllMocks(){

        const module = await Test.createTestingModule({
            providers: [
                UserService, //no esta mockeado
                //elementos que interactuan o usamos dentro del servicio de usuario pero no nos interesa probarlos
                {provide: RoleService, useValue: mockRoleService}, //mock del RoleService
                {provide: ConfigService, useValue: mockConfigService}, //mock del ConfigService
                {provide: getRepositoryToken(User), useValue: mockUserRepository}, //mock del UserRepository
            ], 
        }).compile()

        service = module.get<UserService>(UserService); //service de los usuarios
    });
    
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all users', async () => {
        //ARRANGE (fase de preparacion)
        const mockRole: Role = {
            id: 1,
            name: 'Admin',
            description: 'description',
        };

        const mockUsers: User[] = [(
            id: 1,
            username: 'john_doe',
            email: 'john.doe@example.com',
            bio: "bio 1",
            passwordHash: 'hash123',
            createdAt: new Date(),
            role: mockRole,
        )];
    
        //simulanndo el repositiorio  de lo que deberia de hacer el metodo del repositorio
        //i.e el repositorio debe de retornar los usuarios de la base de datos.
        //cuando el servicio llame al repositorio, al metodo find, no busque en la base de datos
        //sino que retorne un conjunto de usuarios mockeados.
        mockUserRepository.find.mockResolvedValue(mockUsers);

        //ACT
        //hacemos el llamado del metodo que queremos probar
        const users = await service.findAll();

        //ASSERT
        expect(users).toEqual(mockUsers);
        expect(mockUserRepository.find).toHaveBeenCalledWith({
            relations: {   
                role: true,
            },
        });
        expect(users.length).toEqual(2);
    });
});
