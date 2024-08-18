import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/User/User.entity';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.Sevice';
import { AuthRepository } from './Auth.Repository';
import { UsersRepository } from 'src/User/User.repository';
import { PasswordService } from './Auth.randonPass';
import { MailerModule } from 'src/mailer/mailer.module';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), MailerModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, UsersRepository, PasswordService, MailerService],
  exports: [AuthService],
})
export class AuthModule {}
