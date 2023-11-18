import * as db from '../../database/connection.config.js';


export async function getAllRoles() {
    const conn = await db.getConnection();
    try {
        const rolesList = await conn.query('SELECT * FROM role');
        return rolesList
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}