import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Details } from './details.entity';
import { DetailsService } from './details.service';
import { DetailsController } from './details.controller';
import { Presence } from '../presences/presence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Details, Presence])],
  controllers: [DetailsController],
  providers: [DetailsService],
  exports: [DetailsService], // Exporting the service if other modules need access
})
export class DetailsModule {}
