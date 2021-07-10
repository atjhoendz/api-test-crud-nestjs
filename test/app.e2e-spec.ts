import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createUserDto, updateUserDto } from '../src/user/user.mock';
import { User } from '../src/user/user.entity';

describe('End to End Testing (e2e)', () => {
  let app: INestApplication;
  let firstData: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User Module', () => {
    afterAll(async () => {
      const uncleared = await request(app.getHttpServer()).get('/user');
      if (!uncleared.body.data.length) return;
      await Promise.all(
        uncleared.body.data.map(async (user) => {
          return request(app.getHttpServer()).delete(`/user/${user.id}`);
        }),
      );
    });

    it('/user (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto)
        .expect(201);

      firstData = response.body.data;

      expect(response.body.data).toEqual({
        ...createUserDto,
        id: expect.any(String),
      });
    });

    it('/user (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/user')
        .expect(200);
      expect(response.body.data).toHaveLength(1);
    });

    it('/user/:id (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get(`/user/${firstData.id}`)
        .expect(200);

      expect(response.body.data).toEqual({
        ...createUserDto,
        id: expect.any(String),
      });
    });

    it('/user/:id (PUT)', async () => {
      const response = await request(app.getHttpServer())
        .put(`/user/${firstData.id}`)
        .send(updateUserDto)
        .expect(200);

      expect(response.body.data.name).toEqual(updateUserDto.name);
    });

    it('/user/:id (DELETE)', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/user/${firstData.id}`)
        .expect(200);

      expect(response.body.data).toEqual({
        ...createUserDto,
        name: expect.any(String),
      });
    });
  });
});
