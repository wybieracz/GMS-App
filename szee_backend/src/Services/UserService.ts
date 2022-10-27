import { Route, Get, Path, Tags } from "tsoa";

@Tags("User")
@Route("user")
export default class UserService {

  @Get("{userId}")
  public getUsername(@Path() userId: string): Promise<{userId: string, username: string}> {
    return Promise.resolve({
      userId: userId,
      username: 'username'
    });
  }
}