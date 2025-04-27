var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { QueryTypes } from "sequelize";
import Branch from "../models/branch.model.js";
export default class BranchUtils {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Branch.create(data);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getBranchList(body) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, limit, searchBy, searchValue, sortBy, sortOrder } = body;
                let query = `SELECT * FROM branches`;
                let countQuery = `SELECT COUNT(*) AS total_count from branches`;
                if (searchBy && searchValue) {
                    query += ` WHERE ${searchBy} LIKE :searchValue`;
                    countQuery += ` WHERE ${searchBy} LIKE :searchValue`;
                }
                if (sortBy && sortOrder) {
                    query += ` ORDER BY ${sortBy} ${sortOrder}`;
                }
                if (page && limit) {
                    query += ` LIMIT :limit OFFSET :offset`;
                }
                const [branchList, countInfo] = yield Promise.all([
                    sequelize.query(query, {
                        replacements: {
                            limit: limit !== null && limit !== void 0 ? limit : 10,
                            offset: (page - 1) * limit,
                            searchValue: `%${searchValue}%`,
                        },
                        type: QueryTypes.SELECT
                    }),
                    sequelize.query(countQuery, {
                        replacements: {
                            searchValue: `%${searchValue}%`,
                        },
                        type: QueryTypes.SELECT
                    })
                ]);
                const totalCount = ((_a = countInfo[0]) === null || _a === void 0 ? void 0 : _a.total_count) || 0;
                const totalPages = Math.ceil(totalCount / limit);
                return { data: branchList, total_count: totalCount, total_pages: totalPages };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
