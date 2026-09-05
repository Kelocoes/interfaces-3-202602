export class CreateUserDto {
    username: string;
    email: string;
    passwordHash: string;
    bio: string;
    roleId: number;
}
