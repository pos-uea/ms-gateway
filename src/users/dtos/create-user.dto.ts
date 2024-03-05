import { IsNotEmpty, IsEmail, IsOptional, isNotEmpty } from "class-validator";

export class createUserDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly login: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    is_active?: boolean;
}