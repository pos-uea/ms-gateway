const tracer = require('./tracer')
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { timeoutInterceptor } from './common/interceptors/timeout.interceptor';
import * as fs from 'fs';

async function bootstrap() {

  await tracer;

  const httpsOptions = {
    key: fs.readFileSync('./src/cert/key.pem'),
    cert: fs.readFileSync('./src/cert/cert.pem'),
  };

  
  const app = await NestFactory.create(AppModule,{httpsOptions});
  
  app.useGlobalInterceptors(new LoggingInterceptor(), new timeoutInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors();

  await app.listen(3000).then(() => {
    console.log('API Gateway is running on port 3000',process.env.NODE_ENV, process.env.RMQ_URL);
  })

}
bootstrap();


