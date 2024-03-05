import { IsArray, IsNotEmpty } from "class-validator";
import { IGateway } from "src/gateways/interfaces/gateway.interface";
import { ISensor } from "src/sensors/interfaces/sensor.interface";

export class CreateGatewayAdminDto {
    @IsNotEmpty()
    gateway: IGateway;

    @IsArray()
    sensors: Array<ISensor>;

}

