import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
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
    return this.agentsRepository.find({ relations: ['compagne'] });
  }

  async findOne(id: string): Promise<Agent> {
    return this.agentsRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['compagne'],
    });
  }

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const { compagneId, ...agentData } = createAgentDto;
    const agent = this.agentsRepository.create(agentData);
  
    if (compagneId) {
      const compagne = await this.compagneRepository.findOne({
        where: { id: compagneId },
      });
      
      if (!compagne) throw new Error(`Compagne with ID "${compagneId}" not found`);
      agent.compagne = compagne;
    }
  
    return this.agentsRepository.save(agent);
  }
  

  async update(id: string, updateAgentDto: UpdateAgentDto): Promise<Agent> {
    const { compagneId, ...updateData } = updateAgentDto;
    const agent = await this.agentsRepository.preload({
      id: parseInt(id),
      ...updateData,
    });
  
    if (!agent) {
      throw new Error('Agent not found');
    }
  
    if (compagneId !== undefined) {
      const compagne = await this.compagneRepository.findOne({
        where: { id: compagneId },
      });
  
      if (!compagne) throw new Error(`Compagne with ID "${compagneId}" not found`);
      agent.compagne = compagne;
    }
  
    return this.agentsRepository.save(agent);
  }
  

  async remove(id: string): Promise<void> {
    const agent = await this.findOne(id);
    if (agent) {
      // Optionally remove the reference in the related compagne
      if (agent.compagne) {
        agent.compagne = null;
        await this.agentsRepository.save(agent);
      }
      await this.agentsRepository.delete(parseInt(id));
    }
  }
  
}
