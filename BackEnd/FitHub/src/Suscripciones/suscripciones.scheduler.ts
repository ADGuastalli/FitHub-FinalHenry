/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { SubscriptionsRepository } from "./suscripciones.repository";
import { Cron, CronExpression } from "@nestjs/schedule";
import { LessThan } from "typeorm";

@Injectable()
export class SubscriptionsScheduler {
   constructor(private readonly subscriptionsRepository: SubscriptionsRepository) {}

   @Cron(CronExpression.EVERY_10_MINUTES)
   async handleCron(){
       try{
           const subscriptions = await this.subscriptionsRepository.findExpiredSubscriptions();

           for (const subscription of subscriptions) {
               subscription.state = false;
               await this.subscriptionsRepository.saveSubscriptions(subscription);
           }
           console.log('Suscripciones actualizadas.');
       } catch (error){
           console.error('Error al actualizar las suscripciones:', error);
       }
   }
}
