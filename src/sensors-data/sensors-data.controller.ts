import { BadRequestException, Body, Controller, Get, Logger, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxyRadioFrequency } from 'src/common/proxyrmq/client-proxy';
import { CreateSensorDataDto } from './dtos/create.sensor-data.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { INotification } from './interfaces/notification.dto';

@Controller('api/sensors-data')
export class SensorsDataController {

    private logger = new Logger(SensorsDataController.name);

    constructor(
        private clientProxyRadioFrequency: ClientProxyRadioFrequency
    ) { }

    private dominioSensors = this.clientProxyRadioFrequency.getClientProxyDominioSensorsInstance();
    private dominioNotifications = this.clientProxyRadioFrequency.getClientProxyDominioNotificationInstance();

    @Post()
    @UsePipes(ValidationPipe)
    async createSensorData(
        @Body() createSensorDataDto: CreateSensorDataDto) {

        // this.apmService.setTransactionName('createSensorDataDto')
        const sensor: any = await this.dominioSensors.send('get-sensor-by-code', createSensorDataDto.sensor_code).toPromise(); 
        this.logger.log(`createSensorDataDto: ${JSON.stringify(createSensorDataDto)}`);

        if (!sensor) {
            this.logger.error(`Sensor with code ${createSensorDataDto.sensor_code} not found`);
             throw new BadRequestException(`Sensor with code ${createSensorDataDto.sensor_code} not found`);
        }

        createSensorDataDto.sensor = sensor._id;      
                
        this.dominioSensors.emit('create-sensor-data', createSensorDataDto);

        const notification : INotification = {
            sensor: sensor._id,
            sensor_code: createSensorDataDto.sensor_code,
            value: createSensorDataDto.value 
        }
       
        this.dominioNotifications.emit('create-notification', notification);
        this.logger.log(`create-notification: ${JSON.stringify(notification)}`);

    }

    @Get('/:_id')
    async getSensorDataById(
        @Param('_id',ValidacaoParametrosPipe) _id: string) {
        return this.dominioSensors.send('get-sensor-data-by-id', _id).toPromise();
    }

    @Get()
    async getAllSensorData() {
        return JSON.stringify("msg:{ 'message': 'Deus é mais beta' }");
    }

}
