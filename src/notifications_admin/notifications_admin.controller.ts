import { Body, Controller, Get, Logger, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxyRadioFrequency } from 'src/common/proxyrmq/client-proxy';
import { CreateNotificationAdminDto } from './dtos/create.notification.admin.dto';
import { ValidacaoParametrosPipe } from 'src/common/pipes/validacao-parametros.pipe';

@Controller('api/notifications')
export class NotificationsAdminController {

    private logger = new Logger(NotificationsAdminController.name);

    constructor(
        private clientProxyRadioFrequency: ClientProxyRadioFrequency
    ) { }

    private dominioSensor = this.clientProxyRadioFrequency.getClientProxyDominioSensorsInstance();

    @Post()
    @UsePipes(ValidationPipe)
    async createNotificationAdmin(
        @Body() createNotificationAdminDto: CreateNotificationAdminDto) {
        this.logger.log(`createNotificationAdminDto: ${JSON.stringify(createNotificationAdminDto)}`);
        this.dominioSensor.emit('create-notification-admin', createNotificationAdminDto);
    }

    @Get()
    async getNotificationsAdmin() {
        return this.dominioSensor.send('get-notifications-admin', {}).toPromise();
    }

    @Get('/:_id')
    async getNotificationAdminById(
        @Param('_id',ValidacaoParametrosPipe) _id: string) {
        return this.dominioSensor.send('get-notification-admin-by-sensor-id', _id).toPromise();
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updateNotificationAdmin(
        @Body() notification: CreateNotificationAdminDto,
        @Param('_id',ValidacaoParametrosPipe) _id: string) {
        this.logger.log(`createNotificationAdminDto: ${JSON.stringify(notification)} _id: ${_id}`);
        this.dominioSensor.emit('update-notification-admin', { _id, notification });
    }

}
