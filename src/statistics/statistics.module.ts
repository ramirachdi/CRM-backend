import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistics } from './statistics.entity';
import { Agent } from '../agents/agent.entity';
import { Compagne } from '../compagnes/compagne.entity';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Statistics, Agent, Compagne])],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
