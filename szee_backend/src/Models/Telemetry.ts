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
  @Column(DataType.DOUBLE)
  power!: number;

  @AllowNull(false)
  @Column(DataType.DOUBLE)
  kWh!: number;

  @AllowNull(false)
  @Column("timestamp")
  timestamp!: string;

  public getTelemetryDTO(): TelemetryDTO {
    return {
      id: this.id,
      deviceId: this.deviceId,
      voltage: this.voltage,
      current: this.current,
      power: this.power,
      kWh: this.kWh,
      timestamp: this.timestamp
    }
  }
}

export interface TelemetryDTO {
  id: number;
  deviceId: string;
  voltage: number;
  current: number;
  power: number;
  kWh: number;
  timestamp: string;
}

export interface ChartDTO {
  group: string;
  value: number;
}

export interface TimeChartDTO extends ChartDTO {
  timestamp: string;
}

export interface MultipleChartDTO {
  group: string;
  power: number;
  kWh: number;
}

export interface HistoryDTO {
  voltage: Array<TimeChartDTO>;
  current: Array<TimeChartDTO>;
  power: Array<TimeChartDTO>;
  kWh: Array<TimeChartDTO>;
}