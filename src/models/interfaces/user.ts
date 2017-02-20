import { Document } from "mongoose";
import { IUser } from "../../interfaces/user";

export interface IUserModel extends IUser, Document {
  // custom methods for your model would be defined here
  validPassword?(password: string): boolean;
  setPassword?(password: string): string;
  generateJwt()
}
