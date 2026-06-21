import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as jwt from 'jsonwebtoken';
import { JWTPayload } from "src/dependence/interfaces/interface"
import { PrismaService } from "src/dependence/prisma/prisma.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly reflector:Reflector,
        private readonly prismaService:PrismaService
    ){}
    async canActivate(context: ExecutionContext) {
        // 1) Determine the UserType that can execute the called endpoint
        // 2) Grab the JWT from the request header and verify it'
        // 3)
        // 4)


        const roles = this.reflector.getAllAndOverride('roles',[
            context.getHandler(),
            context.getClass()
        ])

        if(roles?.length){
            const request = context.switchToHttp().getRequest()
            const token = request?.headers?.authorization?.split("Bearer ")[1];
            try {
                const payload = await jwt.verify(token,process.env.JSON_TOKEN_KEY!) as JWTPayload;
                
                const user = await this.prismaService.user.findUnique({
                    where:{id:payload.id}
                })

                if(!user) return false;

                console.log(user)
                if(roles.includes(user.role)) return true
                return false;
            } catch (error) {
                return false;
            }
        }
        return true
    }
}