
import express,{Router} from 'express';

import * as servicesController from '../controllers/services.controller.js';

const router = Router();

router.post('/create-service', servicesController.createService);
router.get('/services', servicesController.getServices);
router.get('/services/:id', servicesController.getServiceById);
router.put('/services/:id', servicesController.updateService);
router.delete('/services/:id', servicesController.deleteService);

export default router;

