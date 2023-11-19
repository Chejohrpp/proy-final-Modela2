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
            WHERE type = 'branch_expense'
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
                WHERE type = 'special_expense'
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