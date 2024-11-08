import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

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
}
