import * as db from '../../database/connection.config.js';


async function createPayment(payment) {
    const conn = await db.getConnection();
    try {
        const user = await conn.query('INSERT INTO payment (amount, type_payment, date) VALUES (?,?,?)', [
            payment.amount,
            payment.type,
            payment.date
        ]);
        const lastInsertedId = user.insertId;
        return lastInsertedId
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}

export async function insertHonorarium(honorarium) {
    const type = 'employee'
    const id_payment = await createPayment({ type, date: honorarium.date, amount: honorarium.amount })
    const conn = await db.getConnection();
    try {
        const honorario = await conn.query('INSERT INTO honorarium (id_payment, employee, hours) VALUES (?,?,?)', [
            id_payment,
            honorarium.employee,
            honorarium.hours,
        ]);
        console.log(honorario)
        return ({ status: 200 })
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}

export async function getTableHonorarium() {
    const conn = await db.getConnection();
    try {
        const honorario = await conn.query(`
        SELECT
            ROW_NUMBER() OVER(ORDER BY SUM(H.hours) DESC) AS Posicion,
            E.first_name AS Nombre,
            E.last_name AS Apellido,
            E.email AS Email,
            SUM(H.hours) AS Horas_extras,
            SUM(P.amount) AS Ganancias
        FROM
            Employee E
        LEFT JOIN
            Honorarium H ON E.id_employee = H.employee
        LEFT JOIN
            Payment P ON H.id_payment = P.id_payment
        WHERE
            MONTH(P.date) = MONTH(NOW()) -- Filtrar por el mes actual
            AND YEAR(P.date) = YEAR(NOW()) -- Y el año actual
        GROUP BY
            E.id_employee
        ORDER BY
            Horas_extras DESC; -- Ordenar por la mayor cantidad de horas trabajadas
        `);
        return honorario
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}