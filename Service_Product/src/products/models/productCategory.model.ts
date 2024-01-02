import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { Category } from '../../categories/models/category.model';
import { DataTypes } from 'sequelize';

@Table
export class ProductCategory extends Model {
  @ForeignKey(() => Product)
  @Column({ type: DataTypes.UUID })
  product_id: string;

  @ForeignKey(() => Category)
  @Column({ type: DataTypes.UUID })
  category_id: string;
}
