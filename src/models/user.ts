import { IUserModel } from "./interfaces/user";
import { userSchema } from "../schemas/user";
import { Model } from "mongoose";
import DataAccess = require("../config/database");

let User: Model<IUserModel> = DataAccess.mongooseConnection.model<IUserModel>("User", userSchema);
export = User;
