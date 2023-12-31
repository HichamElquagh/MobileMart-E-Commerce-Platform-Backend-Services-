import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../models/product.model';
import { Brand } from 'src/brands/models/brand.model';
import { Category } from 'src/categories/models/category.model';
import { Image } from 'src/images/models/image.model';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  async create(createProductDto: CreateProductDto) {
    const { categories, ...productData } = createProductDto;

    const createdProduct = await this.productModel.create({
      ...productData,
    });

    if (categories && categories.length > 0) {
      createdProduct.$set('categories', categories);
    }

    return createdProduct;
  }

  async findAll() {
    return await this.productModel.findAll({
      include: [
        {
          model: Brand,
          attributes: ['id', 'name'],
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: Image,
          attributes: ['id', 'url'],
        },
      ],
      attributes: { exclude: ['brand_id'] },
    });
  }

  async findOne(id: string) {
    const product = await this.productModel.findOne({
      where: { id },
      include: [
        {
          model: Brand,
          attributes: ['id', 'name'],
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: Image,
          attributes: ['id', 'url'],
        },
      ],
      attributes: { exclude: ['brand_id'] },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { categories, ...productData } = updateProductDto;

    if (
      Object.keys(productData).length === 0 &&
      categories &&
      categories.length > 0
    ) {
      const updatedProduct = await this.findOne(id);
      if (!updatedProduct) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      updatedProduct.$set('categories', categories);
      return { numberOfAffectedRows: 0, updatedProduct };
    }

    const [numberOfAffectedRows, [updatedProduct]] =
      await this.productModel.update(
        { ...productData },
        { where: { id }, returning: true },
      );

    if (categories && categories.length > 0) {
      updatedProduct.$set('categories', categories);
    }

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return { numberOfAffectedRows, updatedProduct };
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const deletedProduct = await this.productModel.destroy({ where: { id } });
    return { message: 'Product deleted', deletedProduct };
  }
}
