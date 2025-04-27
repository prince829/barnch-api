var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BranchUtils from "../utils/Branch.util.js";
export default class BranchController {
    constructor() {
        this.branchUtil = new BranchUtils();
    }
    /**
     * //@Method:saveBranch
     * //@Description:To Save the branch
     */
    saveBranch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saveInfo = yield this.branchUtil.create(req.body);
                if (!saveInfo)
                    return { code: 400, message: "Something went wrong", success: false, data: {} };
                return { code: 201, message: "Branch created successfully", success: true, data: saveInfo };
            }
            catch (err) {
                return { success: false, code: 500, message: err.message };
            }
        });
    }
    /**
     * //@Method:branchList
     * //@Decsription: To fetch branch list
     */
    branchList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list = yield this.branchUtil.getBranchList(req.body);
                return { code: 200, message: "Branch list fetched successfully", success: true, data: list };
            }
            catch (err) {
                return { code: 500, message: err.message, success: false };
            }
        });
    }
}
