import { Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';
import { SetAuthCookie } from 'src/dependence/decorators/setAuthCookie.decorator';
import type { Request } from 'express';
import { User } from '../decorators/user.decorator';
import type { UserInfo } from '../decorators/user.decorator';
import { DeleteAuthCookie } from 'src/dependence/decorators/logout.decorator';

@Controller('v1/auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('login')
    @SetAuthCookie()
    login(@Body() body:LoginDto){
        return this.authService.login(body)
    }

    @Post('register')
    register(
        @Body() body:RegisterDto
    ){
        return this.authService.register(body)
    }

    @Post('refresh')
    @SetAuthCookie()
    getRefreshToken(
        @Req() req:Request,
        // @User() user:UserInfo
    ){
        const refreshToken = req.headers?.cookie?.split('refreshToken=')[1]
        
        return this.authService.refresh(refreshToken!)
    }

    @Post('logout')
    @DeleteAuthCookie()
    logout(@User() user:UserInfo){
        // return this.authService.logout(user.id)
    }

    @Get('me')
    getProfile(@User() user:UserInfo){}

    @Post('forgot-password')
    forgotPassword(){}

    @Post('reset-password')
    resetPassword(){}
}
