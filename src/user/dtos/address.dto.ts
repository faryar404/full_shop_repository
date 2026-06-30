import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    city!:string;

    @IsNotEmpty()
    postalCode!:number;

    @IsString()
    @IsNotEmpty()
    province!:string;

    @IsString()
    @IsNotEmpty()
    receiverName!:string;

    @IsString()
    @IsNotEmpty()
    receiverPhone!:string;
}

export class UpdateAddressDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    city?:string;

    @IsNotEmpty()
    @IsOptional()
    postalCode?:number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    province?:string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    receiverName?:string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    receiverPhone?:string;
}