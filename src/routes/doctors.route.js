
import express,{Router} from 'express';

import {getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor} from '../controllers/doctors.controller.js';

const router = Router();

router.post('/create-doctor', createDoctor);
router.get('/doctors', getDoctors);
router.get('/doctor/:id', getDoctorById);
router.put('/doctor/:id', updateDoctor);
router.delete('/doctor/:id', deleteDoctor);

export default router;  