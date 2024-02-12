import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/createProduct.dto';
import { UpdateProductInput } from './dto/updateProduct.dto';
// import { Product } from './interface/product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Connection, Repository } from 'typeorm';
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
    private readonly productTagsRepository: Repository<ProductTag>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
    private connection: Connection,
  ) {}

  async create(input: CreateProductInput): Promise<Product> {
    const { productSalesLocation, productCategory, productTags, ...product } =
      input;
    const queryRunner = await this.connection.createQueryRunner();

    try {
      // 트랜잭션 사용을 위해서 queryRunner 연결
      await queryRunner.connect();
      // 트랜잭션 시작
      await queryRunner.startTransaction();

      //위치 저장
      const location = await this.productSalesLocationRepository.create({
        ...productSalesLocation,
      });
      await queryRunner.manager.save(location);

      //카테고리 저장
      const category = await this.productCategoryRepository.create({
        name: productCategory,
      });
      await queryRunner.manager.save(category);

      //태그 등록
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
              const newTag = await this.productTagsRepository.create({
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
        productTag: productTagList,
      });

      const result = await queryRunner.manager.save(products);
      // 트랜잭션 커밋
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      // 트랜잭션 롤백
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      // queryRunner 연결 종료
      await queryRunner.release();
    }
  }

  async modify(id: number, input: UpdateProductInput): Promise<Product> {
    const { productSalesLocation, productCategory, productTags, ...product } =
      input;

    const exist = await this.productRepository.findOne({
      where: { id: id },
      relations: ['productSalesLocation', 'productCategory'],
    });

    //위치 갱신
    const location = await this.productSalesLocationRepository.save({
      ...productSalesLocation,
      id: exist.productSalesLocation.id,
    });

    //카테고리 갱신
    const category = await this.productCategoryRepository.save({
      name: productCategory,
      id: exist.productCategory.id,
    });

    //태그 등록
    const productTagList = await Promise.all(
      productTags.map((el) => {
        return new Promise(async (resolve) => {
          const tagName = el.replace('#', '');
          const existTag = await this.productTagsRepository.findOne({
            where: { name: tagName },
          });
          if (existTag) {
            resolve(existTag);
          } else {
            const newTag = await this.productTagsRepository.save({
              name: tagName,
            });
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

    const result = await this.productRepository.save(newProduct);
    return result;
  }

  async delete(id: number): Promise<boolean> {
    const query = this.productRepository.createQueryBuilder();
    const result = await query.softDelete().where(`id = ${id}`).execute();
    return result.affected ? true : false;
  }

  async findAll(): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder();
    return await query.orderBy('id', 'DESC').getMany();
  }

  async findOne(id: number): Promise<Product> {
    const query = this.productRepository.createQueryBuilder();
    return await query.where(`id = ${id}`).getOne();
  }
}
