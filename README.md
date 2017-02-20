# typescript-express-api

A very basic, well commented, typescript, express, mongo app with tests using mocha and chai.

Use this as a simple API

Run:
 - brew update
 - brew install mongodb
 - sudo mkdir /data
 - sudo chown iconnor /data
 - mkdir /data/db
 - mongod # to start the mongo instance

This app uses a database called heros - change this in the config/database.ts file

Run:
 - npm install
 - gulp scripts #to build the dist (remove scripts to continue to watch it)
 - npm start #to start the app
 - npm test #to test the app
