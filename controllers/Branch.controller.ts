import { Request } from "express";
import { IBranchController, IBranchUtil } from "../interface/BranchInterface.js";
import { IResponse } from "../interface/Handler.js";
import BranchUtils from "../utils/Branch.util.js";

export default class BranchController implements IBranchController{
    private branchUtil: IBranchUtil
    constructor(){
       this.branchUtil= new BranchUtils()
    }
    /**
     * //@Method:saveBranch
     * //@Description:To Save the branch
     */
    async saveBranch(req: Request): Promise<IResponse> {
        try{
            const saveInfo=await this.branchUtil.create(req.body);
            if(!saveInfo) return{code:400,message:"Something went wrong",success:false,data:{}};
            return{code:201,message:"Branch created successfully",success:true,data:saveInfo}
        }catch(err:any){
            return{success:false,code:500,message:err.message}
        }
    }
    /**
     * //@Method:branchList
     * //@Decsription: To fetch branch list
     */
    async branchList(req: Request): Promise<IResponse> {
        try{
          const list=await this.branchUtil.getBranchList(req.body);
          return{code:200,message:"Branch list fetched successfully",success:true,data:list}
        }catch(err:any){
            return{code:500,message:err.message,success:false}
        }
    }

}