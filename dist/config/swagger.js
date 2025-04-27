var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import swaggerJSDoc from "swagger-jsdoc";
import { serveFiles, setup } from "swagger-ui-express";
import path, { join } from 'path';
import { readdir, } from 'fs';
export const swaggerConfig = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const routeFiles = yield routefile(path.join(process.cwd(), './routes'));
    const optionsAdmin = {
        swaggerDefinition: {
            info: {
                title: "Branch Code Swagger",
                version: '1.0.0',
                description: "Branch Code" + ' Frontend API Doc',
                contact: {
                    email: '',
                },
            },
            schemes: ['http'],
            host: `localhost:3000`,
            basePath: '/branch',
            securityDefinitions: {
                Token: {
                    type: 'apiKey',
                    description: 'JWT authorization of an API',
                    name: 'token',
                    in: 'header',
                },
            },
        },
        apis: routeFiles,
    };
    const swaggerSpec = swaggerJSDoc(optionsAdmin);
    app.get('/apidoc-json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    app.use('/apidoc', serveFiles(swaggerSpec), setup(swaggerSpec));
});
function routefile(folder_path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            readdir(folder_path, (err, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                ;
                let routeFiles = files.map(ele => {
                    const fullPath = join(folder_path, ele);
                    return fullPath;
                });
                resolve(routeFiles);
            });
        });
    });
}
