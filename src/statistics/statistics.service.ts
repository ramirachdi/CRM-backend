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
    // Convert dateDebut and dateFin to dates without time
    const truncatedDateDebut = new Date(dateDebut);
    truncatedDateDebut.setHours(0, 0, 0, 0);
  
    const truncatedDateFin = new Date(dateFin);
    truncatedDateFin.setHours(0, 0, 0, 0);
  
    let stats = await this.statisticsRepository.findOne({
      where: { agent: { id: agentId }, compagne: { id: compagneId }, dateDebut: truncatedDateDebut, dateFin: truncatedDateFin },
    });
  
    if (!stats) {
      stats = new Statistics();
      stats.agent = await this.agentRepository.findOne({ where: { id: agentId } });
      stats.compagne = await this.compagneRepository.findOne({ where: { id: compagneId } });
      stats.dateDebut = truncatedDateDebut;
      stats.dateFin = truncatedDateFin;
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
    const startDate = new Date(dateDebut);
    const endDate = new Date(dateFin);
  
    // Initialize result object
    const result = {
      nombreAppelsEntrants: 0,
      dtce: 0,
      nombreAppelsSortants: 0,
      dtcs: 0,
      totalDays: 0,
      dmce: 0,
      dmcs: 0,
    };
  
    // Loop through each day within the range from dateDebut to the dateFin
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dayStart = new Date(currentDate);
      dayStart.setHours(0, 0, 0, 0); // Start of the day
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999); // End of the day
  
      const stats = await this.statisticsRepository.findOne({
        where: {
          agent: { id: agentId },
          compagne: { id: compagneId },
          dateDebut: Between(dayStart, dayEnd),
        },
      });
  
      // If a record is found for the current day, add its values to the result
      if (stats) {
        result.nombreAppelsEntrants += stats.nombreAppelsEntrants;
        result.dtce += stats.dtce;
        result.nombreAppelsSortants += stats.nombreAppelsSortants;
        result.dtcs += stats.dtcs;
        result.totalDays += 1;
      }
  
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    // Calculate averages for dmce and dmcs based on total values
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
