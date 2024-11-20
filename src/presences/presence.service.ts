import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Presence } from './presence.entity';
import { CreatePresenceDto } from '../dto/create-presence.dto';
import { UpdatePresenceDto } from '../dto/update-presence.dto';

@Injectable()
export class PresenceService {
  constructor(
    @InjectRepository(Presence)
    private readonly presenceRepository: Repository<Presence>,
  ) {}

  async create(createPresenceDto: CreatePresenceDto): Promise<Presence> {
    const presence = this.presenceRepository.create(createPresenceDto);
    return this.presenceRepository.save(presence);
  }

  async findAll(): Promise<Presence[]> {
    return this.presenceRepository.find({ relations: ['agent', 'details'] });
  }

  async findOne(id: number): Promise<Presence> {
    const presence = await this.presenceRepository.findOne({
      where: { id },
      relations: ['agent', 'details'],
    });
    if (!presence) {
      throw new NotFoundException(`Presence with ID ${id} not found`);
    }
    return presence;
  }

  async update(
    id: number,
    updatePresenceDto: UpdatePresenceDto,
  ): Promise<Presence> {
    const presence = await this.presenceRepository.preload({
      id,
      ...updatePresenceDto,
    });
    if (!presence) {
      throw new NotFoundException(`Presence with ID ${id} not found`);
    }
    return this.presenceRepository.save(presence);
  }

  async remove(id: number): Promise<void> {
    const presence = await this.findOne(id);
    await this.presenceRepository.remove(presence);
  }
}
