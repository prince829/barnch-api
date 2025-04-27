import { Sequelize } from "sequelize-typescript";
import path from "path";
import Branch from "../models/branch.model.js";

const seqlizeDB = new Sequelize({
  dialect: "sqlite",
  storage: path.join(process.cwd(), "data", "database.sqlite"),
  logging: false,
  models:[Branch]
});
globalThis.sequelize = seqlizeDB;
export const authenticateDb=async()=>{
    try{
      await  seqlizeDB.authenticate();
      await seqlizeDB.sync({alter: true})  // This will create tables if they don't exist
      console.log("DB AUthencticated");
      
    }catch(err){
        throw err;
    }
}
