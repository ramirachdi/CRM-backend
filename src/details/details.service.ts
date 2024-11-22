import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Details } from './details.entity';
import { Presence } from '../presences/presence.entity';

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(Details)
    private detailsRepository: Repository<Details>,
    @InjectRepository(Presence)
    private presenceRepository: Repository<Presence>,
  ) {}

  async createDetails(
    presenceId: number,
    data: { type: string; value: string }[],
  ): Promise<Details> {
    const presence = await this.presenceRepository.findOne({ where: { id: presenceId } });
    if (!presence) {
      throw new NotFoundException(`Presence with ID ${presenceId} not found.`);
    }

    const details = this.detailsRepository.create({ data, presence });
    return this.detailsRepository.save(details);
  }

  async findAll(): Promise<Details[]> {
    return this.detailsRepository.find({ relations: ['presence'] });
  }

  async findOne(id: number): Promise<Details> {
    const details = await this.detailsRepository.findOne({ where: { id }, relations: ['presence'] });
    if (!details) {
      throw new NotFoundException(`Details with ID ${id} not found.`);
    }
    return details;
  }

  async updateDetails(
    id: number,
    data: { type: string; value: string }[],
  ): Promise<Details> {
    const details = await this.findOne(id);
    details.data = data;
    return this.detailsRepository.save(details);
  }

  async deleteDetails(id: number): Promise<void> {
    const result = await this.detailsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Details with ID ${id} not found.`);
    }
  }
}
