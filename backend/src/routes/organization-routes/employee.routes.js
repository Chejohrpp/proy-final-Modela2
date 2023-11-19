import { Router } from 'express';
import * as employeeController from '../../controllers/organization-controllers/employee_controller.js';

const router = Router();

router.get('/getallroles', employeeController.getAllRoles);
router.get('/getemployeesSalary', employeeController.getemployeesSalary);
router.get('/getallbranchemployee', employeeController.getAllBranch);
router.get('/getroleassignment/:role/:branch', employeeController.getRoleAssignment);
router.get('/getRolesSalaryByBranch/:branch', employeeController.getRolesSalaryByBranch);

router.post('/createEmployee', employeeController.createEmployee);

export { router as employeeRoutes}