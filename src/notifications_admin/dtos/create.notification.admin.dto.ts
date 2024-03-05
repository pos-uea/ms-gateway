import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { TypeNotification } from "../notifications_admin-status.enum";

export class CreateNotificationAdminDto {
    @IsNotEmpty()
    sensor: string;

    @IsNotEmpty()
    type: TypeNotification;
    
    @IsNotEmpty()
    @IsNumber()
    value_limite: Number;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    emails: Array<string>;

}



