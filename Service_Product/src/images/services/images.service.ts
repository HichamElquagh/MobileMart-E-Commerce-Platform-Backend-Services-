import { Injectable } from '@nestjs/common';
import { CreateImageDto } from '../dto/create-image.dto';
import { UpdateImageDto } from '../dto/update-image.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from '../models/image.model';
import { Product } from 'src/products/models/product.model';

@Injectable()
export class ImagesService {
  constructor(@InjectModel(Image) private imageModel: typeof Image) {}

  async create(createImageDto: CreateImageDto) {
    return await this.imageModel.create({ ...createImageDto });
  }

  async findAll() {
    return await this.imageModel.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'name'],
        },
      ],
      attributes: { exclude: ['product_id'] },
    });
  }

  async findOne(id: string) {
    return await this.imageModel.findOne({
      where: { id },
      include: [
        {
          model: Product,
          attributes: ['id', 'name'],
        },
      ],
      attributes: { exclude: ['product_id'] },
    });
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    const [numberOfAffectedRows, [updatedImage]] = await this.imageModel.update(
      { ...updateImageDto },
      { where: { id }, returning: true },
    );

    return { numberOfAffectedRows, updatedImage };
  }

  async remove(id: string) {
    const deletedImage = await this.findOne(id);
    await this.imageModel.destroy({ where: { id } });
    return deletedImage;
  }
}
