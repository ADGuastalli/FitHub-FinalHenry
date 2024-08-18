import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class solicitudCoachDto {
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    cvpdf: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    cvvideo: string;
}