import { Router } from 'express';
import * as expensesController from '../../controllers/organization-controllers/expenses_controller.js'

const router = Router();

router.get('/getPaymentExpenseByTypeCurrentMoth/:type', expensesController.getPaymentExpenseByType)

router.post('/insertExpense', expensesController.insertPaymentExpense);

export { router as expenseRoutes}