import { IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateSensorDataDto {

    @IsNotEmpty()
    readonly sensor_code: string;

    @IsNumber({}, { each: true })
    @IsNotEmpty()
    readonly value: Number;

    @IsOptional()
    sensor?: string;

}