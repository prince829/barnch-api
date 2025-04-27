var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import { authenticateDb } from './config/database.js';
import branchRouter from './routes/branch.route.js';
import { swaggerConfig } from './config/swagger.js';
const app = express();
function instance() {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(cors({
            methods: "GET,POST,PUT",
            allowedHeaders: "content-type,ContentType",
            origin: '*'
        }));
        app.use(bodyParser.urlencoded({
            extended: true,
            limit: '50mb',
            parameterLimit: 50
        }));
        app.use(bodyParser.json({
            limit: '50mb'
        }));
        app.use('/branch', branchRouter);
        swaggerConfig(app);
    });
}
const onError = (error) => {
    if (error.code == "EADDRINUSE") {
        console.log("Address is in use");
        process.exit(0);
    }
    else {
        console.error(error);
        process.exit(1);
    }
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        instance().then(() => __awaiter(void 0, void 0, void 0, function* () {
            // Database connection//
            yield authenticateDb();
            console.log('All models were synchronized successfully.');
            app.listen(3000);
            app.on('error', onError);
            console.log("Server is Started on 3000");
        }));
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}))();
