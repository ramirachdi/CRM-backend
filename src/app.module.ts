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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
