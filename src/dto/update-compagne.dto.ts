import { IsString,IsEmail, IsOptional, IsArray, IsNumber} from 'class-validator';

export class UpdateCompagneDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  typeDeService: string;

  @IsOptional()
  @IsArray()
  agentsIds?: number[];
}
