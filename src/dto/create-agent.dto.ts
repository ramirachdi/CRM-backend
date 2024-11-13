import { IsString, IsEmail, IsOptional, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

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

  @IsArray()
  @IsOptional()
  compagneIds?: number[];
}
