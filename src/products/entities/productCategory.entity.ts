import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}