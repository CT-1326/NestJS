import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { productSalesLocation } from './productSalesLocation.entity';
import { productCategory } from './productCategory.entity';
import { User } from './user.entity';
import { productTags } from './productTags.entity';

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

  @OneToOne(() => productSalesLocation)
  @JoinColumn()
  productSalesLocation: productSalesLocation;

  @ManyToOne(() => productCategory)
  productCategory: productCategory;

  @ManyToOne(() => User)
  user: User;

  @ManyToMany(() => productTags, (productTag) => productTag.products)
  productTag: productTags[];
}
