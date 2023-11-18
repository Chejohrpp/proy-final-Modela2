import * as dbEmployeeManager from '../../services/organization-management/employee.js';

export const getAllRoles = async (req, res) => {
    try {
        const  rolesList = await dbEmployeeManager.getAllRoles();
        res.json( rolesList);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al extraer los roles",
            message_description: error.message
        });
    }
}