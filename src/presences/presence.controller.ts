import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from '../dto/create-presence.dto';
import { UpdatePresenceDto } from '../dto/update-presence.dto';

@Controller('presences')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Post()
  async create(@Body() createPresenceDto: CreatePresenceDto) {
    return this.presenceService.create(createPresenceDto);
  }

  @Get()
  async findAll() {
    return this.presenceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.presenceService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePresenceDto: UpdatePresenceDto,
  ) {
    return this.presenceService.update(id, updatePresenceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.presenceService.remove(id);
  }
}
