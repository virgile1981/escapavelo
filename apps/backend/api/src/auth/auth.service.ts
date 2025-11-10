import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { comparePassword, hashPassword } from '@root/common/utils/hash'
@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, @InjectRepository(User) private usersRepository: Repository<User>) {
        this.initTable()
   }

    async initTable() {
        const count = await this.usersRepository.count();
        if (count === 0) {
           const user = this.usersRepository.create({ login: 'admin', password: await hashPassword('&Vb03831s@') });
           return await this.usersRepository.save(user);
        }

        return null;
     }

    
    generateToken(userId: string, userLogin:string) {
        const payload = { sub: userId, login: userLogin }
        return this.jwtService.sign(payload);
    }

    async validateUser(login: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { login } });
            if (!user || !await comparePassword(password, user.password)) {
                throw new NotFoundException(`Authentification impossible pour l'utilisateur ${login}`);
            }
            return user;
    }

    async createUser(user: User) {
        if (await this.usersRepository.findOne({where: {login: user.login}})) {
            throw new ConflictException('User with this login already exists');
        }
        const userEntity = this.usersRepository.create(user);
        return this.usersRepository.save(userEntity);
    }
}