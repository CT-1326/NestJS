import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import * as dotenv from 'dotenv';
dotenv.config();

export class JwtRefreshStretagy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        super({
            jwtFromRequest: (req)=>{
                const cookie = req.cookies['refreshToken'];
                return cookie;
            },
            secretOrKey: process.env.REFRESH_TOKEN_SECRET_KEY
        });
    }

    validate(payload) {
        console.log(payload);
        return {
            email: payload.email,
            id: payload.sub
        }
    }
}