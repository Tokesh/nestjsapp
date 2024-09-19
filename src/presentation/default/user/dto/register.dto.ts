
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';


export default class RegisterDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  public password: string;

  @IsNotEmpty()
  @IsString()
  @Length(10)
  public phone: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  public email: string;
}
