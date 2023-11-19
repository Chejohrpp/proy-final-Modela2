import * as db from '../../database/connection.config.js';

export async function insertPaymentExpense(expense) {
    const conn = await db.getConnection();
    try {
        const payment = await conn.query('INSERT INTO payment (amount, type, date,description) VALUES (?,?,?,?)', [
            expense.amount,
            expense.type,            
            expense.date,
            expense.description           
        ]);        
        return payment
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}

export async function getPaymentExpenseByType(data) {
    const conn = await db.getConnection();
    try {
        const startDate = new Date(); // Fecha actual
        const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
        const lastDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

        const payment = await conn.query(
            'SELECT * FROM payment WHERE type = ? AND date BETWEEN ? AND ?',
            [data.type, firstDayOfMonth, lastDayOfMonth]
        );

        return payment;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release();
    }
}
