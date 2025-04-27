var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DataType, Model, Table } from "sequelize-typescript";
let Branch = class Branch extends Model {
};
__decorate([
    Column({ type: DataType.STRING, allowNull: false })
], Branch.prototype, "branch_code", void 0);
__decorate([
    Column({ type: DataType.STRING, allowNull: false })
], Branch.prototype, "branch_name", void 0);
__decorate([
    Column({ type: DataType.STRING, allowNull: false })
], Branch.prototype, "branch_city", void 0);
__decorate([
    Column({ type: DataType.STRING, allowNull: false })
], Branch.prototype, "barnch_state", void 0);
__decorate([
    Column({ type: DataType.FLOAT, allowNull: true })
], Branch.prototype, "latitude", void 0);
__decorate([
    Column({ type: DataType.FLOAT, allowNull: false })
], Branch.prototype, "longitude", void 0);
Branch = __decorate([
    Table({
        tableName: 'branches',
        timestamps: true
    })
], Branch);
export default Branch;
