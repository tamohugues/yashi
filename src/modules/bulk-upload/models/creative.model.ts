import { Column, Model, Table, DataType, ForeignKey, BelongsTo, Index, HasMany } from 'sequelize-typescript';
import { Order } from './order.model';
import { CreativeData } from './creative-data.model';

@Table({ tableName: 'zz__yashi_creative' })
export class Creative extends Model<Creative> {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER({ length: 11 }).UNSIGNED,
    field: 'creative_id',
  })
  id: number;

  @ForeignKey(() => Order)
  @Index('fk_zz__yashi_creative_order_id_idx')
  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER({ length: 11 }).UNSIGNED,
    field: 'order_id',
  })
  orderId: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER({ length: 11 }),
    field: 'yashi_creative_id',
  })
  yashiCreativeId: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.STRING({ length: 255 }),
    field: 'name',
  })
  name: string;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.STRING({ length: 255 }),
    field: 'preview_url',
  })
  previewUrl: string;

  @BelongsTo(() => Order, 'order_id')
  order: Order;

  @HasMany(() => CreativeData, 'creative_id')
  creativeDatas: CreativeData[];
}
