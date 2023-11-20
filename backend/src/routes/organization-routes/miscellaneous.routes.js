import { Router } from 'express';
import * as miscellaneousController from '../../controllers/organization-controllers/miscellaneous_controller.js'

const router = Router();

router.get('/getNotAssignmentSalaryByBranch/:branch', miscellaneousController.getNotAssignmentSalaryByBranch);
router.post('/createRole', miscellaneousController.createRole);
router.post('/createRoleBranch', miscellaneousController.createRoleBranch);

export { router as miscellaneousRoutes}