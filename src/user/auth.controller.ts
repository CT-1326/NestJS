import { Body, Controller, Post, Res, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/loginUser.dto';
import * as bcrypt from 'bcrypt'
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService : UserService,
        private readonly authService : AuthService
    ){}

    @Post('login')
    async login(@Body() input:LoginInput, @Res() res:Response){
        const {email, password} = input;

        const user = await this.userService.findOne(email);

        if (!user) {
            throw new UnprocessableEntityException('이메일이 없습니다.')
        }

        const isAuth = await bcrypt.compare(password, user.password);

        if (!isAuth) {
            throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.');
        }

        this.authService.setRefreshToken({user, res});

        const jwt = this.authService.getAccessToken({user});
        console.log(jwt);
        
        return res.status(200).send(jwt);
    }
}