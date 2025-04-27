import { Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import { serveFiles, setup } from "swagger-ui-express";
import path, {join} from 'path'
import {readdir, } from 'fs'

export const swaggerConfig=async (app:any)=>{
     const routeFiles:string[]=await routefile(path.join(process.cwd(),'./routes'))
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

app.get('/apidoc-json', (_req:Request, res:Response) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

app.use('/apidoc', serveFiles(swaggerSpec), setup(swaggerSpec));

}
async function routefile(folder_path:string):Promise<string[]>{
   return new Promise((resolve,reject)=>{
        readdir(folder_path,(err,files)=>{
            if(err)  {
                reject(err)
                return;
            };
          let routeFiles=  files.map(ele=>{
              const fullPath= join(folder_path,ele)
              return fullPath
            });
            resolve(routeFiles)
        })
    })
}
