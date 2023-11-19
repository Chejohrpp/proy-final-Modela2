import { Router } from 'express';
import * as honorarioController from '../../controllers/organization-controllers/honorarium_controller.js'

const router = Router();

router.get('/getTableHonorarium', honorarioController.getTableHonorarium);

router.post('/inserthonorarium', honorarioController.insertHonorarium);

export { router as honorarioRoutes}