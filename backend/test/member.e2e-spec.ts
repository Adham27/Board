/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateMemberDto } from '../src/member/dto/create-member.dto';
import { UpdateMemberDto } from '../src/member/dto/update-member.dto';
import { getConnection } from 'typeorm';

describe('MemberController (e2e)', () => {
  let app: INestApplication;
  let createdMemberId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await getConnection().close();
    await app.close();
  });

  describe('/members (POST)', () => {
    it('should create a new member', async () => {
      const createMemberDto: CreateMemberDto = {
        name: 'John Doe',
        title: 'Therapist',
        age: 30,
        email: 'johndoe@example.com',
        mobileNumber: '1234567890',
        status: 'UNCLAIMED',
      };

      const response = await request(app.getHttpServer())
        .post('/members')
        .send(createMemberDto)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toEqual(createMemberDto.name);
      createdMemberId = response.body.id;
    });
  });

  describe('/members (GET)', () => {
    it('should retrieve all members', async () => {
      const response = await request(app.getHttpServer())
        .get('/members')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('/members/:id (GET)', () => {
    it('should retrieve a member by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/members/${createdMemberId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdMemberId);
      expect(response.body.name).toEqual('John Doe');
    });

    it('should return 404 for a non-existent member', async () => {
      await request(app.getHttpServer())
        .get('/members/99999')
        .expect(404);
    });
  });

  describe('/members/:id (PUT)', () => {
    it('should update an existing member', async () => {
      const updateMemberDto: UpdateMemberDto = {
        name: 'John Doe Updated',
        title: 'Senior Therapist',
      };

      const response = await request(app.getHttpServer())
        .put(`/members/${createdMemberId}`)
        .send(updateMemberDto)
        .expect(200);

      expect(response.body).toHaveProperty('id', createdMemberId);
      expect(response.body.name).toEqual(updateMemberDto.name);
    });
  });

  describe('/members/:id (DELETE)', () => {
    it('should delete a member by ID', async () => {
      await request(app.getHttpServer())
        .delete(`/members/${createdMemberId}`)
        .expect(204);

      // Verify deletion by attempting to fetch the deleted member
      await request(app.getHttpServer())
        .get(`/members/${createdMemberId}`)
        .expect(404);
    });
  });
});
