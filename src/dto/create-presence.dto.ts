import { IsDate, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePresenceDto {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  logout: string;

  @IsNotEmpty()
  @IsInt()
  agentId: number;

  @IsOptional()
  @IsInt()
  detailsId: number; 
}
