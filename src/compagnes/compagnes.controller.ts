// src/controllers/compagne.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CompagnesService } from './compagnes.service';
import { CreateCompagneDto } from '../dto/create-compagne.dto';
import { Compagne } from './compagne.entity';
import { UpdateCompagneDto } from '../dto/update-compagne.dto';


@Controller('compagnes')
export class CompagnesController {
  constructor(private readonly compagneService: CompagnesService) {}

  @Get()
  findAll(): Promise<Compagne[]> {
    return this.compagneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Compagne> {
    return this.compagneService.findOne(id);
  }

  @Post()
  create(@Body() createCompagneDto: CreateCompagneDto): Promise<Compagne> {
    return this.compagneService.create(createCompagneDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCompagneDto: UpdateCompagneDto): Promise<Compagne> {
    return this.compagneService.update(id, updateCompagneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.compagneService.remove(id);
  }
}
