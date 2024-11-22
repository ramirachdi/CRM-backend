import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { DetailsService } from './details.service';
import { Details } from './details.entity';

@Controller('details')
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Post(':presenceId')
  async createDetails(
    @Param('presenceId') presenceId: number,
    @Body() createDto: { data: { type: string; value: string }[] },
  ): Promise<Details> {
    return this.detailsService.createDetails(presenceId, createDto.data);
  }

  @Get()
  async findAllDetails(): Promise<Details[]> {
    return this.detailsService.findAll();
  }

  @Get(':id')
  async findDetailsById(@Param('id') id: number): Promise<Details> {
    return this.detailsService.findOne(id);
  }

  @Patch(':id')
  async updateDetails(
    @Param('id') id: number,
    @Body() updateDto: { data: { type: string; value: string }[] },
  ): Promise<Details> {
    return this.detailsService.updateDetails(id, updateDto.data);
  }

  @Delete(':id')
  async deleteDetails(@Param('id') id: number): Promise<void> {
    return this.detailsService.deleteDetails(id);
  }
}
