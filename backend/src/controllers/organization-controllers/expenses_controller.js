import * as dbExpensesManager from '../../services/organization-management/expenses.js';

export const insertPaymentExpense = async (req, res) => {
    const paymentInfo = {
        amount:  req.body.amount,
        type: req.body.type,
        date: req.body.date,
        description: req.body.description
    }
    try {
        const payment = await dbExpensesManager.insertPaymentExpense(paymentInfo);
        res.json({
            message: `${paymentInfo.description} agregado con éxito`,
            status:200,
        });
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message,
            status:400,
        });
    }
}


export const getPaymentExpenseByType = async (req, res) => {
    const paymentInfo = {
        type: req.params.type,
    }
    try {
        const payment = await dbExpensesManager.getPaymentExpenseByType(paymentInfo);
        res.json(payment);
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message,
            status:400,
        });
    }
}