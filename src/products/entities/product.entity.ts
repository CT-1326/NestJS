import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSalesLocation } from './productSalesLocation.entity';
import { ProductCategory } from './productCategory.entity';
import { ProductTag } from './productTags.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: false })
  isSoldOut: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @DeleteDateColumn()
  updateAt: Date;

  @JoinColumn()
  @OneToOne(() => ProductSalesLocation)
  productSalesLocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @JoinTable()
  @ManyToMany(() => ProductTag, (pt) => pt.products)
  productTags: ProductTag[];
}
