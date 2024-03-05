import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/common/proxyrmq/proxyrmq.module';
import { NotificationsAdminController } from './notifications_admin.controller';

@Module({
    imports: [ProxyRMQModule],
    controllers: [NotificationsAdminController],
})
export class NotificationsAdminModule {}
