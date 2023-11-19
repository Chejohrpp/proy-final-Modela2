// Función reutilizable para manejar las solicitudes comunes
const handleRequest = async (promise, res) => {
    try {
        const result = await promise;
        res.json(result);
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message,
            status: 400,
        });
    }
};

import * as dbHonorariumManager from '../../services/organization-management/honorarium.js'

export const insertHonorarium = async (req, res) => {
    const honorarioInfo = {
        date: req.body.date,
        amount: req.body.amount,
        employee: req.body.employee,
        hours: req.body.hours,
    }
    const totalExpenses = await dbHonorariumManager.insertHonorarium(honorarioInfo);
    await handleRequest(totalExpenses, res);
};


export const getTableHonorarium = async (req, res) => {
    try {
        const payments = await dbHonorariumManager.getTableHonorarium();
        
        // Convertir los valores de BigInt a String
        const formattedPayments = payments.map(payment => ({
            Posicion: payment.Posicion.toString(), // Convertir a String,
            Nombre: payment.Nombre,
            Apellido: payment.Apellido,
            Email: payment.Email,
            Horas_extras: payment.Horas_extras,
            Ganancias: payment.Ganancias,
        }));
        
        res.json(formattedPayments);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: error.message,
            status: 400,
        });
    }
};
