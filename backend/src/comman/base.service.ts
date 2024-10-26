/* eslint-disable prettier/prettier */
import { Repository, DeepPartial, FindOptionsWhere } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseService<T> {
    constructor(protected readonly repository: Repository<T>) { }

    // Create method
    async create(createDto: DeepPartial<T>): Promise<T> {
        const entity = this.repository.create(createDto);
        return this.repository.save(entity);
    }

    // Update method
    async update(id: string, updateDto: any): Promise<T | null> {
        await this.repository.update(id, updateDto);
        return this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
    }

    // Delete method
    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    // Find by ID method
    async findById(id: number | string): Promise<T | null> {
        return this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
    }

    // Find all method
    async findAll(): Promise<T[]> {
        return this.repository.find();
    }
    // Find all by condition method
    async findAllByCondition(condition: FindOptionsWhere<T>): Promise<T[]> {
        return this.repository.find({ where: condition });
    }

    // Search method
    async search(query: FindOptionsWhere<T>): Promise<T[]> {
        return this.repository.find({ where: query });
    }

    // Find one by query method
    async findOne(query: FindOptionsWhere<T>): Promise<T | null> {
        return this.repository.findOne({ where: query });
    }
}
