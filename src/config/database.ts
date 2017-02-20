import Mongoose = require("mongoose");
// import Mockgoose = require("mockgoose");

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;

    constructor () {
        DataAccess.connect();
    }

    static connect (): Mongoose.Connection {
      console.log(process.env.NODE_ENV);
        // if (process.env.NODE_ENV === "test") {
        //   console.log("Connected to test DB");
        //   return Mockgoose(Mongoose).then((): void => { Mongoose.connect("mongodb://example.com/TestingDB"); });
        // };
        if (this.mongooseInstance) return this.mongooseInstance;

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
