import { ISensor } from "src/sensors/interfaces/sensor.interface";

export interface Sensor_Data  {
    readonly sensor_code: string;
    readonly value: number;
    sensor: ISensor;
}