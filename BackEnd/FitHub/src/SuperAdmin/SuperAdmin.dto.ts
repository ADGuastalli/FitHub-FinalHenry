import { IsEmail, IsNotEmpty } from "class-validator";

export class superAdminDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}