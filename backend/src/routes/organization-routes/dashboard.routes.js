import { Router } from 'express';
import * as dashboardController from '../../controllers/organization-controllers/dashboard_controller.js'

const router = Router();

router.get('/totalBranchExpensesMonth', dashboardController.totalBranchExpensesMonth);
router.get('/totalSpecialsExpensesMonth', dashboardController.totalSpecialsExpensesMonth);
router.get('/calculateBudgetVsExpenses', dashboardController.calculateBudgetVsExpenses);
router.get('/getNewShipmentsThisMonth', dashboardController.getNewShipmentsThisMonth);
router.get('/getEarningsThisMonth', dashboardController.getEarningsThisMonth);
router.get('/getDeliveredShipmentsThisMonth', dashboardController.getDeliveredShipmentsThisMonth);
router.get('/getTotalExtraHoursThisMonth', dashboardController.getTotalExtraHoursThisMonth);

export { router as dashboardRoutes}