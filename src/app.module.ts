import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentsService } from './agents/agents.service';
import { AgentsController } from './agents/agents.controller';
import { AgentsModule } from './agents/agents.module';
import { CompagnesService } from './compagnes/compagnes.service';
import { CompagnesController } from './compagnes/compagnes.controller';
import { CompagnesModule } from './compagnes/compagnes.module';
import { StatisticsService } from './statistics/statistics.service';
import { StatisticsController } from './statistics/statistics.controller';
import { StatisticsModule } from './statistics/statistics.module';
import { DetailsService } from './details/details.service';
import { DetailsController } from './details/details.controller';
import { DetailsModule } from './details/details.module';
import { PresencesService } from './presences/presence.service';
import { PresencesModule } from './presences/presence.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'crm',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    AgentsModule,
    CompagnesModule,
    StatisticsModule,
    DetailsModule,
    PresencesModule,
  ],
  controllers: [AppController, DetailsController],
  providers: [AppService, DetailsService, PresencesService],
})
export class AppModule {}
