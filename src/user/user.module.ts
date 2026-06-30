import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from 'src/dependence/prisma/prisma.module';
import { AddressService } from './address/address.service';
import { AddressController } from './address/address.controller';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DeleteAuthCookieInterceptor } from './interceptor/deleteCookie.interceptor';
import { RefreshTokenGuard } from 'src/guards/refresh-token/refresh-token.guard';

@Module({
  imports:[PrismaModule],
  providers: [AuthService, AddressService,
    {
    provide:APP_INTERCEPTOR,
    useClass:DeleteAuthCookieInterceptor
    }
  ],
  controllers: [AuthController, AddressController]
})
export class UserModule {}
