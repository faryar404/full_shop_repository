import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AccessTokenGuard } from 'src/guards/access-token/access-token.guard';
import { User } from '../decorators/user.decorator';
import type { UserInfo } from '../decorators/user.decorator';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/address.dto';


@Controller('v1/address')
export class AddressController {
    constructor(private readonly addressService:AddressService){}

    @Get()
    @UseGuards(AccessTokenGuard)
    getAllAddresses(@User() user:UserInfo){
        return this.addressService.getAllAddresses(user.id)
    }

    @Post()
    @UseGuards(AccessTokenGuard)
    createAddress(
        @Body() body:CreateAddressDto,
        @User() user:UserInfo
    ){
        return this.addressService.createAddress(user.id,body)
    }

    @Put(':id')
    @UseGuards(AccessTokenGuard)
    updateAddress(
        @Body() body:UpdateAddressDto,
        @User() user:UserInfo,
        @Param("id",ParseIntPipe) id:number
    ){
        return this.addressService.updateAddress(body,id)
    }

    @Delete(':id')
    @UseGuards(AccessTokenGuard)
    deleteAddress(@Param("id",ParseIntPipe) id:number){
        return this.addressService.deleteAddress(id)
    }
}
