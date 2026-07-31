import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { RegisterDto, LoginDto } from './auth.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            role: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            role: string;
        };
    }>;
    private generateToken;
}
