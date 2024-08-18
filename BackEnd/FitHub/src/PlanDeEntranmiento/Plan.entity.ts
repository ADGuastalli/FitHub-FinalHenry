/* eslint-disable @typescript-eslint/no-unused-vars */
import { Categoria } from 'src/Categorias/Categoria.entity';
import { Comentarios } from 'src/Comentario/Comentarios.entity';
import { Suscripciones } from 'src/Suscripciones/Suscripciones.entity';
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
import { DifficultyLevel } from './difficultyLevel.enum';
import { Category } from 'src/Category/Category.entity';
import { Recibo } from 'src/Recibo/recibo.entity';
import { Invoice } from 'src/invoice/invoice.entity';
import { SolicitudState } from 'src/User/User.enum';

@Entity({ name: 'plan' })
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', default: SolicitudState.PENDING })
  check: SolicitudState;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  location: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @CreateDateColumn()
  date: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 100 })
  difficultyLevel: DifficultyLevel;

  @ManyToOne(() => Users, (user) => user.planAdmin)
  @JoinColumn({ name: 'admin' })
  admin: Users;

  @OneToMany(() => Comentarios, (comentarios) => comentarios.plan)
  @JoinColumn({ name: 'comentarios' })
  comments: Comentarios[];

  @OneToMany(() => Suscripciones, (suscripcion) => suscripcion.plan)
  subscriptions: Suscripciones[];

  @ManyToMany(() => Category, (category) => category.plan)
  @JoinTable({ name: 'category-plan' })
  category: Category[];

  @OneToOne(() => Recibo, (recibo) => recibo.plan)
  recibo: Recibo;

  @Column('text', { nullable: true })
  imgUrl: string;

  @Column('text', { array: true, nullable: true })
  videoUrl: string[];

  @OneToMany(() => Invoice, (invoice) => invoice.plan)
  invoices: Invoice[];
}
