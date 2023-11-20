import * as db from '../../database/connection.config.js';

//crear rol
export async function createRole(role) {
    const conn = await db.getConnection();
    try {
        const user = await conn.query('INSERT INTO role (name) VALUES (?)', [
            role.name
        ]);
        return user
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}

//asignar rol sucursal salario

export async function createRoleBranch(role) {
    const conn = await db.getConnection();
    try {
        const user = await conn.query('INSERT INTO role_assignment (branch,role,salary) VALUES (?,?,?)', [
            role.branch, 
            role.role, 
            role.salary
        ]);
        return user
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}

export async function getNotAssignmentSalaryByBranch(branch) {
    const conn = await db.getConnection();
    try {
        const user = await conn.query(`
        SELECT r.id_role, r.name
        FROM Role r
        LEFT JOIN Role_Assignment ra ON r.id_role = ra.role
        AND ra.branch = ?
        WHERE ra.id_role IS NULL;
        `, [
            branch.branch,
        ]);
        return user;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}