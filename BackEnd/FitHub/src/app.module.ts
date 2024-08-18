import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../config/typeORMconig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutinaModule } from './Rutina/Rutina.module';
import { usersModule } from './User/User.module';
import { AuthModule } from './Auth/Auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EjercicoModule } from './Ejercicios/Ejercicios.module';
import { PlanModule } from './PlanDeEntranmiento/Plan.module';
import { FilesUploadModule } from './files-upload/files-upload.module';
import { commentsModule } from './Comentario/Comentarios.module';
import { SeederModule } from './Seeder/seeder.module';
import { CategoryModule } from './Category/Category.module';
import { MailerModule } from './mailer/mailer.module';
import { SubscriptionsModule } from './Suscripciones/suscripciones.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ReciboModule } from './Recibo/recibo.module';
import { AdminModule } from './Admin/admin.module';
import { SuperAdminModule } from './SuperAdmin/SuperAdmin.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get('typeorm');
        return config;
      },
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),
    AdminModule,
    RutinaModule,
    usersModule,
    commentsModule,
    AuthModule,
    EjercicoModule,
    PlanModule,
    RutinaModule,
    usersModule,
    AuthModule,
    SeederModule,
    FilesUploadModule,
    CategoryModule,
    MailerModule,
    SubscriptionsModule,
    ReciboModule,
    SuperAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
