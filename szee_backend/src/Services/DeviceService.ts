import { Op } from "sequelize";
import { Body, Inject, Get, Route, Tags, Post } from "tsoa";
import { defaultDeviceLive, defaultDeviceLiveWithSettings } from "../Consts/deviceConsts";
import { getDeviceParams, getDeviceStatus, getDisplaySettings, getRules, getSettingsCharArray, getDevicesParams, getModeCharArray } from "../Helpers/deviceHelper";
import Device, { DeviceDTO, DeviceLiveDTO, DeviceLiveWithSettingsDTO, IDeviceMode, IDeviceSettings, Status } from "../Models/Device";
import { TimeChartDTO, HistoryDTO } from "../Models/Telemetry";
import Telemetry from "../Models/Telemetry";
import axios from "../Utils/axios";

@Tags('Device')
@Route('device')
export default class DeviceService {

  @Get()
  public async getDevices(@Inject() userId: number): Promise<DeviceLiveDTO[]> {

    const devices: DeviceDTO[] = await Device
      .findAll({ where: { userId: {[Op.eq]: userId}} })
      .then(result => result.map(e => e.getDeviceDTO()));

    const devicesWithTelemetry: DeviceLiveDTO[] = await Promise.all(
      devices.map(device => axios
        .post(device.id + '/methods?' + process.env.API_VERSION, { methodName: "getStatus", responseTimeoutInSeconds: 5, payload: "" })
        .then((res: { data: any; }) => { 
          if(res.data.status === 200) {
            return { ...device, ...getDevicesParams(res.data)}
          } else {
            return { 
            ...defaultDeviceLive,
            ...device,
            status: getDeviceStatus(res.data.status, 0)
            }
          }
        })
        .catch((err: any) => { 
          return { 
            ...defaultDeviceLive,
            ...device,
            status: getDeviceStatus(400, 0)
          }
        })
    ));
    return devicesWithTelemetry;
  }

  @Get('/:id')
  public async getDevice(@Inject() device: Device): Promise<DeviceLiveWithSettingsDTO> {

    const resultDevice = device.getDeviceDTO();

    const devicesWithTelemetry: DeviceLiveWithSettingsDTO = await axios
      .post(device.id + '/methods?' + process.env.API_VERSION, { methodName: "getStatus", responseTimeoutInSeconds: 5, payload: "" })
      .then((res: { data: any; }) => { 
        if(res.data.status === 200) {
          return { ...resultDevice, ...getDeviceParams(res.data)}
        } else {
          return { 
          ...defaultDeviceLiveWithSettings,
          ...resultDevice,
          status: getDeviceStatus(res.data.status, 0)
          }
        }
      })
      .catch((err: any) => { 
        return { 
          ...defaultDeviceLiveWithSettings,
          ...resultDevice,
          status: getDeviceStatus(400, 0)
        }
      })
    return devicesWithTelemetry;
  }

  @Post('/:id/settings')
  public async setSettings(@Body() settings: IDeviceSettings, @Inject() device: Device): Promise<DeviceLiveWithSettingsDTO> {

    let resultDevice: DeviceDTO;
    if(settings.name === device.name) {
      resultDevice = device.getDeviceDTO()
    } else {
      await Device.update({ name: settings.name }, { where: { id: device.id }});
      resultDevice = (await Device.findByPk(device.id)).getDeviceDTO();
    }

    const devicesWithTelemetry: DeviceLiveWithSettingsDTO = await axios
      .post(device.id + '/methods?' + process.env.API_VERSION, 
        { methodName: "setSettings", 
          responseTimeoutInSeconds: 5, 
          payload: getSettingsCharArray(settings)
        }
      )
      .then((res: { data: any; }) => { 
        if(res.data.status === 200) {
          return { ...resultDevice, ...getDeviceParams(res.data)}
        } else {
          return { 
          ...defaultDeviceLiveWithSettings,
          status: getDeviceStatus(res.data.status, 0)
          }
        }
      })
      .catch((err: any) => { 
        return { 
          ...defaultDeviceLiveWithSettings,
          status: getDeviceStatus(400, 0)
        }
      })
    return devicesWithTelemetry;
  }

  @Post('/:id/mode')
  public async setMode(@Body() data: IDeviceMode, @Inject() device: Device): Promise<DeviceLiveWithSettingsDTO> {

    const devicesWithTelemetry: DeviceLiveWithSettingsDTO = await axios
      .post(device.id + '/methods?' + process.env.API_VERSION, 
        { methodName: "setMode", 
          responseTimeoutInSeconds: 5, 
          payload: getModeCharArray(data.mode, data.rules)
        }
      )
      .then((res: { data: any; }) => { 
        if(res.data.status === 200) {
          return { ...device.getDeviceDTO(), ...getDeviceParams(res.data)}
        } else {
          return { 
          ...defaultDeviceLiveWithSettings,
          status: getDeviceStatus(res.data.status, 0)
          }
        }
      })
      .catch((err: any) => { 
        return { 
          ...defaultDeviceLiveWithSettings,
          status: getDeviceStatus(400, 0)
        }
      })
    return devicesWithTelemetry;
  }
}