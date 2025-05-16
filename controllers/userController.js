import validator from "validator";
import bycrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET); // Use your test secret key
// API to register a new user

const registerUser = async (req, res) => {

    try {


        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing details !" });
        }

        //validating email formate
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email !" });

        }

        //validating password

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password !" });
        }

        // hashing user password

        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)
        // saving user data to database
        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        //_id

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

//API for user login

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist !" })
        }
        const isMatch = await bycrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            return res.json({ success: false, message: "Invalid credentials !" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

//API to get user details

const getProfile = async (req, res) => {

    try {

        const { userId } = req.body
        const userData = await userModel.findById(userId).select("-password")

        res.json({ success: true, userData })



    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })

    }


}

//API to update user details

const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "Data missing !" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })


        if (imageFile) {

            // upload image to cloudnary

            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }

        res.json({ success: true, message: "Profile updated successfully !" })

        //     const userData = await userModel.findById(userId)
        //     if (!userData) {
        //         return res.json({ success: false, message: "User doesn't exist !" })
        //     }

        //     const updatedUser = await userModel.findByIdAndUpdate(userId, { name, email }, { new: true })
        //     res.json({ success: true, updatedUser })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

//API to book appointments with doc

const bookAppointment = async (req, res) => {

    try {

        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available !" })
        }

        let slots_booked = docData.slots_booked
        //checking for slots availability

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot is not available !" })

            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked // removing history of alotesbooked data

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots data in docdata

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "Appointment booked successfully !" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// API to get user appointment for frntend my-appointments page

const listAppointment = async (req, res) => {

    try {

        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

//api to cancle appointment

const cancelAppointment = async (req, res) => {
    try {

        const { userId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized Action !" })

        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //relesing doc slot

        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked  // extracting data

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime) // removing the slot from booked slots
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })  // updating in doctor data
        //removing appointment from appointment data

        res.json({ success: true, message: "Appointment cancelled successfully !" })




    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


const paymentStripe = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        // Fetch appointment data
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment not found or cancelled!" });
        }

        // Create a Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: appointmentData.amount * 100, // Amount in cents
            currency: process.env.CURRENCY, // Currency from .env file
            payment_method_types: [
                'card', 'link', 'klarna', 'afterpay_clearpay',
                'wechat_pay', 'us_bank_account'
            ], // Add all supported payment methods
            metadata: { appointmentId }, // Optional metadata for tracking
        });

        console.log("Stripe Payment Intent client_secret:", paymentIntent.client_secret); // Log for debugging

        // Send the client secret to the frontend
        res.json({ success: true, clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error in paymentStripe:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to confirm payment and update the appointment as paid
const confirmPayment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        // Fetch appointment data
        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found!" });
        }

        if (appointmentData.cancelled) {
            return res.json({ success: false, message: "Cannot mark a cancelled appointment as paid!" });
        }

        // Update the appointment as paid
        await appointmentModel.findByIdAndUpdate(appointmentId, { paid: true });

        res.json({ success: true, message: "Payment confirmed and appointment marked as paid!" });
    } catch (error) {
        console.error("Error in confirmPayment:", error.message);
        res.json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentStripe,confirmPayment }