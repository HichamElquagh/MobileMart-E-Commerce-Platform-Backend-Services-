import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UserService {
  constructor (private readonly databaseservise:DatabaseService){}
  
  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseservise.user.create({
      data:createUserDto
    }) 
  }
  async findAll() {
    return this.databaseservise.user.findMany();
  }

  async findOne(id: number) {
    return this.databaseservise.user.findUnique({
      where: {
        id,
      }
    })
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseservise.user.update({
      where:{
        id,
      },
       data : updateUserDto,
    })
  }

  async remove(id: number) {
    return this.databaseservise.user.delete({
      where: {
        id,
      }
    })
  }
}
