import { Column, Table, DataType, ForeignKey, BelongsTo, Index } from 'sequelize-typescript';
import { BaseData } from './base-data.model';
import { Creative } from './creative.model';

@Table({ tableName: 'zz__yashi_creative_data' })
export class CreativeData extends BaseData<CreativeData> {
  @ForeignKey(() => Creative)
  @Index('fk_zz__yashi_creative_data_creative_id_idx')
  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER.UNSIGNED,
    unique: 'creative_id_UNIQUE',
    field: 'creative_id',
  })
  creativeId: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER,
    unique: 'creative_id_UNIQUE',
    field: 'log_date',
  })
  logDate: number;

  @BelongsTo(() => Creative, 'creative_id')
  creative: Creative;
}
