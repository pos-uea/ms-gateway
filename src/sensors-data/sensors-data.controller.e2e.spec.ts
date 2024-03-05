import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SensorsDataModule } from './sensors-data.module';

describe('Cats', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SensorsDataModule],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET all`, () => {
    return request(app.getHttpServer())
      .get('/api/sensors-data')
      .expect(200)
      .expect(JSON.stringify("msg:{ 'message': 'Deus é mais beta' }"));
  });

  it(`/GET id`, () => {
    return request(app.getHttpServer())
      .get('/api/sensors-data/65d133b8ae072b9c63e321c4')
      .expect(200)
  });


  afterAll(async () => {
    await app.close();
  });
});