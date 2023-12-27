import {Injectable} from '@nestjs/common';
// import { Product } from './interfaces/product.interface';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './entities/product.entity';
import {DataSource, Repository} from 'typeorm';
import {CreateProductInput} from './dto/createProduct.dto';
import {UpdateProductInput} from './dto/updateProduct.dto';
import {ProductSalesLocation} from './entities/productSalesLocation.entity';
import {ProductTag} from './entities/productTags.entity';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)private readonly productRepository : Repository<Product>,
        @InjectRepository(ProductSalesLocation)private readonly productSalesLocationRepository : Repository<ProductSalesLocation>,
        @InjectRepository(ProductTag)private readonly productTagRepository : Repository<ProductTag>,
        @InjectRepository(ProductCategory)private readonly productCategoryRepository : Repository<ProductCategory>,
        private readonly connection : DataSource
    ) {}

    async create(input : CreateProductInput): Promise<Product> {
        const {
            productSalesLocation,
            productCategoryId,
            productTags,
            ...product
        } = input;

        const queryRunner = await this
            .connection
            .createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const location = await this
                .productSalesLocationRepository
                .create({
                    ...productSalesLocation
                });
            await queryRunner
                .manager
                .save(location);
            // console.log("location : ", location);

            const category = await this
                .productCategoryRepository
                .create({
                    name : `category${productCategoryId}`
                });
            await queryRunner
                .manager
                .save(category);
            // console.log("category : ", category);

            const productTagList = await Promise.all(productTags.map(el => {
                return new Promise(async (resolve, reject) => {
                    const tagName = el.replace('#', '');

                    const existTag = await queryRunner
                        .manager
                        .createQueryBuilder(ProductTag, 'pt')
                        .where('pt.name = :name', {name: tagName})
                        .getOne();

                    console.log("existTag : ",existTag);
                    
                    if (existTag) {
                        resolve(existTag);
                    } else {
                        const newTag = await this
                            .productTagRepository
                            .create({name: tagName});
                        await queryRunner
                            .manager
                            .save(newTag);
                        resolve(newTag);
                    }
                });
            }));

            const products = await this
                .productRepository
                .create({
                    ...product,
                    productSalesLocation: location,
                    productCategory: {
                        id: productCategoryId
                    },
                    productTags: productTagList
                });
            const result = await queryRunner
                .manager
                .save(products);
            await queryRunner.commitTransaction();
            return result;
        } catch (error) {
            console.error(error);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    async modify(input : UpdateProductInput): Promise<Product> {
        const {
            productSalesLocation,
            productCategoryId,
            productTags,
            ...product
        } = input;

        const exist = await this
            .productRepository
            .findOne({
                where: {
                    id: product.id
                },
                relations: ['productSalesLocation']
            });

        const location = await this
            .productSalesLocationRepository
            .save({
                ...productSalesLocation,
                id: exist.productSalesLocation.id
            });

        const productTagList = await Promise.all(productTags.map(el => {
            return new Promise(async (resolve, reject) => {
                const tagName = el.replace('#', '');
                const existTag = await this
                    .productTagRepository
                    .findOneBy({name: tagName});
                if (existTag) {
                    resolve(existTag);
                } else {
                    const newTag = await this
                        .productTagRepository
                        .save({name: tagName});
                    resolve(newTag);
                }
            });
        }));

        const newProduct = await this
            .productRepository
            .save({
                ...exist,
                ...product,
                productSalesLocation: location,
                productCategory: {
                    id: productCategoryId
                },
                productTags: productTagList
            });

        const result = await this
            .productRepository
            .save(newProduct);
        return result;
    }

    async delete(id : number): Promise<boolean> {
        const result = await this
            .productRepository
            .softDelete({id: id});

        return result.affected
            ? true
            : false;
    }

    async findAll(): Promise<Product[]> {
        const result = await this
            .productRepository
            .find({});
        return result;
    }

    async findOne(id : number): Promise<Product> {
        const result = await this
            .productRepository
            .findOne({
                where: {
                    id: id
                }
            });
        return result;
    }
}
