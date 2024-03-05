import { BadRequestException, Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxyRadioFrequency } from 'src/common/proxyrmq/client-proxy';
import { CreateGatewayDto } from './dtos/create.gateway.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';

@Controller('api/gateways')
export class GatewaysController {

    private logger = new Logger(GatewaysController.name);

    constructor(
        private clientProxyRadioFrequency: ClientProxyRadioFrequency
    ) { }

    private dominioSensors = this.clientProxyRadioFrequency.getClientProxyDominioSensorsInstance();

    @Post()
    @UsePipes(ValidationPipe)
    async createGateway(
        @Body() createGatewayDto: CreateGatewayDto) {

        this.logger.log(`createGatewayDto: ${JSON.stringify(createGatewayDto)}`);

        //verify if the gateway already exists
        const gateway = await this.dominioSensors.send('get-gateway-by-code', createGatewayDto.code).toPromise();
        if (gateway) {
            throw new BadRequestException('Gateway already exists');
        }

        this.dominioSensors.emit('create-gateway', createGatewayDto);
    }

    
    @Get()
    async getAllGateways() {
        return this.dominioSensors.send('get-all-gateways', {}).toPromise();
    }

    @Get('/:_id')
    async getGatewayById(
        @Param('_id',ValidacaoParametrosPipe) _id: string) {
        return this.dominioSensors.send('get-gateway-by-id', _id).toPromise();
    }
    @Get('/bycode/:_code')
    async getGatewayByCode(
        @Param('_code',ValidacaoParametrosPipe) _code: string) {
        return this.dominioSensors.send('get-gateway-by-code', _code).toPromise();
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updateGateway(
        @Body() gateway: CreateGatewayDto,
        @Param('_id',ValidacaoParametrosPipe) _id: string) {
        return this.dominioSensors.emit('update-gateway', { _id, gateway });
    }
}