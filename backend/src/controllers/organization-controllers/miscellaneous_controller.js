import * as dbManager from '../../services/organization-management/miscellaneous.js';

export const createRole = async (req, res) => {
    const userInfo = {
        name: req.body.name,
    }
    try {
        const user = await dbManager.createRole(userInfo);
        res.json({
            message: `${userInfo.name} fue creado con éxito`,
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


export const createRoleBranch = async (req, res) => {
    const userInfo = {
        branch: req.body.branch,
        role: req.body.role,
        salary: req.body.salary
    }
    try {
        const user = await dbManager.createRoleBranch(userInfo);
        res.json({
            message: `asignado con éxito`,
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

export const getNotAssignmentSalaryByBranch = async (req, res) => {
    const userInfo = {
        branch: req.params.branch,
    }
    try {
        const user = await dbManager.getNotAssignmentSalaryByBranch(userInfo);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.json({
            // message: "Ocurrió un error al insertar el empleado",
            message: error.message,
            status:400,
        });
    }
}