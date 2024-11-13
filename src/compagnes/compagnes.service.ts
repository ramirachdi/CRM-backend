import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Compagne } from './compagne.entity';
import { Agent } from '../agents/agent.entity';
import { CreateCompagneDto } from '../dto/create-compagne.dto';
import { UpdateCompagneDto } from '../dto/update-compagne.dto';

@Injectable()
export class CompagnesService {
  constructor(
    @InjectRepository(Compagne)
    private compagneRepository: Repository<Compagne>,
    @InjectRepository(Agent)
    private agentsRepository: Repository<Agent>,
  ) {}

  async findAll(): Promise<Compagne[]> {
    return this.compagneRepository.find({ relations: ['agents'] });
  }

  async findOne(id: number): Promise<Compagne> {
    const compagne = await this.compagneRepository.findOne({
      where: { id },
      relations: ['agents'],
    });
    if (!compagne) throw new Error('Compagne not found');
    return compagne;
  }

  async create(createCompagneDto: CreateCompagneDto): Promise<Compagne> {
    const { agentsIds, ...compagneData } = createCompagneDto;
    const compagne = this.compagneRepository.create(compagneData);
  
    if (agentsIds && agentsIds.length > 0) {
      const agents = await this.agentsRepository.findBy({ id: In(agentsIds) });
      compagne.agents = agents;
  
      // Set the compagne reference in each agent
      for (const agent of agents) {
        agent.compagne = compagne;
      }
      await this.agentsRepository.save(agents);  // Save changes to agents
    }
  
    return this.compagneRepository.save(compagne);
  }
  

  async update(id: number, updateCompagneDto: UpdateCompagneDto): Promise<Compagne> {
    const { agentsIds, ...compagneData } = updateCompagneDto;
    const compagne = await this.compagneRepository.preload({
      id,
      ...compagneData,
    });
    if (!compagne) throw new Error('Compagne not found');
  
    if (agentsIds) {
      const agents = await this.agentsRepository.findBy({ id: In(agentsIds) });
      compagne.agents = agents;
  
      // Set the compagne reference in each agent
      for (const agent of agents) {
        agent.compagne = compagne;
      }
      await this.agentsRepository.save(agents);  // Save changes to agents
    }
  
    return this.compagneRepository.save(compagne);
  }
  

  async remove(id: number): Promise<void> {
    await this.compagneRepository.delete(id);
  }
}
