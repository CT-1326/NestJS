import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class productTags {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Product, (products) => products.productTag)
  products: Product[];
}
