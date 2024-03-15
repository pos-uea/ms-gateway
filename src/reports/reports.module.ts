import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ProxyRMQModule } from 'src/common/proxyrmq/proxyrmq.module';

@Module({
  imports: [ProxyRMQModule],
  controllers: [ReportsController]
})
export class ReportsModule {}
