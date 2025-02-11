
import express,{Router} from 'express'
import { createContact, deleteContact, getContactById, getContacts, updateContact } from '../controllers/contact.controller.js';

const router = Router();

router.post('/create-contact',createContact );
router.get('/contacts', getContacts);
router.get('/contact/:id', getContactById);
router.put('/contact/:id',updateContact );
router.delete('/contact/:id', deleteContact);

export default router;