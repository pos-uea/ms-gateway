import { IGateway } from "src/gateways/interfaces/gateway.interface";
import { ISensor } from "src/sensors/interfaces/sensor.interface";

export interface IGatewayAdmin {
    gateway: IGateway;
    sensors: Array<ISensor>;
}