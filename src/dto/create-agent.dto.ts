import { IsString, IsEmail, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAgentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsNumber()
  compagneId?: number;
}
