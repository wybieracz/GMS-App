import { Route, Get, Path } from "tsoa";
import { Request, Response } from "express";
import { Controller } from "./MainController";
import UserService from "../Services/UserService";

// interface UserResponse {
//   message: string;
// }

class UserController extends Controller {

  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  // @Get("{userId}")
  // private async getUser(@Path() userId: string): Promise<UserResponse> {
  //   return {
  //     message: `GET requested for id ${userId}`
  //   };
  // }

  private getUser(req: Request, res: Response) {
    
    this.userService.getUsername(req.params.userId)
    .then(result => res.send(result))
    .catch(err => res.status(400))
  }

  protected routes() {
    this.router.get('/:userId', this.getUser.bind(this));
  }
}

export default new UserController().router