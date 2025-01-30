
import express,{Router} from 'express';

import * as newsController from '../controllers/news.controller.js';

const router = Router();

router.post('/create-news', newsController.createNews);
router.get('/news', newsController.getNews);
router.get('/news/:id', newsController.getNewsById);
router.put('/news/:id', newsController.updateNews);
router.delete('/news/:id', newsController.deleteNews);

export default router;