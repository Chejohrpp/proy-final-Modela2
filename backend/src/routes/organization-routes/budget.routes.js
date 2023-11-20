import { Router } from 'express';
import * as budgetsController from '../../controllers/organization-controllers/budget_controller.js';

const router = Router();

router.post('/createBudget', budgetsController.createBudget);
router.put('/updateBudgetAmount', budgetsController.updateBudgetAmount);
router.get('/getAllBudgets', budgetsController.getAllBudgets);
router.get('/getBudgetByMonthYear/:month_year', budgetsController.getBudgetByMonthYear);
router.get('/getBudgetsByYear/:year', budgetsController.getBudgetsByYear);
router.get('/getBudgetsBetweenMonths/:start_month_year/:end_month_year', budgetsController.getBudgetsBetweenMonths);

export { router as budgetRoutes };
