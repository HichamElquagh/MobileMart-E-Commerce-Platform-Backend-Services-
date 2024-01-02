import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Brand } from '../../brands/models/brand.model';
import { Category } from '../../categories/models/category.model';
import { ProductCategory } from './productCategory.model';
import { Image } from '../../images/models/image.model';

@Table
export class Product extends Model {
  @PrimaryKey
  @Column({
    defaultValue: UUIDV4,
    type: DataType.UUID,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  price: number;

  @Column({ defaultValue: 0 })
  stock_quantity: number;

  @ForeignKey(() => Brand)
  @Column({ type: DataType.UUID })
  brand_id: string;

  @BelongsTo(() => Brand)
  brand: Brand;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories: Category[];

  @HasMany(() => Image)
  images: Image[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
