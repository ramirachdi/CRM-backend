import { IsString,IsEmail, IsNotEmpty } from 'class-validator';

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
}
