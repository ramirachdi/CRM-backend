import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Presence } from './presence.entity';
import { CreatePresenceDto } from '../dto/create-presence.dto';
import { Agent } from '../agents/agent.entity';
import { Details } from '../details/details.entity';

@Injectable()
export class PresenceService {
  constructor(
    @InjectRepository(Presence)
    private presenceRepository: Repository<Presence>,
    @InjectRepository(Agent)
    private agentRepository: Repository<Agent>,
    @InjectRepository(Details)
    private detailsRepository: Repository<Details>,
  ) {}

  async createPresence(createPresenceDto: CreatePresenceDto): Promise<Presence> {
    const { date, login, logout, agentId, detailsId } = createPresenceDto;

    const agent = await this.agentRepository.findOne({ where: { id: agentId } });
    if (!agent) {
      throw new NotFoundException(`Agent with ID ${agentId} not found.`);
    }

    let details = null;
    if (detailsId) {
      details = await this.detailsRepository.findOne({ where: { id: detailsId } });
      if (!details) {
        throw new NotFoundException(`Details with ID ${detailsId} not found.`);
      }
    }

    const dureeLog = this.calculateDureeLog(login, logout);

    const presence = this.presenceRepository.create({
      date,
      login,
      logout,
      dureeLog,
      agent,
      details,
    });

    return this.presenceRepository.save(presence);
  }

  async findAll(): Promise<Presence[]> {
    return this.presenceRepository.find({ relations: ['agent', 'details'] });
  }

  async findByAgentAndDate(agentId: number, date: Date): Promise<Presence[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Start of the day
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // End of the day

    return this.presenceRepository.find({
      where: {
        agent: { id: agentId },
        date: Between(startOfDay, endOfDay),
      },
      relations: ['agent', 'details'],
    });
  }

  async findByDate(date: Date): Promise<Presence[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0); // Start of the day
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999); // End of the day

    return this.presenceRepository.find({
      where: { date: Between(startOfDay, endOfDay) },
      relations: ['agent', 'details'],
    });
  }

  async updatePresence(id: number, updateDto: Partial<CreatePresenceDto>): Promise<Presence> {
    const presence = await this.presenceRepository.findOne({ where: { id } });

    if (!presence) {
      throw new NotFoundException(`Presence with ID ${id} not found.`);
    }

    const { login, logout, detailsId } = updateDto;

    if (login && logout) {
      presence.dureeLog = this.calculateDureeLog(login, logout);
    }

    if (detailsId) {
      const details = await this.detailsRepository.findOne({ where: { id: detailsId } });
      if (!details) {
        throw new NotFoundException(`Details with ID ${detailsId} not found.`);
      }
      presence.details = details;
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

  async getPresenceDetails(presenceId: number): Promise<Details> {
    const presence = await this.presenceRepository.findOne({
      where: { id: presenceId },
      relations: ['details'], // Ensure the details relation is loaded
    });

    if (!presence) {
      throw new NotFoundException(`Presence with ID ${presenceId} not found.`);
    }

    if (!presence.details) {
      throw new NotFoundException(`No details found for Presence ID ${presenceId}.`);
    }

    return presence.details;
  }
}
