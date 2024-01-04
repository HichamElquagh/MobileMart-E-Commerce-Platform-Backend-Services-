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
      include : {
        orderitem : {
          include : {
            produit : true, 
            user : true
          }
        }, 
      }
    });

    return {message :'created',createdOrderitem};
  }

  async findAll() {
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

  async findOne(id: number) {
    return this.databaseservice.order.findUnique({
      where:{
        id,
      },
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

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = await this.databaseservice.order.update({
      where: { 
        id,
       },
      data:updateOrderDto,
      include : {
        orderitem : {
          include : {
            produit : true, 
            user : true
          }
        }, 
      }
    });

    return { message: 'updated', updatedOrder };
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
