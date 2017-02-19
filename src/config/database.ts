import Mongoose = require("mongoose");
//import mockgoose = require("mockgoose");

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor () {
        DataAccess.connect();
    }

    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;

        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("Connected to mongodb.");
        });

        this.mongooseInstance = Mongoose.connect("mongodb://localhost:27017/heros");
        return this.mongooseInstance;
    }
}

DataAccess.connect();
export = DataAccess;
