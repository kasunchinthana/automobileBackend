import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  //let app: INestApplication;
const app = "http://localhost:3000"
  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  it('/ (GET)', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
