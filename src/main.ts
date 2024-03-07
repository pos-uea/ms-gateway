const tracer = require('./tracer')
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { timeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { ClientProxyRadioFrequency } from './common/proxyrmq/client-proxy';


async function bootstrap() {

  await tracer;
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor(), new timeoutInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000).then(() => {
    console.log('API Gateway is running on port 3000',process.env.NODE_ENV);
  })

}
bootstrap();


