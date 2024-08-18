import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Users } from 'src/User/User.entity';
import { Suscripciones } from './Suscripciones.entity';
import { SubscriptionsRepository } from './suscripciones.repository';
import { SubscriptionsScheduler } from './suscripciones.scheduler';
import { NotificationService } from 'src/invoice/invoice.service';
import { InvoiceRepository } from 'src/invoice/invoice.repository';
import { Invoice } from 'src/invoice/invoice.entity';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Suscripciones, Users, Plan, Invoice])],
  providers: [
    SubscriptionsRepository,
    SubscriptionsScheduler,
    NotificationService,
    InvoiceRepository,
    MailerService,
  ],
  exports: [SubscriptionsRepository],
})
export class SubscriptionsModule {}
