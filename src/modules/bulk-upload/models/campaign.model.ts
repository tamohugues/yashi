import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Order } from './order.model';
import { CampaignData } from './campaign-data.model';

@Table({ tableName: 'zz__yashi_cgn' })
export class Campaign extends Model<Campaign> {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER({ length: 11 }).UNSIGNED,
    field: 'campaign_id',
  })
  id: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER({ length: 11 }).UNSIGNED,
    field: 'yashi_campaign_id',
  })
  yashiCampaignId: number;

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
    type: DataType.INTEGER({ length: 11 }),
    field: 'yashi_advertiser_id',
  })
  yashiAdvertiserId: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.STRING({ length: 100 }),
    field: 'advertiser_name',
  })
  advertiserName: string;

  @HasMany(() => Order, 'campaign_id')
  orders: Order[];

  @HasMany(() => CampaignData, 'campaign_id')
  campaignDatas: CampaignData[];
}
