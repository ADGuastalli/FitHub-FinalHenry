/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { loginAuthDto, loginDto } from "./Login.Dto";
import { AuthService } from "./Auth.Sevice";
import { CreateUserDto } from "src/User/CreateUser.Dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @Post('signin')
    async signing(@Body() body:loginDto) {
        const {email, password} = body;
        return await this.authService.signin(email, password);
    }

    @Post('signupuser')
    async signup(@Body() body:CreateUserDto) {
        return await this.authService.signup(body);
    }

    @Post('auth0')
    async auth0(@Body() body:loginAuthDto){
        return await this.authService.auth0(body)
    }
    @Post('signupentrenador')
    async signupEntrenador(@Body() body:CreateUserDto) {
        return await this.authService.signupEntrenador(body);
    }
}