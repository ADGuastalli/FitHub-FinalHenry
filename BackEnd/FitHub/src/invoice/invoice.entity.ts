import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Users } from 'src/User/User.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.invoices)
  user: Users;

  @ManyToOne(() => Plan, (plan) => plan.invoices)
  plan: Plan;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string;

  @Column()
  paymentDate: Date;

  @Column()
  dueDate: Date;
}
