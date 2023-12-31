import { UUIDV4 } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Product } from 'src/products/models/product.model';

@Table
export class Brand extends Model {
  @PrimaryKey
  @Column({
    defaultValue: UUIDV4,
    type: DataType.UUID,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @HasMany(() => Product)
  products: Product[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
