import * as db from '../../database/connection.config.js';

//insert
export async function createBudget(budget) {
    const conn = await db.getConnection();
    try {
        const user = await conn.query('INSERT INTO budget (month_year,amount) VALUES (?,?)', [
            budget.month_year,
            budget.amount,
        ]);
        return user
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}
// update
export async function updateBudgetAmount(month_year, newAmount) {
    const conn = await db.getConnection();
    try {
        const result = await conn.query('UPDATE Budget SET amount = ? WHERE month_year = ?', [
            newAmount,
            month_year,
        ]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}



//get todos los budget
export async function getAllBudgets() {
    const conn = await db.getConnection();
    try {
        const budgets = await conn.query('SELECT * FROM Budget');
        return budgets;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

//get por el mes y year
export async function getBudgetByMonthYear(month_year) {
    const conn = await db.getConnection();
    try {
        const budget = await conn.query('SELECT * FROM Budget WHERE month_year = ?', [month_year]);
        return budget;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

//get por year
export async function getBudgetsByYear(year) {
    const conn = await db.getConnection();
    try {
        const budgets = await conn.query('SELECT * FROM Budget WHERE SUBSTRING(month_year, 4) = ?', [year]);
        return budgets;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}

// get entre moth_year start and moth_year end
export async function getBudgetsBetweenMonths(start_month_year, end_month_year) {
    const conn = await db.getConnection();
    try {
        const budgets = await conn.query('SELECT * FROM Budget WHERE month_year BETWEEN ? AND ?', [
            start_month_year,
            end_month_year,
        ]);
        return budgets;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}
