import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class AuthResponseDto {
    id!:number
}

export class LoginDto{
    @IsNotEmpty()
    email!:string;

    @IsString()
    @IsNotEmpty()
    password!:string;
}

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    firstName!:string;

    @IsString()
    @IsNotEmpty()
    lastName!:string;

    @IsEmail()
    email!:string

    @IsNotEmpty()
    phone!:string;

    @IsString()
    @IsNotEmpty()
    password!:string;
}