import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/dependence/prisma/prisma.service';

@Injectable()
export class AddressService {
    constructor(private readonly prismaService:PrismaService){}

    async getAllAddresses(id:number){
        const addresses = await this.prismaService.adress.findMany({
            where:{userId:id}
        });

        if(!addresses)throw new NotFoundException;
        return addresses
    }

    async createAddress(userId:number,{city,postalCode,province,receiverName,receiverPhone}:CreateAddressParamas){
        const addresses = await this.getAllAddresses(userId);
        if(addresses.length>=3) throw new HttpException('too many addresses saved.',500);

        const address = await this.prismaService.adress.create({
            data:{
                userId,city,postalCode,province,receiverName,receiverPhone
            }
        });
        
        return this.getAllAddresses(userId)
    }

    async updateAddress(UpdateAddressParamas,id){
        const address = await this.prismaService.adress.findUnique({
            where:{id}
        })
        if(!address) throw new NotFoundException;

        const updateAddress = await this.prismaService.adress.update({
            where:{id},
            data:{...UpdateAddressParamas}
        });
        return updateAddress;
    }

    deleteAddress(id:number){
        return this.prismaService.adress.delete({
            where:{id}
        });
    }
}

interface CreateAddressParamas{
    city:string
    postalCode:number
    province:string
    receiverName:string
    receiverPhone:string
}

interface UpdateAddressParamas{
    city?:string
    postalCode?:number
    province?:string
    receiverName?:string
    receiverPhone?:string
}