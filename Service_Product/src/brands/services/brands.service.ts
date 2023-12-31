import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from '../models/brand.model';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    return await this.brandModel.create({ ...createBrandDto });
  }

  async findAll(): Promise<Brand[]> {
    return await this.brandModel.findAll();
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandModel.findOne({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.brandModel.findOne({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    return await brand.update(updateBrandDto);
  }

  async remove(id: number): Promise<string> {
    const brand = await this.brandModel.findOne({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    await brand.destroy();

    return `Brand with id ${id} has been deleted successfully`;
  }
}
