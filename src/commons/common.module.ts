import { Module } from '@nestjs/common';
import { JwtAccessStrategy } from './auth/jwt-access.strategy';
import { JwtRefreshStretagy } from './auth/jwt-refresh.strategy';

@Module({
    imports: [],
    providers: [JwtAccessStrategy, JwtRefreshStretagy],
    exports: [JwtAccessStrategy, JwtRefreshStretagy],
})
export class CommonModule {};