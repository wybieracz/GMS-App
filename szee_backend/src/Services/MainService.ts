import { hash } from "bcrypt";
import { Body, Post, Route, Tags, Inject  } from "tsoa";
import { ICredentials } from "../Models/Auth";
import User, { IUser, UserDTO } from "../Models/User";
import { sign } from "jsonwebtoken";

@Tags('Main')
@Route('')
export default class MainService {

  @Post('/register')
  public async register(@Body() userData: IUser): Promise<UserDTO> {
    const data = {
      email: userData.email,
      hash: await hash(userData.password, parseInt(process.env.HASH_SALT)),
      name: userData.name,
      surname: userData.surname
    }
    const user = await User.create(data);
    return user.getUserDTO();
  }

  @Post('/login')
  public async login(@Body() credentials: ICredentials, @Inject() userId: number): Promise<string> {
    const token = sign({ id: userId }, process.env.JWT_KEY, { expiresIn: process.env.TOKEN_EXPIRATION });
    return token;
  }

  @Post('/logout')
  public async logout(@Inject() userId: number): Promise<string> {
    const token = sign({ id: userId }, process.env.JWT_KEY, { expiresIn: 0 });
    return token;
  }
}