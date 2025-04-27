import { CreationAttributes } from "sequelize";
import Branch from "../models/branch.model.js";
import { Request } from "express";
import { IResponse } from "./Handler.js";

export interface IBranchUtil{
    create(data:CreationAttributes<Branch>):Promise<Branch>;
    getBranchList(body:any):Promise<{data:Array<Branch>, total_count: number, total_pages: number}>
}
export interface IBranchController{
    saveBranch(req: Request):Promise<IResponse>
    branchList(req: Request):Promise<IResponse>
}