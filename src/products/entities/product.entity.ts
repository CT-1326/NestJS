import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
}