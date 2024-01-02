import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    it('should call productsService.create with the correct arguments', () => {
      const createProductDto: CreateProductDto = {
        name: 'Product Name',
        price: 100,
        brand_id: '68c9b42f-3aae-4c48-a56d-7ac41d4bf405',
      };
      const createSpy = jest.spyOn(service, 'create');

      controller.create(createProductDto);

      expect(createSpy).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should call productsService.findAll with the correct arguments', () => {
      const query = {
        name: 'Product Name',
        category: 'Category Name',
        brand: 'Brand Name',
        maxPrice: 100,
        minPrice: 50,
      };
      const findAllSpy = jest.spyOn(service, 'findAll');

      controller.findAll(
        query.name,
        query.category,
        query.brand,
        query.maxPrice,
        query.minPrice,
      );

      expect(findAllSpy).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should call productsService.findOne with the correct argument', () => {
      const id = '123';
      const findOneSpy = jest.spyOn(service, 'findOne');

      controller.findOne(id);

      expect(findOneSpy).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call productsService.update with the correct arguments', () => {
      const id = '123';
      const updateProductDto: UpdateProductDto = {
        name: 'Product Name',
        price: 100,
      };
      const updateSpy = jest.spyOn(service, 'update');

      controller.update(id, updateProductDto);

      expect(updateSpy).toHaveBeenCalledWith(id, updateProductDto);
    });
  });

  describe('remove', () => {
    it('should call productsService.remove with the correct argument', () => {
      const id = '123';
      const removeSpy = jest.spyOn(service, 'remove');

      controller.remove(id);

      expect(removeSpy).toHaveBeenCalledWith(id);
    });
  });
});
