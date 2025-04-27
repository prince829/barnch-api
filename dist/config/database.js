var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Sequelize } from "sequelize-typescript";
import path from "path";
import Branch from "../models/branch.model.js";
const seqlizeDB = new Sequelize({
    dialect: "sqlite",
    storage: path.join(process.cwd(), "data", "database.sqlite"),
    logging: false,
    models: [Branch]
});
globalThis.sequelize = seqlizeDB;
export const authenticateDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield seqlizeDB.authenticate();
        yield seqlizeDB.sync({ alter: true }); // This will create tables if they don't exist
        console.log("DB AUthencticated");
    }
    catch (err) {
        throw err;
    }
});
