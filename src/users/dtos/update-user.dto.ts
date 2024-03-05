import { IsNotEmpty, IsEmail } from "class-validator";

export class updateUserDto {

    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}