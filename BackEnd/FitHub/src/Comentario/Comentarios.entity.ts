import { Puntuacion } from 'src/Dto/Puntuacion.Dto';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Rutina } from 'src/Rutina/Rutina.entity';
import { Users } from 'src/User/User.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EstadoComentario } from './EstadoComentario.Enum';

@Entity({
  name: 'Comentarios',
})
export class Comentarios {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column()
  score: Puntuacion;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: EstadoComentario.PUBLICADO })
  state: EstadoComentario;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Users, (usuario) => usuario.comments)
  @JoinColumn({ name: 'usurio' })
  user: Users;

  @ManyToOne(() => Rutina, (rutina) => rutina.comments, { nullable: true })
  @JoinColumn({ name: 'rutina' })
  routine: Rutina;

  @ManyToOne(() => Plan, (plan) => plan.comments, { nullable: true })
  @JoinColumn({ name: 'plan' })
  plan: Plan;
}
