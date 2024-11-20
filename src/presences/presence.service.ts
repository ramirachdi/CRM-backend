import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Between } from 'typeorm';
import { Presence } from './presence.entity';
import { CreatePresenceDto } from '../dto/create-presence.dto';
import { Agent } from '../agents/agent.entity';

@Injectable()
export class PresenceService {
  constructor(
    @InjectRepository(Presence)
    private presenceRepository: Repository<Presence>,
    @InjectRepository(Agent)
    private agentRepository: Repository<Agent>,
  ) {}

  async createPresence(createPresenceDto: CreatePresenceDto): Promise<Presence> {
    const { date, login, logout, agentId, detailsId } = createPresenceDto;

    const agent = await this.agentRepository.findOne({ where: { id: agentId } });
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${agentId} not found.`);
    }

    const dureeLog = this.calculateDureeLog(login, logout);

    const presence = this.presenceRepository.create({
      date,
      login,
      logout,
      dureeLog,
      agent,
      detailsId,
    });

    return this.presenceRepository.save(presence);
  }

  async findAll(): Promise<Presence[]> {
    return this.presenceRepository.find({ relations: ['agent'] });
  }

  async findByAgentAndDate(agentId: number, date: Date): Promise<Presence[]> {
    const formattedDate = this.formatDate(date);
    return this.presenceRepository.find({
      where: { agent: { id: agentId }, date: new Date(formattedDate) },
      relations: ['agent'],
    });
  }

  async findByDate(date: Date): Promise<Presence[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Set to the start of the day
  
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day
  
    return this.presenceRepository.find({
      where: { date: Between(startOfDay, endOfDay) },
      relations: ['agent'],
    });
  }
  

  async updatePresence(id: number, updateDto: Partial<CreatePresenceDto>): Promise<Presence> {
    const presence = await this.presenceRepository.findOne({ where: { id } });

    if (!presence) {
      throw new NotFoundException(`Presence with ID ${id} not found.`);
    }

    const { login, logout } = updateDto;
    if (login && logout) {
      presence.dureeLog = this.calculateDureeLog(login, logout);
    }

    Object.assign(presence, updateDto);
    return this.presenceRepository.save(presence);
  }

  async deletePresence(id: number): Promise<void> {
    const result = await this.presenceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Presence with ID ${id} not found.`);
    }
  }

  private calculateDureeLog(login: string, logout: string): string {
    const [loginHours, loginMinutes, loginSeconds] = login.split(':').map(Number);
    const [logoutHours, logoutMinutes, logoutSeconds] = logout.split(':').map(Number);

    const loginInSeconds = loginHours * 3600 + loginMinutes * 60 + loginSeconds;
    const logoutInSeconds = logoutHours * 3600 + logoutMinutes * 60 + logoutSeconds;

    const durationInSeconds = logoutInSeconds - loginInSeconds;
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Formats date to YYYY-MM-DD
  }
}
