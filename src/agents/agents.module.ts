import { Module ,forwardRef} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { Agent } from './agent.entity';
import { CompagnesModule } from '../compagnes/compagnes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Agent]),
  forwardRef(() => CompagnesModule),
], 
  controllers: [AgentsController],  
  providers: [AgentsService],  
  exports: [TypeOrmModule.forFeature([Agent])],
})
export class AgentsModule {}
