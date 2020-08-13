import { Column, Table, DataType, ForeignKey, BelongsTo, Index } from 'sequelize-typescript';
import { BaseData } from './base-data.model';
import { Order } from './order.model';

@Table({ tableName: 'zz__yashi_order_data' })
export class OrderData extends BaseData<OrderData> {
  @ForeignKey(() => Order)
  @Index('fk_zz__yashi_order_data_order_id_idx')
  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER({ length: 11 }).UNSIGNED,
    unique: 'order_id',
    field: 'order_id',
  })
  orderId: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER({ length: 11 }),
    unique: 'order_id',
    field: 'log_date',
  })
  logDate: number;

  @BelongsTo(() => Order, 'order_id')
  order: Order;
}
