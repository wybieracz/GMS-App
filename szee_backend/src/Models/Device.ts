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

  private getType(type: number) {
    switch(type) {
      case 1: return Type.Programmer
      default: return Type.Other
    }
  }

  public getDeviceDTO(): DeviceDTO {
    return {
      id: this.id,
      userId: this.userId ? this.userId : 0,
      type: this.getType(this.type),
      name: this.name ? this.name : this.id
    }
  }
}

export interface IDeviceCredentails {
  id: string;
  connectionString: string;
}

export interface IDeviceSettings {
  name: string;
  reset: Boolean;
  periodStart: number;
  brightness: number;
  lcdSettings: Array<number>;
}

export interface IDeviceMode {
  mode: number;
  rules: Array<any>;
}

export interface DeviceDTO {
  id: string;
  userId: number;
  type: Type;
  name: string;
}

export interface DeviceLiveDTO {
  id: string;
  userId: number;
  type: Type;
  name: string;
  voltage: number;
  current: number;
  power: number;
  kWh: number;
  timestamp: string;
  status: Status;
}

export interface DeviceLiveWithSettingsDTO {
  id: string;
  userId: number;
  type: Type;
  name: string;
  voltage: number;
  current: number;
  power: number;
  kWh: number;
  timestamp: string;
  status: Status;
  relayState: Boolean;
  mode: number;
  rules: Array<any>;
  reset: Boolean;
  periodStart: number;
  brightness: number;
  lcdSettings: Array<number>;
}

export enum Type {
  Other = 'Other',
  Programmer = 'Programmer'
}

export enum Status {
  Booting = "Booting",
  Online = "Online",
  InUse = 'In Use',
  Offline = 'Offline'
}