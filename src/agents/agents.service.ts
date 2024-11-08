import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { CreateAgentDto } from '../dto/create-agent.dto';
import { UpdateAgentDto } from '../dto/update-agent.dto';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent)
    private agentsRepository: Repository<Agent>,
  ) {}

  findAll(): Promise<Agent[]> {
    return this.agentsRepository.find();
  }

  findOne(id: string): Promise<Agent> {
    return this.agentsRepository.findOneBy({ id: parseInt(id) });
  }

  create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const agent = this.agentsRepository.create(createAgentDto); 
    return this.agentsRepository.save(agent); 
  }

  async update(id: string, updateAgentDto: UpdateAgentDto): Promise<Agent> {
    const agent = await this.agentsRepository.preload({
      id: parseInt(id),
      ...updateAgentDto
    });
    if (!agent) {
      throw new Error('Agent not found');
    }
    return this.agentsRepository.save(agent);
  }

  async remove(id: string): Promise<void> {
    await this.agentsRepository.delete(parseInt(id));
  }
}
