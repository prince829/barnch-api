import { Router } from "express";
import BranchController from "../controllers/Branch.controller.js";
const router= Router();
const branchController=new BranchController();


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

router.post('/create', async (req, res) => {
    try {
        const success = await branchController.saveBranch(req)
        res.status(success.code).send(success);
    }
    catch (error: any) {
        res.status(error.code).send(error);
    }
});
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
router.put('/list', async (req, res) => {
    try {
        const success = await branchController.branchList(req)
        res.status(success.code).send(success);
    }
    catch (error: any) {
        res.status(error.code).send(error);
    }
});
export default router;