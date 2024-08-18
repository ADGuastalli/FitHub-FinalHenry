import { IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @IsString()
  to: string;

  @IsString()
  subject: string;

  @IsOptional()
  @IsString()
  text: string;
}
