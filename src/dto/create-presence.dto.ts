import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePresenceDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  logout: string;

  @IsOptional()
  @IsString()
  dureeLog: string;

  @IsNotEmpty()
  agentId: number;

  @IsOptional()
  detailsId: number;
}
