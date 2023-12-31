import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = await this.categoryModel.create({
      ...createCategoryDto,
    });
    return createdCategory;
  }

  async findAll() {
    return await this.categoryModel.findAll();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const [numberOfAffectedRows, [updatedCategory]] =
      await this.categoryModel.update(
        { ...updateCategoryDto },
        { where: { id }, returning: true },
      );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return { numberOfAffectedRows, updatedCategory };
  }

  async remove(id: string) {
    const category = await this.categoryModel.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    const deletedCategory = await this.categoryModel.destroy({ where: { id } });
    return { message: 'Category deleted', deletedCategory };
  }
}
