import { Module } from '@nestjs/common';
import { GatewaysController } from './gateways.controller';
import { ProxyRMQModule } from 'src/common/proxyrmq/proxyrmq.module';

@Module({
  imports: [ProxyRMQModule],
  controllers: [GatewaysController],
})
export class GatewaysModule {}
