import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';
import { SetAuthCookie } from 'src/dependence/decorators/setAuthCookie.decorator';
import type { Request } from 'express';
import { User } from '../decorators/user.decorator';
import type { UserInfo } from '../decorators/user.decorator';
import { DeleteAuthCookie } from 'src/dependence/decorators/logout.decorator';
import { AccessTokenGuard } from 'src/guards/access-token/access-token.guard';
import { RefreshTokenGuard } from 'src/guards/refresh-token/refresh-token.guard';

@Controller('v1/auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('login')
    @SetAuthCookie()
    login(@Body() body:LoginDto){
        return this.authService.login(body)
    }

    @Post('register')
    @SetAuthCookie()
    register(
        @Body() body:RegisterDto
    ){
        return this.authService.register(body)
    }

    @Post('refresh')
    @UseGuards(RefreshTokenGuard)
    @SetAuthCookie()
    getRefreshToken(
        @Req() req:Request,
    ){
        const refreshToken = req.headers?.cookie?.split('refreshToken=')[1]
        
        return this.authService.refresh(refreshToken!)
    }

    @Post('logout')
    @UseGuards(AccessTokenGuard)
    @DeleteAuthCookie()
    logout(@User() user:UserInfo){
        // return this.authService.logout(user.id)
    }

    @Get('me')
    @UseGuards(AccessTokenGuard)
    getProfile(@User() user:UserInfo){
        return this.authService.getProfile(user.id)
    }

    @Post('forgot-password')
    forgotPassword(){}

    @Post('reset-password')
    resetPassword(){}
}
