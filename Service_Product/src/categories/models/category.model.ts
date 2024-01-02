import { UUIDV4 } from 'sequelize';
import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Product } from '../../products/models/product.model';
import { ProductCategory } from '../../products/models/productCategory.model';

@Table
export class Category extends Model {
  @PrimaryKey
  @Column({
    defaultValue: UUIDV4,
    type: DataType.UUID,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @BelongsToMany(() => Product, () => ProductCategory)
  products: Product[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
