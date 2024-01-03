import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderitemDto } from './dto/create-orderitem.dto';

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

  findAll() {
    return this.databaseservise.orderitem.findMany({
      include : {
        produit : true, 
        user : true
      }
    })
  }

  findOne(id: number) {
    return this.databaseservise.orderitem.findUnique({
      where:{
        id,
      }
    })
  }

  update(id: number, updateOrderitemDto: Prisma.OrderUpdateInput) {
    return `This action updates a #${id} orderitem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderitem`;
  }
}
