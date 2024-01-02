import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProduitService {
  constructor (private readonly databaseservise:DatabaseService){}

  create(createProduitDto: Prisma.ProduitCreateInput) {
    return this.databaseservise.produit.create({
      data : createProduitDto 
    })
  }

  findAll() {
    return this.databaseservise.produit.findMany()
  }

  findOne(id: number) {
    return this.databaseservise.produit.findUnique({
      where:{
        id,
      }
    })
  }

  update(id: number, updateProduitDto: Prisma.ProduitUpdateInput) {
    return this.databaseservise.produit.update({
      where : {
        id,
      },
      data : updateProduitDto
    })
  }

  remove(id: number) {
    return this.databaseservise.produit.delete({
      where :{
        id ,
      }
    })
  }
}
