import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderitemDto } from './dto/create-orderitem.dto';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';

@Injectable()
export class OrderitemService {
  constructor (private readonly databaseservise:DatabaseService){}

  async create(createOrderitemDto: CreateOrderitemDto) {
    const { userId, produitId } = createOrderitemDto;
    
   
    const userExists = await this.databaseservise.user.findUnique(
      {
      where: { id: userId },
    }
    );

    if (!userExists) {
      throw new NotFoundException('User not found');
    }
    const produitExists = await this.databaseservise.produit.findUnique(
      {
      where: { id: produitId },
    }
    );

    if (!produitExists) {
      throw new NotFoundException('produit not found');
    }
    // Create Orderitem 
    const createdOrderitem = await this.databaseservise.orderitem.create({
      data: createOrderitemDto,
    });

    return {message :'created',createdOrderitem};
  }

  async findAll() {
    return this.databaseservise.orderitem.findMany({
      include : {
        produit : true, 
        user : true
      }
    })
  }

   async findOne(id: number) {
    return this.databaseservise.orderitem.findUnique({
      where:{
        id,
      },
      include : {
        produit : true, 
        user : true
      }
    })
  }

   async findUserOrders(userId: number) {
    const userExists = await this.databaseservise.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return this.databaseservise.orderitem.findMany({
      where: { userId },
      include: {
        produit: true,
        user: true,
      },
    });
  }

  async update(id: number, updateOrderitemDto: UpdateOrderitemDto) {
    const updatedOrderitem = await this.databaseservise.orderitem.update({
      where: { 
        id,
       },
      data:updateOrderitemDto,
      include: {
        produit: true,
        user: true,
      },
    });

    return { message: 'updated', updatedOrderitem };
  }

  async remove(id: number) {
    const deletedOrderitem = await this.databaseservise.orderitem.delete({
      where: { id },
      include: {
        produit: true,
        user: true,
      },
    });

    return { message: 'deleted', deletedOrderitem };
  }
}
