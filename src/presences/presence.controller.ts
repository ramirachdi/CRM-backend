import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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

  @Get('agent/:agentId/date/:date')
  async findByAgentAndDate(
    @Param('agentId') agentId: number,
    @Param('date') date: string,
  ): Promise<Presence[]> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new HttpException(
        'Invalid date format. Ensure the date is correctly formatted (YYYY-MM-DD).',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.presenceService.findByAgentAndDate(agentId, parsedDate);
  }

  @Get('date/:date')
  async findByDate(@Param('date') date: string): Promise<Presence[]> {
    const parsedDate = new Date(date);
  
    if (isNaN(parsedDate.getTime())) {
      throw new HttpException(
        'Invalid date format. Ensure the date is correctly formatted (YYYY-MM-DD).',
        HttpStatus.BAD_REQUEST,
      );
    }
  
    return this.presenceService.findByDate(parsedDate);
  }
  

  @Get()
  async findAll(): Promise<Presence[]> {
    return this.presenceService.findAll();
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
