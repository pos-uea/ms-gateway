import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ClientProxyRadioFrequency } from './common/proxyrmq/client-proxy';
import { ProxyRMQModule } from './common/proxyrmq/proxyrmq.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SensorsModule } from './sensors/sensors.module';
import { SensorsDataModule } from './sensors-data/sensors-data.module';
import { GatewaysModule } from './gateways/gateways.module';
import { GatewaysAdminModule } from './gateways_admin/gateways_admin.module';
import { NotificationsAdminModule } from './notifications_admin/notifications_admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production':'.env.development',
      isGlobal: true
    }),
    ProxyRMQModule,
    UsersModule,
    SensorsModule,
    SensorsDataModule,
    GatewaysModule,
    GatewaysAdminModule,
    NotificationsAdminModule,
  ],
  controllers: [UsersController],
  providers: [ClientProxyRadioFrequency],
})
export class AppModule {}
