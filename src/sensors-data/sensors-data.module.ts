import { Module } from '@nestjs/common';
import { SensorsDataController } from './sensors-data.controller';
import { ProxyRMQModule } from 'src/common/proxyrmq/proxyrmq.module';

@Module({
  imports: [ProxyRMQModule],
  controllers: [SensorsDataController]
})
export class SensorsDataModule {}
