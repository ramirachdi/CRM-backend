import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CompagnesService } from './compagnes.service';
import { CreateCompagneDto } from '../dto/create-compagne.dto';
import { UpdateCompagneDto } from '../dto/update-compagne.dto';
import { Compagne } from './compagne.entity';

@Controller('compagnes')
export class CompagnesController {
  constructor(private readonly compagnesService: CompagnesService) {}

  @Get()
  findAll(): Promise<Compagne[]> {
    return this.compagnesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Compagne> {
    return this.compagnesService.findOne(id);
  }

  @Post()
  create(@Body() createCompagneDto: CreateCompagneDto): Promise<Compagne> {
    return this.compagnesService.create(createCompagneDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCompagneDto: UpdateCompagneDto): Promise<Compagne> {
    return this.compagnesService.update(id, updateCompagneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.compagnesService.remove(id);
  }
}
