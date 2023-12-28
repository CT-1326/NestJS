import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import * as dotenv from 'dotenv';
dotenv.config();

export class JwtRefreshStretagy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        super({
            jwtFromRequest: (req) => {
                // console.log(req.headers);
                const cookie = req.headers.cookie;
                console.log("cookie : ", cookie);                
                return cookie;
            },
            secretOrKey: process.env.REFRESH_TOKEN_SECRET_KEY
        });
    }

    validate(payload) {
        console.log(payload);
        return {email: payload.email, id: payload.sub}
    }
}