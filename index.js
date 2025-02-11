
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDB } from './src/dbConfig/index.js';
import doctorRoutes from './src/routes/doctors.route.js';
import newsRoutes from './src/routes/news.route.js';
import servicesRoutes from './src/routes/services.route.js';
import userRoutes from './src/routes/users.route.js';
import blogRoutes from './src/routes/blogs.route.js'
import appointmentRoutes from './src/routes/appointment.route.js'
import contactRoutes from './src/routes/contact.route.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT ${PORT}`);
    })
})
.catch((error)=>{
    console.log("Error occured while connecting to database ", error);
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cors({
    origin:process.env.ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(cookieParser());

app.use('/api/d', doctorRoutes);
app.use('/api/n', newsRoutes);
app.use('/api/s', servicesRoutes);
app.use('/api/u', userRoutes);
app.use('/api/b', blogRoutes);
app.use('/api/a', appointmentRoutes);
app.use('/api/c', contactRoutes);