import * as db from '../../database/connection.config.js';

//total de gastos fijos
export async function totalBranchExpensesMonth() {
    const conn = await db.getConnection();
    try {
        const query = `
            SELECT 
                MONTH(date) AS month,
                YEAR(date) AS year,
                SUM(amount) AS total_operating_expenses
            FROM payment
            WHERE type_payment = 'branch_expense'
            GROUP BY YEAR(date), MONTH(date)
        `;
        const total = await conn.query(query);
        return total;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

//total de gastos especiales
export async function totalSpecialsExpensesMonth() {
    const conn = await db.getConnection();
    try {
        const query = `
                    SELECT 
                    MONTH(date) AS month,
                    YEAR(date) AS year,
                    SUM(amount) AS total_special_expenses
                FROM payment
                WHERE type_payment = 'special_expense'
                GROUP BY YEAR(date), MONTH(date);
        `;
        const total = await conn.query(query);
        return total;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

//total de excedentes 
export async function calculateBudgetVsExpenses() {
    const conn = await db.getConnection();
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11

        const query = `
            SELECT SUM(amount) AS total_expenses
            FROM payment
            WHERE YEAR(date) = ${currentYear}
            AND MONTH(date) = ${currentMonth}
            AND type_payment <> 'surplus';
        `;
        const expensesResult = await conn.query(query);
        const totalExpenses = expensesResult[0].total_expenses || 0;

        const budgetQuery = `
            SELECT amount
            FROM budget
            WHERE month_year = '${currentMonth}-${currentYear}';
        `;
        const budgetResult = await conn.query(budgetQuery);
        const budgetAmount = budgetResult[0].amount || 0;

        const difference = budgetAmount - totalExpenses;
        return difference;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

export async function getNewShipmentsThisMonth() {
    const conn = await db.getConnection();
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11

        const query = `
            SELECT COUNT(*) AS new_shipments
            FROM Shipment
            WHERE YEAR(date) = ${currentYear} AND MONTH(date) = ${currentMonth};
        `;
        const result = await conn.query(query);
        return result[0].new_shipments || 0;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

export async function getEarningsThisMonth() {
    const conn = await db.getConnection();
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11

        const query = `
            SELECT SUM(payment) AS earnings
            FROM Shipment
            WHERE YEAR(date) = ${currentYear} AND MONTH(date) = ${currentMonth};
        `;
        const result = await conn.query(query);
        return result[0].earnings || 0;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

export async function getDeliveredShipmentsThisMonth() {
    const conn = await db.getConnection();
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11

        const query = `
            SELECT COUNT(*) AS delivered_shipments
            FROM Shipment
            WHERE YEAR(date) = ${currentYear} AND MONTH(date) = ${currentMonth} AND status = 1;
        `;
        const result = await conn.query(query);
        return result[0].delivered_shipments || 0;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

export async function getTotalExtraHoursThisMonth() {
    const conn = await db.getConnection();
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11

        const query = `
            SELECT SUM(hours) AS total_extra_hours
            FROM Honorarium
            INNER JOIN Payment ON Honorarium.id_payment = Payment.id_payment
            WHERE YEAR(Payment.date) = ${currentYear} AND MONTH(Payment.date) = ${currentMonth};
        `;
        const result = await conn.query(query);
        return result[0].total_extra_hours || 0;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

