import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductInput } from './dto/createProduct.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Connection, Repository } from 'typeorm';
import { UpdateProductInput } from './dto/updateProduct.dto';
import { ProductSalesLocation } from './entities/productSalesLocation.entity';
import { ProductTag } from './entities/productTags.entity';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSalesLocation)
    private readonly productSalesLocationRepository: Repository<ProductSalesLocation>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
    private readonly connection: Connection,
  ) {}

  async create(input: CreateProductInput): Promise<Product> {
    const { productSalesLocation, productCategory, productTags, ...product } =
      input;
    const queryRunner = await this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const location = await this.productSalesLocationRepository.create({
        ...productSalesLocation,
      });
      await queryRunner.manager.save(location);

      const category = await this.productCategoryRepository.create({
        name: productCategory,
      });
      await queryRunner.manager.save(category);

      const productTagList = await Promise.all(
        productTags.map((el) => {
          return new Promise(async (resolve) => {
            const tagName = el.replace('#', '');

            const existTag = await queryRunner.manager
              .createQueryBuilder(ProductTag, 'pt')
              .where('pt.name = :name', { name: tagName })
              .getOne();

            if (existTag) {
              resolve(existTag);
            } else {
              const newTag = await this.productTagRepository.create({
                name: tagName,
              });
              await queryRunner.manager.save(newTag);
              resolve(newTag);
            }
          });
        }),
      );

      const products = await this.productRepository.create({
        ...product,
        productSalesLocation: location,
        productCategory: category,
        productTags: productTagList,
      });
      const result = await queryRunner.manager.save(products);
      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      console.error('From create : ', error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to create');
    } finally {
      await queryRunner.release();
    }
  }

  async modify(id: number, input: UpdateProductInput): Promise<Product> {
    const { productSalesLocation, productCategory, productTags, ...product } =
      input;
    const queryRunner = await this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const exist = await this.productRepository.findOne({
        where: { id: id },
        relations: ['productSalesLocation', 'productCategory'],
      });

      const location = await this.productSalesLocationRepository.save({
        ...productSalesLocation,
        id: exist.productSalesLocation.id,
      });
      await queryRunner.manager.save(location);

      const category = await this.productCategoryRepository.save({
        name: productCategory,
        id: exist.productCategory.id,
      });
      await queryRunner.manager.save(category);

      const productTagList = await Promise.all(
        productTags.map((el) => {
          return new Promise(async (resolve) => {
            const tagName = el.replace('#', '');
            const existTag = await this.productTagRepository.findOne({
              where: { name: tagName },
            });
            if (existTag) {
              resolve(existTag);
            } else {
              const newTag = await this.productTagRepository.save({
                name: tagName,
              });
              await queryRunner.manager.save(newTag);
              resolve(newTag);
            }
          });
        }),
      );

      const newProduct = await this.productRepository.save({
        ...exist,
        ...product,
        productSalesLocation: location,
        productCategory: category,
        productTags: productTagList,
      });
      const result = await queryRunner.manager.save(newProduct);
      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      console.error('From modify : ', error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to modify');
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const queryRunner = await this.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const result = await queryRunner.manager
        .createQueryBuilder()
        .update(Product)
        .set({ deletedAt: new Date() })
        .where('id = :id', { id })
        .execute();

      await queryRunner.commitTransaction();

      return result ? true : false;
    } catch (error) {
      console.error('From delete : ', error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to delete');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Product[]> {
    const result = await this.productRepository
      .createQueryBuilder()
      .orderBy('updatedAt', 'DESC')
      .getMany();

    return result;
  }

  async findeOne(id: number): Promise<Product> {
    const result = await this.productRepository
      .createQueryBuilder()
      .where(`id=${id}`)
      .getOne();

    return result;
  }
}
