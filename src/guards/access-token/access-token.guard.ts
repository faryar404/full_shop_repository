import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { JWTPayload } from 'src/dependence/interfaces/interface';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/dependence/prisma/prisma.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly reflector:Reflector,
          private readonly prismaService:PrismaService
    ){}
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest()
    const token = request?.headers?.authorization?.split("Bearer ")[1];
    try{
      const payload = await jwt.verify(token,process.env.ACCESS_TOKEN_KEY!) as JWTPayload;
      const user = await this.prismaService.user.findUnique({where:{id:payload.id}});

      if(!user) return false;
      return true;
    }catch(err){
      return false;
    };
  }
}
