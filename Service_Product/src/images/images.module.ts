import { Module } from '@nestjs/common';
import { ImagesService } from './services/images.service';
import { ImagesController } from './controllers/images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Image } from './models/image.model';

@Module({
  imports: [SequelizeModule.forFeature([Image])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
