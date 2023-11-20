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

export const calculateBudgetVsExpenses = async (req, res) => {
    const budgetVsExpenses = dbDashboardManager.calculateBudgetVsExpenses();
    await handleRequest(budgetVsExpenses, res);
};

export const getNewShipmentsThisMonth = async (req, res) => {
    const newShipments = dbDashboardManager.getNewShipmentsThisMonth();
    await handleRequest(newShipments, res);
};

export const getEarningsThisMonth = async (req, res) => {
    const earnings = dbDashboardManager.getEarningsThisMonth();
    await handleRequest(earnings, res);
};

export const getDeliveredShipmentsThisMonth = async (req, res) => {
    const deliveredShipments = dbDashboardManager.getDeliveredShipmentsThisMonth();
    await handleRequest(deliveredShipments, res);
};

export const getTotalExtraHoursThisMonth = async (req, res) => {
    const totalExtraHours = dbDashboardManager.getTotalExtraHoursThisMonth();
    await handleRequest(totalExtraHours, res);
};