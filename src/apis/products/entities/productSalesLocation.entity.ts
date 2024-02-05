import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class productSalesLocation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  address: string;

  @Column({ type: 'decimal' })
  lat: number;

  @Column({ type: 'decimal' })
  lng: number;

  @Column()
  meetingTime: Date;
}
