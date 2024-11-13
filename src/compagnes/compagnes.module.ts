import { Module ,forwardRef} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compagne } from './compagne.entity';
import { CompagnesService } from './compagnes.service';
import { CompagnesController } from './compagnes.controller';
import { AgentsModule } from '../agents/agents.module';

@Module({
  imports: [TypeOrmModule.forFeature([Compagne]),
  forwardRef(() => AgentsModule),
],
  providers: [CompagnesService],
  controllers: [CompagnesController],
  exports: [TypeOrmModule.forFeature([Compagne])],
})
export class CompagnesModule {}
