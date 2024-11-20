import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PresenceService } from './presence.service';
import { CreatePresenceDto } from '../dto/create-presence.dto';
import { Presence } from './presence.entity';

@Controller('presences')
export class PresenceController {
  constructor(private readonly presenceService: PresenceService) {}

  @Post()
  async createPresence(@Body() createPresenceDto: CreatePresenceDto): Promise<Presence> {
    return this.presenceService.createPresence(createPresenceDto);
  }

  @Get()
  async findAll(): Promise<Presence[]> {
    return this.presenceService.findAll();
  }

  @Get('agent/:agentId/date/:date')
  async findByAgentAndDate(
    @Param('agentId') agentId: number,
    @Param('date') date: string,
  ): Promise<Presence[]> {
    return this.presenceService.findByAgentAndDate(agentId, new Date(date));
  }

  @Patch(':id')
  async updatePresence(
    @Param('id') id: number,
    @Body() updateDto: Partial<CreatePresenceDto>,
  ): Promise<Presence> {
    return this.presenceService.updatePresence(id, updateDto);
  }

  @Delete(':id')
  async deletePresence(@Param('id') id: number): Promise<void> {
    return this.presenceService.deletePresence(id);
  }
}
