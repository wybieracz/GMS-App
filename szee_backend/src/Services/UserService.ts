import { Route, Get, Path, Tags, Example, OperationId, Inject } from "tsoa";
import User, { IUser, UserDTO } from "../Models/User";
import { Op } from "sequelize";

@Tags("User")
@Route("user")
export default class UserService {

  @Get()
  public async getUser(@Inject() userId: number): Promise<UserDTO> {
    const user = await User.findOne({
      where: { id: {[Op.eq]: userId}}
    })
    return user.getUserDTO();
  }
}