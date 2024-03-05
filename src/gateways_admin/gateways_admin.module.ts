import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/common/proxyrmq/proxyrmq.module';
import { GatewaysAdminController } from './gateways_admin.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [GatewaysAdminController],
})
export class GatewaysAdminModule {}
