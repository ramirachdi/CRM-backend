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

    // If agent IDs are provided, find and associate them in a many-to-many relationship
    if (agentsIds && agentsIds.length > 0) {
      const agents = await this.agentsRepository.findBy({ id: In(agentsIds) });
      compagne.agents = agents; // Directly set agents for the many-to-many relationship
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

    // If agent IDs are provided, update the many-to-many relationship
    if (agentsIds) {
      const agents = await this.agentsRepository.findBy({ id: In(agentsIds) });
      compagne.agents = agents; // Update agents for the many-to-many relationship
    }

    return this.compagneRepository.save(compagne);
  }

  async remove(id: number): Promise<void> {
    const compagne = await this.findOne(id);
    if (compagne) {
      // Remove associations with agents by setting agents to an empty array
      compagne.agents = [];
      await this.compagneRepository.save(compagne);
  
      // Finally delete the compagne
      await this.compagneRepository.delete(id);
    }
  }
  
}
