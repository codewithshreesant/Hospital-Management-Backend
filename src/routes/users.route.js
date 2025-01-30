
import express,{Router} from 'express';
import {createUser, getUsers, LoginUser, logoutUser} from '../controllers/users.controller.js';
import { Admin } from '../models/Admin.model.js';
import { verifyToken } from '../middlewares/verifyToken.middleware.js';
import { verifyAdmin } from '../middlewares/verifyAdmin.middleware.js';
const router = Router();

router.post('/create-user', createUser);
router.get('/users', getUsers);
router.post('/login', LoginUser);
router.post('/logout', logoutUser);
router.post('/create-admin', async (req,res)=>{
    try {
        const { username, password } = req.body;
        if(
            [username, password].some((field)=>{
                return field==""
            })
        )
        {
            res.status(404).json({ error:"username and password is required ! " })
        }  
        const isExistedUser = await Admin.find({username});
        if(isExistedUser.length > 0)
        {
            res.status(404).json({
                error:"user already exist "
            })
        }
    
        const newAdmin = await new Admin({
            username,
            password
        })
    
        const admin = await newAdmin.save();
    
        res.status(200).json({"message":"admin created successfully ", "data":admin})
    } catch (error) {
        res.status(404).json({ "error":error.message })
    }
})

router.post('/admin', verifyToken, verifyAdmin ,async (req,res)=>{
    const { username, password } = req.body;
    const adminUser = await Admin.findOne({ username });
    if( password === adminUser.password)
    {
        res.status(200).json(
            {
                message : "Admin Login Successfull "
            }
        )
    }
    else
    {
        res.status(404).json(
            {
                message : "username and password is incorrect "
            }
        )
    }
})

export default router;   