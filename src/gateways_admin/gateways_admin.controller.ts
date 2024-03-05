import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxyRadioFrequency } from 'src/common/proxyrmq/client-proxy';
import { CreateGatewayAdminDto } from './dtos/create.gateway.admin.interface';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';
import { catchError } from 'rxjs';

@Controller('api/gateways-admin')
export class GatewaysAdminController {

    private logger = new Logger(GatewaysAdminController.name);

    constructor(
        private clientProxyRadioFrequency: ClientProxyRadioFrequency
    ) { }

    private dominioSensor = this.clientProxyRadioFrequency.getClientProxyDominioSensorsInstance();

    @Post()
    @UsePipes(ValidationPipe)
    async createGatewayAdmin(
        @Body() createGatewayAdminDto: CreateGatewayAdminDto) {
        this.logger.log(`createGatewayDto: ${JSON.stringify(createGatewayAdminDto)}`);

        //verify if the gateway already exists
        const gatewayAdmin = await this.dominioSensor.send('get-gateway-admin-by-code', createGatewayAdminDto.gateway).toPromise();

        if (gatewayAdmin) {
            throw new BadRequestException('Gateway already exists');
        }

        this.dominioSensor.emit('create-gateway-admin', createGatewayAdminDto).pipe(
            catchError((error) => { 
                throw new BadRequestException(error.message);
            }
        ));
    }

    @Get()
    async getGatewaysAdmin() {
            return this.dominioSensor.send('get-gateways-admin', {}).toPromise();
    }

    @Get('/:_id')
    async getGatewayAdminById(
        @Param('_id', ValidacaoParametrosPipe) _id: string) {
        return this.dominioSensor.send('get-gateway-admin-by-id', _id).toPromise();
    }

    @Get('/bycode/:gateway')
    async getGatewayAdminByCode(
        @Param('gateway', ValidacaoParametrosPipe) gateway: string) {
        return this.dominioSensor.send('get-gateway-admin-by-code', gateway).toPromise();
    }


    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updateGatewayAdmin(
        
        @Body() gatewayAdmin: CreateGatewayAdminDto,
        @Param('_id', ValidacaoParametrosPipe) _id: string) {

        this.logger.log(`CreateGatewayAdminDto: ${JSON.stringify(gatewayAdmin)}`);
        return this.dominioSensor.emit('update-gateway-admin', { _id, gatewayAdmin });
    }



}
