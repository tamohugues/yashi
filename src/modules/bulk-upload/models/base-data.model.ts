import { Column, Model, DataType } from 'sequelize-typescript';

export class BaseData<T> extends Model<T> {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER({ length: 11 }),
    field: 'id',
  })
  id: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER({ length: 11 }),
    field: 'impression_count',
  })
  impressionCount: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER({ length: 11 }),
    field: 'click_count',
  })
  clickCount: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER({ length: 11 }),
    field: '25viewed_count',
  })
  viewedCount25: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER({ length: 11 }),
    field: '50viewed_count',
  })
  viewedCount50: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER({ length: 11 }),
    field: '75viewed_count',
  })
  viewedCount75: number;

  @Column({
    allowNull: true,
    defaultValue: null,
    type: DataType.INTEGER({ length: 11 }),
    field: '100viewed_count',
  })
  viewedCount100: number;
}
