/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
    @ApiPropertyOptional({ description: 'The name of the member' })
    name?: string;

    @ApiPropertyOptional({ description: 'The title of the member' })
    title?: string;

    @ApiPropertyOptional({ description: 'The age of the member' })
    age?: number;

    @ApiPropertyOptional({ description: 'The email address of the member' })
    email?: string;

    @ApiPropertyOptional({ description: 'The mobile number of the member' })
    mobileNumber?: string;

    @ApiPropertyOptional({
        description: 'The status of the member in the Kanban board',
        enum: ['UNCLAIMED', 'FIRST_CONTACT', 'PREPARING_WORK_OFFER', 'SEND_TO_THERAPIST'],
    })
    status?: string;
}
