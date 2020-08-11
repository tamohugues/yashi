import { Column, Table, DataType, ForeignKey, BelongsTo, Index } from 'sequelize-typescript';
import { BaseData } from './base-data.model';
import { Campaign } from './campaign.model';

@Table({ tableName: 'zz__yashi_cgn_data' })
export class CampaignData extends BaseData<CampaignData> {
  @ForeignKey(() => Campaign)
  @Index('fk_zz__yashi_cgn_data_campaign_id_idx')
  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER.UNSIGNED,
    unique: 'campaign_id_UNIQUE',
    field: 'campaign_id',
  })
  campaignId: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER,
    unique: 'campaign_id_UNIQUE',
    field: 'log_date',
  })
  logDate: number;

  @BelongsTo(() => Campaign, 'campaign_id')
  campaign: Campaign;
}
