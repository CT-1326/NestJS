import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class productCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
