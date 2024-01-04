import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/user.service';
import { AuthService } from './auth.service';

@Module({
    imports: [
        JwtModule.register({}),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService],
})
export class AuthModule {};