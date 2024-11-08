import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { Agent } from './agent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agent])], 
  controllers: [AgentsController],  
  providers: [AgentsService],  
})
export class AgentsModule {}
