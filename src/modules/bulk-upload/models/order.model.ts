import { Column, Model, Table, DataType, ForeignKey, HasMany, BelongsTo, Index } from 'sequelize-typescript';
import { Campaign } from './campaign.model';
import { Creative } from './creative.model';
import { OrderData } from './order-data.model';

@Table({ tableName: 'zz__yashi_order' })
export class Order extends Model<Order> {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER.UNSIGNED,
    field: 'order_id',
  })
  id: number;

  @ForeignKey(() => Campaign)
  @Index('fk_zz__yashi_order_campaign_id_idx')
  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER.UNSIGNED,
    field: 'campaign_id',
  })
  campaignId: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER,
    field: 'yashi_order_id',
  })
  yashiOrderId: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.STRING,
    field: 'name',
  })
  name: string;

  @BelongsTo(() => Campaign, 'campaign_id')
  campaign: Campaign;

  @HasMany(() => Creative, 'order_id')
  creatives: Creative[];

  @HasMany(() => OrderData, 'order_id')
  orderDatas: OrderData[];
}
