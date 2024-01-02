import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Product } from '../../products/models/product.model';

@Table
export class Image extends Model {
  @PrimaryKey
  @Column({
    defaultValue: UUIDV4,
    type: DataType.UUID,
  })
  id: string;

  @Column({ allowNull: false })
  url: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID })
  product_id: string;

  @BelongsTo(() => Product)
  product: Product;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
