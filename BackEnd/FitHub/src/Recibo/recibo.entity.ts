import { Users } from 'src/User/User.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StateRecibo } from './recibo.enum';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Rutina } from 'src/Rutina/Rutina.entity';

@Entity({
  name: 'Recibos',
})
export class Recibo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: StateRecibo })
  state: StateRecibo;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Users, (user) => user.recibos)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @OneToOne(() => Plan, (plan) => plan.recibo, { nullable: true })
  @JoinColumn({ name: 'recibo_plan' })
  plan: Plan;

  // @OneToMany(() => Rutina, (rutina) => rutina.recibo, { nullable: true })
  // @JoinColumn({ name: 'recibo_rutina' })
  // rutina: Rutina;
  @OneToMany(() => Rutina, (rutina) => rutina.recibo, { nullable: true })
  rutinas: Rutina[];
}
