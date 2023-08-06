import { col, fn, Op } from "sequelize";
import { Get, Inject, Route, Tags } from "tsoa";
import Device from "../Models/Device";
import Telemetry, { ChartDTO, HistoryDTO, MultipleChartDTO, TimeChartDTO } from "../Models/Telemetry";

@Tags('Telemetry')
@Route('telemetry')
export default class TelemetryService {

  @Get('/device/:id/:year/:month/:day')
  public async getDeviceTelemetryPerDay(@Inject() device: Device, @Inject() year: number, @Inject() month: number, @Inject() day: number): Promise<HistoryDTO> {

    const voltageData: Array<TimeChartDTO> = [];
    const currentData: Array<TimeChartDTO> = [];
    const powerData: Array<TimeChartDTO> = [];
    const kWhData: Array<TimeChartDTO> = [];

    const telemetry = await Telemetry.findAll({
      where: { 
        deviceId: device.id,
        timestamp: { [Op.gte]: new Date(year, month, day), [Op.lt]: new Date(year, month, day + 1, 0) }
      }
    })

    telemetry.map(e => {
      voltageData.push({ group: "Voltage", timestamp: e.timestamp, value: e.voltage });
      currentData.push({ group: "Current", timestamp: e.timestamp, value: e.current });
      powerData.push({ group: "Power", timestamp: e.timestamp, value: e.power });
      kWhData.push({ group: "Power consumption", timestamp: e.timestamp, value: e.kWh });
    })

    return { voltage: voltageData, current: currentData, power: powerData, kWh: kWhData }
  }

  @Get('/device/:id')
  public async getDeviceTelemetry(@Inject() device: Device): Promise<HistoryDTO> {

    const voltageData: Array<TimeChartDTO> = [];
    const currentData: Array<TimeChartDTO> = [];
    const powerData: Array<TimeChartDTO> = [];
    const kWhData: Array<TimeChartDTO> = [];

    const telemetry = await Telemetry.findAll({
      where: { deviceId: device.id }
    })

    telemetry.map(e => {
      voltageData.push({ group: "Voltage", timestamp: e.timestamp, value: e.voltage });
      currentData.push({ group: "Current", timestamp: e.timestamp, value: e.current });
      powerData.push({ group: "Power", timestamp: e.timestamp, value: e.power });
      kWhData.push({ group: "Power consumption", timestamp: e.timestamp, value: e.kWh });
    })

    return { voltage: voltageData, current: currentData, power: powerData, kWh: kWhData }
  }

  @Get('/kwh')
  public async getLatestKWh(@Inject() userId: number): Promise<Array<ChartDTO>> {

    const devices = await Device.findAll({
      where: { userId: userId }
    });

    const latest = await Promise.all(devices.map(e => 
      Telemetry.findOne({
        where: { deviceId: e.id },
        attributes: ['deviceId', [fn('MAX', col('timestamp')), 'timestamp']],
        group: ['deviceId'],
      })  
    ))

    const result = await Promise.all(devices.map((e, i) => 
      Telemetry.findOne({
        where: {
          deviceId: e.id,
          timestamp: latest[i] ? latest[i].timestamp : null
        }
      })
    ))

    return result.map((e, i) => {
      return {
        group: devices[i].name ? devices[i].name : devices[i].id,
        value: e ? e.kWh : 0
      }
    })
  }

  @Get('/history')
  public async getTelemetry(@Inject() userId: number, @Inject() year: number, @Inject() month: number): Promise<Array<MultipleChartDTO>> {

    const devices = await Device.findAll({
      where: { userId: userId }
    });

    const devicesIds = devices.map(e => e.id);

    const result = await Telemetry.findAll({
      where: { 
        deviceId: { [Op.in]: devicesIds },
        timestamp: { [Op.gte]: new Date(year, month, 0, 23, 60), [Op.lt]: new Date(year, month + 1, 1) }
      }
    });

    return result.map(e => {
      const device = devices.find(device => device.id === e.deviceId);
      return {
        group: device.name ? device.name : device.id,
        power: e.power,
        kWh: e.kWh,
        timestamp: e.timestamp
      }
    })
  }

  @Get('/week')
  public async getWeekTelemetry(@Inject() userId: number): Promise<Array<MultipleChartDTO>> {

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7); 

    const devices = await Device.findAll({
      where: { userId: userId }
    });

    const devicesIds = devices.map(e => e.id);

    const result = await Telemetry.findAll({
      where: { 
        deviceId: { [Op.in]: devicesIds },
        timestamp: { [Op.gte]: sevenDaysAgo, [Op.lte]: now }
      }
    });

    return result.map(e => {
      const device = devices.find(device => device.id === e.deviceId);
      return {
        group: device.name ? device.name : device.id,
        power: e.power,
        kWh: e.kWh,
        timestamp: e.timestamp
      }
    })
  }
}