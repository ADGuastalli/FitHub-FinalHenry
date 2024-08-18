import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AdminPermissionException,
  NoPendingRequestsException,
} from 'src/Exceptions/Admin.exceptions';
import { MailerService } from 'src/mailer/mailer.service';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Rutina } from 'src/Rutina/Rutina.entity';
import { Users } from 'src/User/User.entity';
import { SolicitudState, UserRole } from 'src/User/User.enum';
import { UsersRepository } from 'src/User/User.repository';
import { Repository } from 'typeorm';

@Injectable()
export class AdminRepository {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(Plan) private readonly planRepository: Repository<Plan>,
    @InjectRepository(Rutina)
    private readonly rutinaRepository: Repository<Rutina>,
  ) {}
  async solicitudPending(id: string) {
    const admin = await this.userRepository.findOne({ where: { id } });
    
    const coachs = await this.userRepository.find({
      where: { solicitud: SolicitudState.PENDING },
    });
    const planes = await this.planRepository.find({
      where: { check: SolicitudState.PENDING },
      relations: ['admin', 'category'],
    });
    const rutinas = await this.rutinaRepository.find({
      where: { check: SolicitudState.PENDING },
      relations: ['admin', 'category', 'exercise'],
    });

    if (coachs.length === 0 && planes.length === 0 && rutinas.length === 0) {
      throw new NoPendingRequestsException();
    }

    return { coachs, planes, rutinas };
  }

  async aceptarSolicitud(
    id: string,
    coach?: string,
    plan?: string,
    rutina?: string,
  ) {
    if (coach) {
      const user = await this.userRepository.findOne({ where: { id: coach } });
      if (user.solicitud === SolicitudState.PENDING) {
        await this.userRepository.update(coach, {
          solicitud: SolicitudState.ACCEPTED,
          role: UserRole.ENTRENADOR,
        });
        await this.mailerService.notificarRegistro(
          user.email,
          'Solicitud aceptada',
          'Tu solicitud ha sido aceptada, bienvenido a FitHub',
        );
        return 'Solicitud aceptada';
      }
      if (user.solicitud === SolicitudState.DENIED) {
        throw new BadRequestException(
          'Ya tienes una solicitud denegada, comunicarte con la administracion',
        );
      }
      throw new BadRequestException('No hay solicitudes pendientes');
    } else if (plan) {
      const planSol = await this.planRepository.findOne({
        where: { id: plan },
        relations: ['admin'],
      });
      if (planSol.check === SolicitudState.PENDING) {
        await this.planRepository.update(plan, {
          check: SolicitudState.ACCEPTED,
        });
        await this.mailerService.notificarRegistro(
          planSol.admin.email,
          'Solicitud aceptada',
          'Tu solicitud ha sido aceptada, tu plan de entrenamineto ya se encuentra activo en FitHub',
        );
        return 'Solicitud aceptada';
      } else if (planSol.check === SolicitudState.DENIED) {
        throw new BadRequestException(
          'Ya tienes una solicitud denegada, comunicarte con la administracion',
        );
      }
    } else if (rutina) {
      const rutinaSol = await this.rutinaRepository.findOne({
        where: { id: rutina },
        relations: ['admin'],
      });
      if (rutinaSol.check === SolicitudState.PENDING) {
        await this.rutinaRepository.update(rutina, {
          check: SolicitudState.ACCEPTED,
        });
        await this.mailerService.notificarRegistro(
          rutinaSol.admin.email,
          'Solicitud aceptada',
          'Tu solicitud ha sido aceptada, tu rutina ya se encuentra activa en FitHub',
        );
        return 'Solicitud aceptada';
      } else if (rutinaSol.check === SolicitudState.DENIED) {
        throw new BadRequestException(
          'Ya tienes una solicitud denegada, comunicarte con la administracion',
        );
      }
    }
  }

  async corregirSolicitud(
    id: string,
    profe?: string,
    planRes?: string,
    rutinaRes?: string,
  ) {
    if (profe) {
      const user = await this.userRepository.findOne({ where: { id: profe } });
      console.log(user);
      if (user.solicitud === SolicitudState.CORRECTION) {
        throw new BadRequestException('Ya esta en correccion');
      }
      if (user.solicitud === SolicitudState.PENDING) {
        await this.userRepository.update(profe, {
          solicitud: SolicitudState.CORRECTION,
        });
        await this.mailerService.notificarRegistro(
          user.email,
          'Solicitud en correccion',
          'Tu perfil de entrenador es interesante. Por favor, corrige la documentación y vuelve a realizar la solicitud.',
        );
        return 'Solicitud en correccion';
      }
      if (user.solicitud === SolicitudState.DENIED) {
        throw new BadRequestException('Solicitud denegada');
      }
    } else if (planRes) {
      const planSol = await this.planRepository.findOne({
        where: { id: planRes },
        relations: ['admin'],
      });
      if (planSol.check === SolicitudState.CORRECTION) {
        throw new BadRequestException('Ya esta en correccion');
      }
      if (planSol.check === SolicitudState.PENDING) {
        await this.planRepository.update(planRes, {
          check: SolicitudState.CORRECTION,
        });
        await this.mailerService.notificarRegistro(
          planSol.admin.email,
          'Solicitud en correccion',
          'Tu plan de entrenamiento es interesante. Por favor, corrige la documentación y vuelve a realizar la solicitud.',
        );
        return 'Solicitud en correccion';
      } else if (planSol.check === SolicitudState.DENIED) {
        throw new BadRequestException('Solicitud denegada');
      }
    } else if (rutinaRes) {
      const rutinaSol = await this.rutinaRepository.findOne({
        where: { id: rutinaRes },
        relations: ['admin'],
      });
      if (rutinaSol.check === SolicitudState.CORRECTION) {
        throw new BadRequestException('Ya esta en correccion');
      }
      if (rutinaSol.check === SolicitudState.PENDING) {
        await this.rutinaRepository.update(rutinaRes, {
          check: SolicitudState.CORRECTION,
        });
        await this.mailerService.notificarRegistro(
          rutinaSol.admin.email,
          'Solicitud en correccion',
          'Tu rutina es interesante. Por favor, corrige la documentación y vuelve a realizar la solicitud.',
        );
        return 'Solicitud en correccion';
      } else if (rutinaSol.check === SolicitudState.DENIED) {
        throw new BadRequestException('Solicitud denegada');
      }
    }
    throw new BadRequestException('No hay solicitudes pendientes');
  }

  async denegarSolicitud(
    id: string,
    coach: string,
    plan?: string,
    rutina?: string,
  ) {
    if (coach) {
      const user = await this.userRepository.findOne({ where: { id: coach } });
      if (user.solicitud === SolicitudState.PENDING) {
        await this.userRepository.update(coach, {
          solicitud: SolicitudState.DENIED,
        });
        await this.mailerService.notificarRegistro(
          user.email,
          'Solicitud denegada',
          'Tu solicitud ha sido denegada, comunicate con la administracion para mas informacion',
        );
        return 'Solicitud denegada';
      }
      if (user.solicitud === SolicitudState.ACCEPTED) {
        throw new BadRequestException('Ya tenia la solicitud aceptada');
      }
    } else if (plan) {
      const planSol = await this.planRepository.findOne({
        where: { id: plan },
        relations: ['admin'],
      });
      if (planSol.check === SolicitudState.PENDING) {
        await this.planRepository.update(plan, {
          check: SolicitudState.DENIED,
        });
        await this.mailerService.notificarRegistro(
          planSol.admin.email,
          'Solicitud denegada',
          'Tu solicitud ha sido denegada, comunicate con la administracion para mas informacion',
        );
        return 'Solicitud denegada';
      } else if (planSol.check === SolicitudState.ACCEPTED) {
        throw new BadRequestException('Ya tenia la solicitud aceptada');
      }
    } else if (rutina) {
      const rutinaSol = await this.rutinaRepository.findOne({
        where: { id: rutina },
        relations: ['admin'],
      });
      if (rutinaSol.check === SolicitudState.PENDING) {
        await this.rutinaRepository.update(rutina, {
          check: SolicitudState.DENIED,
        });
        await this.mailerService.notificarRegistro(
          rutinaSol.admin.email,
          'Solicitud denegada',
          'Tu solicitud ha sido denegada, comunicate con la administracion para mas informacion',
        );
        return 'Solicitud denegada';
      } else if (rutinaSol.check === SolicitudState.ACCEPTED) {
        throw new BadRequestException('Ya tenia la solicitud aceptada');
      }
      throw new BadRequestException('No hay solicitudes pendientes');
    }
  }
}
