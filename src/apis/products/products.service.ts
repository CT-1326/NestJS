import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/createProduct.dto';
import { UpdateProductInput } from './dto/updateProduct.dto';
// import { Product } from './interface/product.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { productSalesLocation } from './entities/productSalesLocation.entity';
import { productTags } from './entities/productTags.entity';
import { productCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(productSalesLocation)
    private readonly productSalesLocationRepository: Repository<productSalesLocation>,
    @InjectRepository(productTags)
    private readonly productTagsRepository: Repository<productTags>,
    @InjectRepository(productCategory)
    private readonly productCategoryRepository: Repository<productCategory>,
  ) {}

  async create(input: CreateProductInput): Promise<Product> {
    const { productSalesLocation, productCategory, productTags, ...product } =
      input;

    //위치 저장
    const location = await this.productSalesLocationRepository.save({
      ...productSalesLocation,
    });

    //카테고리 저장
    const category = await this.productCategoryRepository.save({
      name: productCategory,
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

    const result = await this.productRepository.save({
      ...product,
      productSalesLocation: location,
      productCategory: category,
      productTags: productTagList,
    });
    return result;
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
