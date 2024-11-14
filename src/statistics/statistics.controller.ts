import { Controller, Get, Post, Delete, Param, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Statistics } from './statistics.entity';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  findAll(): Promise<Statistics[]> {
    return this.statisticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Statistics> {
    return this.statisticsService.findOne(+id);
  }

  @Get('betweenDates')
  async getStatisticsBetweenDates(
    @Query('agentId') agentId: string,
    @Query('compagneId') compagneId: string,
    @Query('dateDebut') dateDebut: string,
    @Query('dateFin') dateFin: string,
  ) {
    const parsedAgentId = parseInt(agentId);
    const parsedCompagneId = parseInt(compagneId);
    const parsedDateDebut = new Date(dateDebut);
    const parsedDateFin = new Date(dateFin);

    if (
      isNaN(parsedAgentId) ||
      isNaN(parsedCompagneId) ||
      isNaN(parsedDateDebut.getTime()) ||
      isNaN(parsedDateFin.getTime())
    ) {
      throw new HttpException(
        "Invalid input: please ensure agentId, compagneId, dateDebut, and dateFin are correctly formatted.",
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.statisticsService.getStatisticsBetweenDates(
      parsedAgentId,
      parsedCompagneId,
      parsedDateDebut,
      parsedDateFin,
    );
  }

  @Post()
  createOrUpdate(@Body() statsData: any): Promise<Statistics> {
    const { agentId, compagneId, dateDebut, dateFin, ...statisticsFields } = statsData;
    return this.statisticsService.createOrUpdateStatistics(agentId, compagneId, new Date(dateDebut), new Date(dateFin), statisticsFields);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.statisticsService.remove(+id);
  }
}
