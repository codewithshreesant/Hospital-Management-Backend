
import express,{Router} from 'express' 
import { createAppointment, deleteAppointment, getAppointmentById, getAppointments, updateAppointment } from '../controllers/appointment.controller.js';

const router = Router();

router.post('/create-appointment', createAppointment);
router.get('/appointments', getAppointments);
router.get('/appointment/:id', getAppointmentById);
router.put('/appointment/:id', updateAppointment);
router.delete('/appointment/:id', deleteAppointment);

export default router;