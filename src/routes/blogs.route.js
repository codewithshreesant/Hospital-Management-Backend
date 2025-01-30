
import express,{Router} from 'express'
import { createBlog, deleteBlog, getBlogById, getBlogs, getRecentBlogs, updateBlog } from '../controllers/blogs.controller.js';

const router = Router();

router.post('/create-blog', createBlog);
router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById); 
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);
router.get('/recentblogs', getRecentBlogs);

export default router;
