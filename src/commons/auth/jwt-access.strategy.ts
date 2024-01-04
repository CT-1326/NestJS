import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import * as dotenv from 'dotenv';
dotenv.config();

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESS_TOKEN_SECRET_KEY
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