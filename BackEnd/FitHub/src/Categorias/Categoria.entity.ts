/* eslint-disable prettier/prettier */
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categoria' })
export class Categoria {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @ManyToOne(()=>Plan, (plan)=>plan.category)
    @JoinColumn({name:'categoria'})
    plan: Plan
};
