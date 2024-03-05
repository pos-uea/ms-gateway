import { IsNotEmpty } from "class-validator";

export class CreateSensorDto {
    @IsNotEmpty()
    readonly code: string;
    @IsNotEmpty()
    readonly description: string;
    @IsNotEmpty()
    readonly type: string;
    @IsNotEmpty()
    readonly fabricante: string;
    @IsNotEmpty()
    readonly modelo: string;
    @IsNotEmpty()
    readonly version: string;
    @IsNotEmpty()
    readonly active: boolean;
}