import { IsString, IsEmail, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateCompagneDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  typeDeService: string;

  @IsOptional()
  @IsArray()
  agentsIds?: number[];
}
