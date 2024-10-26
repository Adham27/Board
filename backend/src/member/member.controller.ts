/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Members')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  @Get()
  @ApiOperation({ summary: 'Retrieve all members' })
  @ApiResponse({ status: 200, description: 'All members retrieved successfully', type: [Member] })
  async findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a member by ID' })
  @ApiParam({ name: 'id', description: 'ID of the member' })
  @ApiResponse({ status: 200, description: 'Member retrieved successfully', type: Member })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async findOne(@Param('id') id: string): Promise<Member> {
    return this.memberService.findById(id);
  }
  
  // // New endpoint to get only active members
  // @Get('active')
  // @ApiOperation({ summary: 'Retrieve all active members' })
  // @ApiResponse({ status: 200, description: 'All active members retrieved successfully', type: [Member] })
  // async findAllActive(): Promise<Member[]> {
  //   return this.memberService.findAllActive();
  // }

  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  @ApiBody({ type: CreateMemberDto })
  @ApiResponse({ status: 201, description: 'Member created successfully', type: Member })
  @ApiResponse({ status: 409, description: 'Conflict - email already exists' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberService.create(createMemberDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a member by ID' })
  @ApiParam({ name: 'id', description: 'ID of the member' })
  @ApiBody({ type: UpdateMemberDto })
  @ApiResponse({ status: 200, description: 'Member updated successfully', type: Member })
  @ApiResponse({ status: 404, description: 'Member not found' })
  async update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a member by ID' })
  @ApiParam({ name: 'id', description: 'ID of the member' })
  @ApiResponse({ status: 204, description: 'Member deleted successfully' })
  @ApiResponse({ status: 404, description: 'Member not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.memberService.delete(id);
  }
}
