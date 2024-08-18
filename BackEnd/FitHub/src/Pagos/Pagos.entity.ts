import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'pagos' })
export class Pago {
  @PrimaryColumn()
  preferenceId: string;

  @Column()
  idUsuario: string;

  @Column()
  idPago: string;

  @Column({ default: true })
  estado: boolean;
}
