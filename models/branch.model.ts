import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName:'branches',
    timestamps: true
})
export default class Branch extends Model<InferAttributes<Branch>, InferCreationAttributes<Branch>>{
  @Column({type:DataType.STRING, allowNull:false})
  declare branch_code: string;
  @Column({type:DataType.STRING,allowNull:false})
  declare branch_name:string;
  @Column({type:DataType.STRING, allowNull:false})
  declare branch_city:string;
  @Column({type:DataType.STRING,allowNull:false})
  declare barnch_state: string;
  @Column({type:DataType.FLOAT,allowNull:true})
  declare latitude: number | null;
  @Column({type:DataType.FLOAT,allowNull:false})
  declare longitude: number| null;
}