import { BadRequestException, Body, Controller, Get, Logger, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxyRadioFrequency } from 'src/common/proxyrmq/client-proxy';
import { CreateSensorDto } from './dtos/create-sensor.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { AuthGuard } from 'src/auth/auth.guard';
import { CheckIsAdminGuard } from 'src/auth/check-is-admin.guard';

@UseGuards(AuthGuard)
@Controller('api/sensors')
export class SensorsController {

    private logger = new Logger(SensorsController.name);

    constructor(
        private clientProxyRadioFrequency: ClientProxyRadioFrequency,
    ) { }

    private dominioSensors = this.clientProxyRadioFrequency.getClientProxyDominioSensorsInstance();

    @Post()
    @UsePipes(ValidationPipe)
    async createSensor(
        @Body() createSensorDto: CreateSensorDto) {
        this.logger.log(`createSensorDto: ${JSON.stringify(createSensorDto)}`);

        //verify if the sensor already exists
        const sensor = await this.dominioSensors.send('get-sensor-by-code', createSensorDto.code).toPromise();

        if (sensor) {
            throw new BadRequestException('Sensor already exists');
        }

        this.dominioSensors.emit('create-sensor', createSensorDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updateSensor(
        @Body() sensor: CreateSensorDto,
        @Param('_id',ValidacaoParametrosPipe) _id: string) {
        this.logger.log(`createSensorDto: ${JSON.stringify(sensor)} _id: ${_id}`);
        this.dominioSensors.emit('update-sensor', { _id, sensor });
    }

    @Get()
    async getAllSensors(){
        return this.dominioSensors.send('get-all-sensors', {}).toPromise();
    }

    @Get('/:_id')
    async getSensorById(
        @Param('_id',ValidacaoParametrosPipe) _id: string) {
        return this.dominioSensors.send('get-sensor-by-id', _id).toPromise();
    }


}
