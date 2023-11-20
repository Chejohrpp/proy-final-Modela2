import * as dbBudgetManager from '../../services/organization-management/budget.js';

export const createBudget = async (req, res) => {
    const budgetInfo = {
        month_year: req.body.month_year,
        amount: req.body.amount,
    };
    try {
        await dbBudgetManager.createBudget(budgetInfo);
        res.status(200).json({
            message: `El presupuesto ${budgetInfo.month_year} fue creado con éxito`,
            status: 200,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message,
            status: 400,
        });
    }
};

export const updateBudgetAmount = async (req, res) => {
    const { month_year, newAmount } = req.body;
    try {
        await dbBudgetManager.updateBudgetAmount(month_year, newAmount);
        res.status(200).json({
            message: `El presupuesto ${month_year} fue actualizado con éxito`,
            status: 200,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message,
            status: 400,
        });
    }
};

export const getAllBudgets = async (req, res) => {
    try {
        const budgets = await dbBudgetManager.getAllBudgets();
        res.status(200).json(budgets);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message,
            status: 400,
        });
    }
};

export const getBudgetByMonthYear = async (req, res) => {
    const { month_year } = req.params;
    try {
        const budget = await dbBudgetManager.getBudgetByMonthYear(month_year);
        res.status(200).json(budget);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message,
            status: 400,
        });
    }
};

export const getBudgetsByYear = async (req, res) => {
    const { year } = req.params;
    try {
        const budgets = await dbBudgetManager.getBudgetsByYear(year);
        res.status(200).json(budgets);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message,
            status: 400,
        });
    }
};

export const getBudgetsBetweenMonths = async (req, res) => {
    const { start_month_year, end_month_year } = req.params;
    try {
        const budgets = await dbBudgetManager.getBudgetsBetweenMonths(start_month_year, end_month_year);
        res.status(200).json(budgets);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message,
            status: 400,
        });
    }
};
