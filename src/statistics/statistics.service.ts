import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Statistics } from './statistics.entity';
import { Agent } from '../agents/agent.entity';
import { Compagne } from '../compagnes/compagne.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private statisticsRepository: Repository<Statistics>,
    @InjectRepository(Agent)
    private agentRepository: Repository<Agent>,
    @InjectRepository(Compagne)
    private compagneRepository: Repository<Compagne>,
  ) {}

  async createOrUpdateStatistics(
    agentId: number,
    compagneId: number,
    dateDebut: Date,
    dateFin: Date,
    statsData: Partial<Statistics>
  ): Promise<Statistics> {
    let stats = await this.statisticsRepository.findOne({
      where: { agent: { id: agentId }, compagne: { id: compagneId }, dateDebut, dateFin },
    });

    if (!stats) {
      stats = new Statistics();
      stats.agent = await this.agentRepository.findOne({ where: { id: agentId } });
      stats.compagne = await this.compagneRepository.findOne({ where: { id: compagneId } });
      stats.dateDebut = dateDebut;
      stats.dateFin = dateFin;
    }

    // Update the statistics values
    stats.nombreAppelsEntrants = statsData.nombreAppelsEntrants || stats.nombreAppelsEntrants;
    stats.dtce = statsData.dtce || stats.dtce;
    stats.dmce = stats.nombreAppelsEntrants > 0 ? stats.dtce / stats.nombreAppelsEntrants : 0;
    stats.nombreAppelsSortants = statsData.nombreAppelsSortants || stats.nombreAppelsSortants;
    stats.dtcs = statsData.dtcs || stats.dtcs;
    stats.dmcs = stats.nombreAppelsSortants > 0 ? stats.dtcs / stats.nombreAppelsSortants : 0;

    return this.statisticsRepository.save(stats);
  }

  async getStatisticsBetweenDates(
    agentId: number,
    compagneId: number,
    dateDebut: Date,
    dateFin: Date
  ): Promise<any> {
    let currentDate = new Date(dateDebut);
    const endDate = new Date(dateFin);

    const result = {
      nombreAppelsEntrants: 0,
      dtce: 0,
      dmce: 0,
      nombreAppelsSortants: 0,
      dtcs: 0,
      dmcs: 0,
      totalDays: 0,
    };

    while (currentDate <= endDate) {
      const stats = await this.statisticsRepository.findOne({
        where: {
          agent: { id: agentId },
          compagne: { id: compagneId },
          dateDebut: currentDate,
        },
      });

      if (stats) {
        result.nombreAppelsEntrants += stats.nombreAppelsEntrants || 0;
        result.dtce += stats.dtce || 0;
        result.nombreAppelsSortants += stats.nombreAppelsSortants || 0;
        result.dtcs += stats.dtcs || 0;
        result.totalDays += 1;
      }

      // Increment currentDate by one day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Calculate averages for dmce and dmcs
    result.dmce = result.nombreAppelsEntrants > 0 ? result.dtce / result.nombreAppelsEntrants : 0;
    result.dmcs = result.nombreAppelsSortants > 0 ? result.dtcs / result.nombreAppelsSortants : 0;

    return {
      agentId,
      compagneId,
      ...result,
    };
  }

  async findAll(): Promise<Statistics[]> {
    return this.statisticsRepository.find({ relations: ['agent', 'compagne'] });
  }

  async findOne(id: number): Promise<Statistics> {
    return this.statisticsRepository.findOne({ where: { id }, relations: ['agent', 'compagne'] });
  }

  async remove(id: number): Promise<void> {
    await this.statisticsRepository.delete(id);
  }
}
