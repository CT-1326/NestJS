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
  UpdateDateColumn,
} from 'typeorm';
import { ProductSalesLocation } from './productSalesLocation.entity';
import { ProductCategory } from './productCategory.entity';
import { User } from './user.entity';
import { ProductTag } from './productTags.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
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

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => ProductSalesLocation)
  @JoinColumn()
  productSalesLocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @ManyToMany(() => ProductTag, (productTag) => productTag.products)
  @JoinTable()
  productTag: ProductTag[];
}
