import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class productTags {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;
}
