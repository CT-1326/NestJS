import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    getAccessToken({ user }): String {
        return this.jwtService.sign(
            {
                email: user.email,
                sub: user.id
            },
            {
                secret: process.env.ACCESS_TOKEN_SECRET_KEY,
                expiresIn: '5m'
            }
        );
    }

    setRefreshToken({ user, res }) {
        const refreshToken = this.jwtService.sign(
            {
                email: user.email,
                sub: user.id
            },
            {
                secret: process.env.REFRESH_TOKEN_SECRET_KEY,
                expiresIn: '2w'
            }
        );

        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
        return;
    }

}