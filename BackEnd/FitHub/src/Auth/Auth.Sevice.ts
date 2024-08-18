import { Injectable } from '@nestjs/common';
import { AuthRepository } from './Auth.Repository';
import { CreateUserDto } from 'src/User/CreateUser.Dto';
import { MailerService } from 'src/mailer/mailer.service';
import { loginAuthDto } from './Login.Dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly mailerService: MailerService,
  ) {}

  async signin(email: string, password: string): Promise<object> {
    return await this.authRepository.signin(email, password);
  }

  async signup(body: CreateUserDto) {
    const { email } = body;
    const to = email;
    const subject = 'Bienvenido/a a FitHub - Tu entrenador personalizado';
    const text = 'Estoy probando con texto plano';

    const newUser = await this.authRepository.signup(body);
    if (newUser) {
      await this.mailerService.notificarRegistro(to, subject, text);
    } else {
      return 'Algo ha salido mal';
    }
    return 'usuario creado';
  }
  async signupEntrenador(body: CreateUserDto) {
    const { email } = body;
    const to = email;
    const subject = 'Bienvenido/a a FitHub - Tu entrenador personalizado';
    const text =
      'Te has registrado como entrenador. Ahora debes esperar la aprobacion por el administrador. Seras notificado de esto.';

    const newEntrenador = await this.authRepository.signupEntrenador(body);
    if (newEntrenador) {
      await this.mailerService.notificarRegistro(to, subject, text);
    } else {
      return 'Algo ha salido mal';
    }
    return 'entrenador creado';
  }
  async auth0(body: loginAuthDto) {
    return await this.authRepository.auth0(body);
  }
}
