// Función reutilizable para manejar las solicitudes comunes
const handleRequest = async (promise, res) => {
    try {
        const result = await promise;
        res.json(result);
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        });
    }
};

import * as dbDashboardManager from '../../services/organization-management/dashboard.js'

export const totalBranchExpensesMonth = async (req, res) => {
    const totalExpenses = dbDashboardManager.totalBranchExpensesMonth();
    await handleRequest(totalExpenses, res);
};

export const totalSpecialsExpensesMonth = async (req, res) => {
    const totalSpecials = dbDashboardManager.totalSpecialsExpensesMonth();
    await handleRequest(totalSpecials, res);
};
