/* eslint-disable @typescript-eslint/no-unused-vars */
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Users } from 'src/User/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'suscripciones',
})
export class Suscripciones {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  state: boolean;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions)
  @JoinColumn({ name: 'plan' })
  plan: Plan;

  @ManyToOne(() => Users, (user) => user.subsciption)
  @JoinColumn({ name: 'usuario' })
  user: Users;
}
