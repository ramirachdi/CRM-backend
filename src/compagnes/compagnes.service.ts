import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compagne } from './compagne.entity';
import { CreateCompagneDto } from '../dto/create-compagne.dto';
import { UpdateCompagneDto } from '../dto/update-compagne.dto';

@Injectable()
export class CompagnesService {
  constructor(
    @InjectRepository(Compagne)
    private compagneRepository: Repository<Compagne>,
  ) {}

  findAll(): Promise<Compagne[]> {
    return this.compagneRepository.find();
  }

  findOne(id: number): Promise<Compagne> {
    return this.compagneRepository.findOneBy({ id });
  }

  create(createCompagneDto: CreateCompagneDto): Promise<Compagne> {
    const compagne = this.compagneRepository.create(createCompagneDto);
    return this.compagneRepository.save(compagne);
  }

  async update(id: number, updateCompagneDto: UpdateCompagneDto): Promise<Compagne> {
    await this.compagneRepository.update(id, updateCompagneDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.compagneRepository.delete(id);
  }
}
