import { result } from "lodash";
import { Op } from "sequelize";
import { Body, Delete, Get, Inject, Patch, Path, Post, Route, Tags } from "tsoa";
import Device, { DeviceDTO, IDeviceCredentails } from "../Models/Device";
import Telemetry from "../Models/Telemetry";
import User, { UserDTO } from "../Models/User";
import axios from "../Utils/axios";
import { hash } from "bcrypt";
import { INewCredentials } from "../Models/Auth";

@Tags('User')
@Route('user')
export default class UserService {

  @Get()
  public async getUser(@Inject() userId: number): Promise<UserDTO> {
    const user = await User.findOne({
      where: { id: {[Op.eq]: userId}}
    });
    return user.getUserDTO();
  }

  @Post('/device')
  public async addDevice(@Body() credentials: IDeviceCredentails, @Inject() userId: number): Promise<DeviceDTO> {
    await axios
      .post(credentials.id + '/methods?' + process.env.API_VERSION, 
        { methodName: "setRegistered", 
          responseTimeoutInSeconds: 5, 
          payload: 1
        }
      )
      .then((res: { data: any; }) => { 
        if(res.data.status === 200) {
          Telemetry.destroy({ where: { deviceId: credentials.id }})
          Device.update({ userId: userId }, {
            where: {
              id: credentials.id
            }
          });
        }
      })
    
    const device = await Device.findByPk(credentials.id);
    return device.getDeviceDTO();
  }

  @Delete('/device/:id')
  public async removeDevice(@Path('id') id: string): Promise<boolean> {
    let result: any;
    await axios
      .post(id + '/methods?' + process.env.API_VERSION, 
        { methodName: "setRegistered", 
          responseTimeoutInSeconds: 5, 
          payload: 0
        }
      )
      .then((res: { data: any; }) => { 
        if(res.data.status === 200) {
          Telemetry.destroy({ where: { deviceId: id }})
          result = Device.update({ userId: null }, {
            where: { id: id }
          });
        }
      })
    return result[0] === 1 ? true : false;
  }

  @Patch('/password')
  public async changePassword(@Body() data: INewCredentials, @Inject() userId: number): Promise<boolean> {
    const result = await User.update({ hash: await hash(data.newPassword, parseInt(process.env.HASH_SALT)) }, {
      where: {
        id: userId
      }
    });
    return result[0] === 1 ? true : false;
  }
}