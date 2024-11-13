import { IsString, IsEmail, IsOptional ,IsArray} from 'class-validator';

export class UpdateAgentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsArray()
  @IsOptional()
  compagneIds?: number[];
}
