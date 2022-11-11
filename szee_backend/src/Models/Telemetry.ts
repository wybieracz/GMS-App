import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Device from "./Device";

@Table({ tableName: 'telemetry', timestamps: false })
export default class Telemetry extends Model<Telemetry> { 

  @AllowNull(false)
  @ForeignKey(() => Device)
  @Column(DataType.CHAR(6))
  deviceId!: string;

  @BelongsTo(() => Device)
  device!: Device

  @AllowNull(false)
  @Column(DataType.DOUBLE)
  voltage!: number;

  @AllowNull(false)
  @Column(DataType.DOUBLE)
  current!: number;

  @AllowNull(false)
  @Column(DataType.BIGINT)
  timestamp!: number;

  public getTelemetryDTO(): TelemetryDTO {
    return {
      id: this.id,
      deviceId: this.deviceId,
      voltage: this.voltage,
      current: this.current,
      timestamp: this.timestamp
    }
  }
}

export interface TelemetryDTO {
  id: number;
  deviceId: string;
  voltage: number;
  current: number;
  timestamp: number;
}