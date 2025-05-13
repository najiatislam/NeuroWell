import express from 'express';
import { getProfile, loginUser, registerUser, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentStripe, confirmPayment } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
import { addMedicineReminder, getMedicineReminders, deleteMedicineReminder } from '../controllers/userController.js';

const userRouter = express.Router()

// API to register a new user
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser , getProfile)
userRouter.post('/update-profile',  upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.post('/payment-stripe', authUser, paymentStripe)
userRouter.post('/confirm-payment', confirmPayment); // New route
userRouter.post('/add-reminder', authUser, addMedicineReminder);
userRouter.post('/get-reminders', authUser, getMedicineReminders);
userRouter.post('/delete-reminder', authUser, deleteMedicineReminder);




export default userRouter