import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Agent } from './agent.entity';
import { Compagne } from '../compagnes/compagne.entity';
import { CreateAgentDto } from '../dto/create-agent.dto';
import { UpdateAgentDto } from '../dto/update-agent.dto';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent)
    private agentsRepository: Repository<Agent>,
    @InjectRepository(Compagne)
    private compagneRepository: Repository<Compagne>,
  ) {}

  async findAll(): Promise<Agent[]> {
    return this.agentsRepository.find({ relations: ['compagnes'] });
  }

  async findOne(id: string): Promise<Agent> {
    return this.agentsRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['compagnes'],
    });
  }

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const { compagneIds, ...agentData } = createAgentDto;
    const agent = this.agentsRepository.create(agentData);

    if (compagneIds) {
      const compagnes = await this.compagneRepository.findBy({ id: In(compagneIds) });
      agent.compagnes = compagnes;
    }

    return this.agentsRepository.save(agent);
  }

  async update(id: number, updateAgentDto: UpdateAgentDto): Promise<Agent> {
    const { compagneIds, ...updateData } = updateAgentDto;
    const agent = await this.agentsRepository.preload({ id, ...updateData });

    if (!agent) throw new Error('Agent not found');

    if (compagneIds) {
      const compagnes = await this.compagneRepository.findBy({ id: In(compagneIds) });
      agent.compagnes = compagnes;
    }

    return this.agentsRepository.save(agent);
  }

  async remove(id: string): Promise<void> {
    const agent = await this.findOne(id);
    if (agent) {
      // Set compagnes to an empty array to remove associations
      agent.compagnes = [];
      await this.agentsRepository.save(agent);

      // Finally delete the agent
      await this.agentsRepository.delete(parseInt(id));
    }
  }
}
