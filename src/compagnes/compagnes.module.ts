// src/modules/compagne.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compagne } from './compagne.entity';
import { CompagnesService } from './compagnes.service';
import { CompagnesController } from './compagnes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Compagne])],
  providers: [CompagnesService],
  controllers: [CompagnesController],
})
export class CompagnesModule {}
