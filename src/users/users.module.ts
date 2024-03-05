import { Module } from '@nestjs/common';
import { ProxyRMQModule } from '../common/proxyrmq/proxyrmq.module'
import { UsersController } from './users.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [UsersController]
})
export class UsersModule {}
