/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
    @PrimaryGeneratedColumn('uuid')  // Use UUID for primary key
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    title: string;

    @Column()
    age: number;

    @Column({ unique: true })
    email: string;

    @Column()
    mobileNumber: string;

    @Column({ type: 'enum', enum: ['UNCLAIMED', 'FIRST_CONTACT', 'PREPARING_WORK_OFFER', 'SEND_TO_THERAPIST'] })
    status: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;
}
