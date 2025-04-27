import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import  { authenticateDb } from './config/database.js';
import branchRouter from './routes/branch.route.js'
import { swaggerConfig } from './config/swagger.js';
const app=express()

async function instance() {
    app.use(cors({
        methods:"GET,POST,PUT",
        allowedHeaders:"content-type,ContentType",
        origin: '*'
    }))
app.use(bodyParser.urlencoded({
    extended:true,
    limit:'50mb',
    parameterLimit:50
}));
app.use(bodyParser.json({
    limit:'50mb'
}))

app.use('/branch',branchRouter)
swaggerConfig(app)
    
}
const onError=(error:any)=>{
    if(error.code=="EADDRINUSE"){
      console.log("Address is in use");
      process.exit(0) 
    }else{
        console.error(error);
        process.exit(1)
    }
}
(async()=>{
  try{
    instance().then(async()=>{
         // Database connection//
         await authenticateDb()
        console.log('All models were synchronized successfully.');
         app.listen(3000);
         app.on('error',onError);
         console.log("Server is Started on 3000");
         
    })
  }catch(err){
    console.error(err)
    process.exit(1)
  }
})();