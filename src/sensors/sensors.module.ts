import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/common/proxyrmq/proxyrmq.module';
import { SensorsController } from './sensors.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [SensorsController]
})
export class SensorsModule {}
