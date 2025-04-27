var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import BranchController from "../controllers/Branch.controller.js";
const router = Router();
const branchController = new BranchController();
/**
 * @swagger
 * /create:
 *   post:
 *     summary: To create any branch
 *     tags:
 *       - Branch
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: body
 *           in: body
 *           description: To create any branch
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *                 - branch_code
 *                 - branch_name
 *                 - branch_city
 *                 - barnch_state
 *                 - latitude
 *                 - longitude
 *             properties:
 *                 branch_code:
 *                      type: string
 *                      required: true
 *                 branch_name:
 *                      type: string
 *                      required: true
 *                 branch_city:
 *                      type: string
 *                      required: true
 *                 barnch_state:
 *                      type: string
 *                      required: true
 *                 latitude:
 *                      type: number
 *                      required: true
 *                 longitude:
 *                      type: number
 *                      required: true
 *
 *     responses:
 *       201:
 *         description: Branch created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield branchController.saveBranch(req);
        res.status(success.code).send(success);
    }
    catch (error) {
        res.status(error.code).send(error);
    }
}));
/**
 * @swagger
 * /list:
 *   put:
 *     summary: To fetch branch
 *     tags:
 *       - Branch
 *     produces:
 *       - application/json
 *     parameters:
 *         - name: body
 *           in: body
 *           description: To fetch any branch
 *           required: true
 *           schema:
 *             type: object
 *             required:
 *                 - page
 *                 - limit
 *                 - searchBy
 *                 - searchValue
 *             properties:
 *                 page:
 *                      type: number
 *                      required: true
 *                 limit:
 *                      type: number
 *                      required: true
 *                 searchBy:
 *                      type: string
 *                      enum: ['branch_code','branch_name','branch_city','barnch_state']
 *                 searchValue:
 *                      type: string
 *                 sortBy:
 *                      type: string
 *                      enum: ['branch_code','branch_name','branch_city','barnch_state']
 *                 sortOrder:
 *                      type: string
 *                      enum: ['ASC', 'DESC']
 *     responses:
 *       201:
 *         description: Branch created successfully
 *       500:
 *         description: Internal Server Error
 */
router.put('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield branchController.branchList(req);
        res.status(success.code).send(success);
    }
    catch (error) {
        res.status(error.code).send(error);
    }
}));
export default router;
