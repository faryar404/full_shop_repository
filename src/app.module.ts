import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './dependence/prisma/prisma.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/interceptor/user.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { AuthCookieInterceptor } from './user/interceptor/authCookie.interceptor';
import { PrismaService } from './dependence/prisma/prisma.service';

@Module({
  imports: [UserModule, PrismaModule,],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_INTERCEPTOR,
    useClass:UserInterceptor
  },{
    provide:APP_GUARD,
    useClass:AuthGuard
  },{
    provide:APP_INTERCEPTOR,
    useClass:AuthCookieInterceptor
  }],
})
export class AppModule {}
