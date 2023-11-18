import { Router } from 'express';
import * as employeeController from '../../controllers/organization-controllers/employee_controller.js';

const router = Router();

router.get('/getall', employeeController.getAllRoles);


export { router as employeeRoutes}