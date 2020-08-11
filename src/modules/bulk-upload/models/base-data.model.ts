import { Column, Model, DataType } from 'sequelize-typescript';

export class BaseData<T> extends Model<T> {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    field: 'id',
  })
  id: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER,
    field: 'impression_count',
  })
  impressionCount: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER,
    field: 'click_count',
  })
  clickCount: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER,
    field: '25viewed_count',
  })
  viewedCount25: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER,
    field: '50viewed_count',
  })
  viewedCount50: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER,
    field: '75viewed_count',
  })
  viewedCount75: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER,
    field: '100viewed_count',
  })
  viewedCount100: number;
}
