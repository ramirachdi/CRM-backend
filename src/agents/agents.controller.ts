import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from '../dto/create-agent.dto';
import { UpdateAgentDto } from '../dto/update-agent.dto';
import { Agent } from './agent.entity';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  findAll(): Promise<Agent[]> {
    return this.agentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Agent> {
    return this.agentsService.findOne(id);
  }

  @Post()
  create(@Body() createAgentDto: CreateAgentDto): Promise<Agent> {
    return this.agentsService.create(createAgentDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto): Promise<Agent> {
    return this.agentsService.update(id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.agentsService.remove(id);
  }
}