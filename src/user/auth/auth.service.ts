import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/dependence/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWTPayload } from 'src/dependence/interfaces/interface';
import * as crypto from 'crypto';


const saltRounds = 10;
export const refreshExpiersTime = 30; //day
const accessExpiresTime = 15; //minute

@Injectable()
export class AuthService {
    constructor(private readonly prismaService:PrismaService){}

    async login({password,email}:LoginParams){
        const user = await this.prismaService.user.findUnique({
            where:{email}
        });

        if(!user) throw new NotFoundException;

        const matched = await bcrypt.compare(password,user.password);
        if(!matched) throw new UnauthorizedException('Invalid credentials.')
        

        const tokens = await this.generateTokens(user.id,user.email);

        const tokenHash = crypto.createHash('sha256').update(tokens.refreshToken).digest('hex');

        await this.prismaService.refreshToken.create({
            data:{
                userId:user.id,
                tokenHash,
                expiresAt:new Date(Date.now() + refreshExpiersTime * 24 * 60 * 60 * 1000),
            }
        });

        return {accessToken : tokens.accessToken,refreshToken:tokens.refreshToken}
    }

    async register({password,email,firstName,lastName,phone}:RegisterParams){
        const userExist = await this.prismaService.user.findUnique({
            where:{email}
        });

        if(userExist) throw new HttpException('User allready exist.',500);

        const hashedPassword = await bcrypt.hash(password,saltRounds);
        const user = await this.prismaService.user.create({
            data:{
                firstName,lastName,
                email,
                phone,
                password:hashedPassword
            }
        });

        const tokens = await this.generateTokens(user.id,user.email);

        const tokenHash = crypto.createHash('sha256').update(tokens.refreshToken).digest('hex');

        await this.prismaService.refreshToken.create({
            data:{
                userId:user.id,
                tokenHash,
                expiresAt:new Date(Date.now() + refreshExpiersTime * 24 * 60 * 60 * 1000),
            }
        })

        return {
            accessToken:tokens.accessToken,
            refreshToken:tokens.refreshToken
        }
    }

    async refresh(
    refreshToken: string
  ) {
    const payload = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY!) as JWTPayload;

    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const stored = await this.prismaService.refreshToken.findMany({
        where: {
            tokenHash,
        },
    });

    if (!stored) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateTokens(payload.id,payload.email);
    await this.prismaService.refreshToken.deleteMany({
      where: {
        userId: payload.id,
      },
    });

    await this.prismaService.refreshToken.create({
        data:{
            userId:payload.id,
            tokenHash,
            expiresAt:new Date(Date.now() + refreshExpiersTime * 24 * 60 * 60 * 1000),
            }
    });


    return {
      accessToken : tokens.accessToken,
      refreshToken : tokens.refreshToken
    };
    }

    async logout(userId:number){
        const existentUser = await this.prismaService.user.findUnique({
            where:{id:userId}
        });

        if(!existentUser) throw new UnauthorizedException;
        await this.prismaService.refreshToken.deleteMany({
            where:{userId:existentUser.id}
        });
    }

    async getProfile(userId:number){
        const user = await this.prismaService.user.findUnique({
            where:{
                id:userId
            },include:{
                adresses:true
            }
        });
        return user
    }


    private async generateTokens(userId: number,email: string,) {
        const payload = {
            id: userId,
            email,
        };

        const [accessToken, refreshToken] =
            await Promise.all([
                jwt.sign(payload,process.env.ACCESS_TOKEN_KEY!, {
                    expiresIn: `${accessExpiresTime}m`,
                }),

                jwt.sign(payload,process.env.REFRESH_TOKEN_KEY!, {
                    expiresIn: `${refreshExpiersTime}d`,
                }),
            ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}


interface LoginParams {
    email:string;
    password:string;
}

interface RegisterParams{
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    password:string;
}