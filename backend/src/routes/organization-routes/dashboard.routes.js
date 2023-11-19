import { Router } from 'express';
import * as dashboardController from '../../controllers/organization-controllers/dashboard_controller.js'

const router = Router();

router.get('/totalBranchExpensesMonth', dashboardController.totalBranchExpensesMonth);
router.get('/totalSpecialsExpensesMonth', dashboardController.totalSpecialsExpensesMonth);

export { router as dashboardRoutes}