/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SolicitudState, UserRole } from './User.enum';
import { Comentarios } from 'src/Comentario/Comentarios.entity';
import { Suscripciones } from 'src/Suscripciones/Suscripciones.entity';
import { Rutina } from 'src/Rutina/Rutina.entity';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Ejercicio } from 'src/Ejercicios/Ejercicios.entity';
import { Recibo } from 'src/Recibo/recibo.entity';
import { Invoice } from 'src/invoice/invoice.entity';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  password: string;

  @Column({ type: 'bigint', unique: true, nullable: true })
  dni: number;

  @Column({ type: 'bigint', nullable: true })
  phone: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @Column('text', { nullable: true })
  imgUrl: string;

  @Column({ default: SolicitudState.NONE })
  solicitud: SolicitudState;

  @Column({ type: 'varchar', nullable: true })
  cvpdf: string;

  @Column({ type: 'varchar', nullable: true })
  cvvideo: string;

  @ManyToMany(() => Rutina, (rutina) => rutina.users)
  @JoinTable({ name: 'usuario-rutina' })
  routine: Rutina[];

  @OneToMany(() => Suscripciones, (suscripcion) => suscripcion.user)
  @JoinColumn({ name: 'suscripciones' })
  subsciption: Suscripciones[];

  @OneToMany(() => Rutina, (rutina) => rutina.admin)
  @JoinTable({ name: 'admin-rutina' })
  routineAdmin: Rutina[];

  @OneToMany(() => Plan, (planes) => planes.admin)
  @JoinTable({ name: 'admin-plan' })
  planAdmin: Plan[];

  @OneToMany(() => Ejercicio, (ejercicio) => ejercicio.user)
  @JoinColumn({ name: 'ejercicios' })
  exercise: Ejercicio[];

  @OneToMany(() => Comentarios, (comentario) => comentario.user)
  @JoinColumn({ name: 'comentarios' })
  comments: Comentarios[];

  @Column({ default: false })
  delete: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Recibo, (recibo) => recibo.user)
  @JoinTable({ name: 'recibos-user' })
  recibos: Recibo[];

  @OneToMany(() => Invoice, (invoice) => invoice.user)
  invoices: Invoice[];
}
