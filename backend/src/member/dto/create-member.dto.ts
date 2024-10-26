/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsEnum, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
    @ApiProperty({ description: 'The name of the member' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: 'The title of the member' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'The age of the member', example: 30 })
    @IsNotEmpty()
    @IsNumber()
    age: number;

    @ApiProperty({ description: 'The email address of the member' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The mobile number of the member' })
    @IsNotEmpty()
    @IsString()
    mobileNumber: string;

    @ApiProperty({
        description: 'The status of the member in the Kanban board',
        enum: ['UNCLAIMED', 'FIRST_CONTACT', 'PREPARING_WORK_OFFER', 'SEND_TO_THERAPIST'],
    })
    @IsEnum(['UNCLAIMED', 'FIRST_CONTACT', 'PREPARING_WORK_OFFER', 'SEND_TO_THERAPIST'])
    status: string;
}
