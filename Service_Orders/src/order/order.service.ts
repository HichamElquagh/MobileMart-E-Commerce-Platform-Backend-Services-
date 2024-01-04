import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrderService {
  constructor (private readonly databaseservice:DatabaseService){}

  async create(createOrderDto: CreateOrderDto) {
    const { orderId , status} = createOrderDto ;
    
    const userExists = await this.databaseservice.orderitem.findUnique(
      {
      where: { id: orderId },
    }
    );

    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    
    const createdOrderitem = await this.databaseservice.order.create({
      data: createOrderDto,
    });

    return {message :'created',createdOrderitem};
  }

  findAll() {
    return this.databaseservice.order.findMany({
      include : {
        orderitem : {
          include : {
            produit : true, 
            user : true
          }
        }, 
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
