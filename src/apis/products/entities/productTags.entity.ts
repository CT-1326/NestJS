// import { Product } from 'src/apis/products/entities/product.entity';
// import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Product, (products) => products.productTags)
  products: Product[];
}
