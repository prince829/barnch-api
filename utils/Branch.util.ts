import { CreationAttributes, QueryTypes } from "sequelize";
import { IBranchUtil } from "../interface/BranchInterface.js";
import Branch from "../models/branch.model.js";

export default class BranchUtils implements IBranchUtil{
    async create(data: CreationAttributes<Branch>): Promise<Branch> {
        try{
           return await Branch.create(data)
        }catch(err){
            throw err;
        }
    }
    async getBranchList(body: any): Promise<{data:Array<Branch>, total_count: number, total_pages: number}> {
        try{
            const {page,limit,searchBy,searchValue,sortBy,sortOrder}=body;
            let query=`SELECT * FROM branches`
            let countQuery= `SELECT COUNT(*) AS total_count from branches`
            if(searchBy && searchValue){
                query+=` WHERE ${searchBy} LIKE :searchValue`
                countQuery+=` WHERE ${searchBy} LIKE :searchValue`
            }
            if(sortBy && sortOrder){
                query+=` ORDER BY ${sortBy} ${sortOrder}`
            }
            if(page && limit){
                query+= ` LIMIT :limit OFFSET :offset`
            }
            const [branchList,countInfo]=await Promise.all([
                sequelize.query(query,{
                replacements:{
                    limit: limit??10,
                    offset: (page-1)*limit,
                    searchValue:`%${searchValue}%`,
                },
                type: QueryTypes.SELECT
            }),
            sequelize.query(countQuery,{
                replacements:{
                    searchValue:`%${searchValue}%`,
                },
                type: QueryTypes.SELECT
            })
            ])
            const totalCount = (countInfo[0] as any)?.total_count || 0
            const totalPages= Math.ceil(totalCount/limit)
            return {data:branchList, total_count:totalCount, total_pages: totalPages} as any
        }catch(err){
            throw err;
        }
    }
}