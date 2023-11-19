import * as db from '../../database/connection.config.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function getAllBranch() {
    const conn = await db.getConnection();
    try {
        const rolesList = await conn.query('SELECT id_branch,name from branch');
        return rolesList
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}

export async function getRolesSalaryByBranch(branch) {
    const conn = await db.getConnection();
    try {
        const user = await conn.query('SELECT ra.id_role as id_ra, r.id_role, r.name, ra.salary FROM role_assignment ra JOIN role r ON ra.role = r.id_role WHERE ra.branch = ?', [
            branch.branch,
        ]);
        return user;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

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

export async function createEmployee (employeeinfo) {
    // encrypt password
    const hashedPassword = await hashPassword(employeeinfo.password);
    employeeinfo.password = hashedPassword;

    // valdate account is unique
    const uniqueUser = await isUnique(employeeinfo.email);
    if (!uniqueUser) {
        throw new Error(`${employeeinfo.email} ya se encuentra registrado, prueba otro email`);
    }

    const conn = await db.getConnection();
    try {
        const user = await conn.query('INSERT INTO employee (email, password, first_name, last_name, role_assignment, hours) VALUES (?,?,?,?,?,?)', [
            employeeinfo.email,
            employeeinfo.password,
            employeeinfo.first_name,
            employeeinfo.last_name,
            employeeinfo.role_assignment,
            employeeinfo.hours,
        ]);
        const lastInsertedId = user.insertId;
        //creamos el payment con la fecha actual
        const id_salary = await createEmployeePayment(employeeinfo.payment_salary)
        //lo unimos con el payment_salary
        const payment_salary = {
            id_salary: id_salary,
            employee: lastInsertedId
        }
        createEmployeePaymentSalary(payment_salary)
        return user;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
}

async function isUnique (email) {
    const conn = await db.getConnection();
    try {
        const usersList = await conn.query('SELECT * FROM employee WHERE email = ? ', [ email ]);
        if (usersList.length > 0) {
            return false;
        }
        return true;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

async function createEmployeePayment(amount) {
    const type = 'employee'
    const conn = await db.getConnection();
    try {
        const user = await conn.query('INSERT INTO payment (amount, type_payment, date) VALUES (?,?,CURRENT_TIMESTAMP())', [
            amount,
            type
        ]);        
        const lastInsertedId = user.insertId;
        return lastInsertedId
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}

async function createEmployeePaymentSalary(employee) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1 < 10 ? '0' : ''}${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const conn = await db.getConnection();
    try {
        const user = await conn.query('INSERT INTO payment_salary (id_salary, employee, month_year) VALUES (?,?,?);', [
            employee.id_salary,
            employee.employee,            
            formattedDate
        ]);

    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}

export async function getRoleAssignment (assignmentinfo) {

    const conn = await db.getConnection();
    try {
        const user = await conn.query(' SELECT * FROM role_assignment where branch=? and role=?', [
            assignmentinfo.branch,
            assignmentinfo.role
        ]);
        return user;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function getemployeesSalary () {
    const conn = await db.getConnection();
    try {
        const rolesList = await conn.query(`
        SELECT
            E.id_employee,
            E.first_name,
            E.last_name,
            E.email,
            RA.salary
        FROM
            Employee E
        INNER JOIN
            Role_Assignment RA ON E.role_assignment = RA.id_role;    
        `);
        return rolesList
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.release(); // Reemplaza conn.end() con conn.release()
    }
}