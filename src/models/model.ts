import { Model } from "mongoose";
import DataAccess = require("../config/database");
import { IUserModel } from "./user";

export interface IModel {
  user: Model<IUserModel>;
}



const User: Model<IUserModel> = DataAccess.mongooseConnection.model<IUserModel>("User", userSchema);
