import { AllowNull, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "./User";

@Table({ tableName: 'devices', timestamps: false })
export default class Device extends Model<Device> { 

  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.CHAR(6))
  id!: string;

  @AllowNull(false)
  @Column(DataType.CHAR(60))
  hash!: string;

  @AllowNull(true)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @AllowNull(false)
  @Column(DataType.SMALLINT)
  type!: number;

  @AllowNull(true)
  @Column(DataType.TEXT)
  name!: string;

  public getDeviceDTO(): DeviceDTO {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      name: this.name
    }
  }
}

export interface IDevice {
  id: string;
  userId: number;
  type: number;
  name: string;
}

export interface IDeviceCredentails {
  id: string;
  connectionString: string;
}

export interface DeviceDTO {
  id: string;
  userId: number;
  type: number;
  name: string;
}