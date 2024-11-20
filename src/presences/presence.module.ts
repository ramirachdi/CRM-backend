import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presence } from './presence.entity';
import { Agent } from '../agents/agent.entity';
import { PresenceService } from './presence.service';
import { PresenceController } from './presence.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Presence, Agent])],
  providers: [PresenceService],
  controllers: [PresenceController],
})
export class PresenceModule {}
