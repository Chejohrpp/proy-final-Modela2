import * as dbEmployeeManager from '../../services/organization-management/employee.js';

export const getAllRoles = async (req, res) => {
    try {
        const  rolesList = await dbEmployeeManager.getAllRoles();
        res.json( rolesList);
    } catch (error) {
        console.error(error);
        res.json({
            // message: "Ocurrió un error al extraer los roles",
            message: error.message
        });
    }
}

export const getAllBranch = async (req, res) => {
    try {
        const  branchList = await dbEmployeeManager.getAllBranch();
        res.json( branchList);
    } catch (error) {
        console.error(error);
        res.json({
            // message: "Ocurrió un error al extraer las sucursales",
            message: error.message
        });
    }
}

export const createEmployee = async (req, res) => {
    const userInfo = {
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role_assignment: req.body.role_assignment,
        hours: req.body.hours,
        branch: req.body.branch, 
        payment_salary: req.body.payment_salary
    }

    try {
        const user = await dbEmployeeManager.createEmployee(userInfo);
        res.json({
            message: `${userInfo.email} fue creado con éxito`,
            status:200,
        });
    } catch (error) {
        console.error(error);
        res.json({
            // message: "Ocurrió un error al insertar el empleado",
            message: error.message,
            status:400,
        });
    }
}

export const getRoleAssignment = async (req, res) => {
    const assignmentInfo = {
        branch: req.params.branch,
        role: req.params.role,
    }
    try {
        const assignment = await dbEmployeeManager.getRoleAssignment(assignmentInfo);
        res.json(assignment);
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message,
            status:400,
        });
    }
}

export const getRolesSalaryByBranch = async (req, res) => {
    const assignmentInfo = {
        branch: req.params.branch,
    }
    try {
        const assignment = await dbEmployeeManager.getRolesSalaryByBranch(assignmentInfo);
        res.json(assignment);
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message,
            status:400,
        });
    }
}