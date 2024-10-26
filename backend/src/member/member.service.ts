/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
//import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { BaseService } from '../comman/base.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService extends BaseService<Member> {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {
    super(memberRepository);
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const existingMember = await this.memberRepository.findOne({ where: { email: createMemberDto.email, is_active: true } });
    if (existingMember) {
      throw new ConflictException(`Member with email ${createMemberDto.email} already exists`);
    }
    return super.create(createMemberDto);
  }

  async findById(id: string): Promise<Member> {
    const member = await super.findById(id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }
  
  async findAllActive(): Promise<Member[]> {
    try {
      return await this.memberRepository
        .createQueryBuilder('member')
        .where('member.is_active = :is_active', { is_active: true })
        .getMany();
    } catch (error) {
      console.error('Error fetching active members with QueryBuilder:', error.message);
      throw new InternalServerErrorException('Unable to fetch active members');
    }
  }


  
  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    await this.findById(id); 
    return super.update(id, updateMemberDto); 
  }

  async delete(id: string): Promise<void> {
    const member = await this.findById(id); 
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    await this.memberRepository.update(id, { is_active: false });
  }


}
