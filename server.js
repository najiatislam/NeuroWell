import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
//nihat's
import exerciseRouter from './routes/exerciseRoute.js';  // Import exercise route
import familyHealthRouter from './routes/familyHealthRoute.js';
import healthPlanRouter from './routes/healthPlanRoute.js';
import healthPlanUserRouter from './routes/healthPlanUserRoute.js';

//till here





// app config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// api endpoints

app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

//nihat's
app.use('/api/exercises', exerciseRouter);  // Mount route
app.use('/api/family-health', familyHealthRouter);
app.use('/api/health-plans', healthPlanRouter);
app.use('/api/user/health-plan', healthPlanUserRouter);
//till here


//till here 


//localhost:4000/api/admin/add-doctor

app.get('/', (req,res)=>{
    res.send('API WORKING :)')
})

app.listen(port,()=> console.log("Server Started", port));

