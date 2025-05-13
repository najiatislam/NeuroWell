import validator from "validator";
import bycrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Stripe from 'stripe';
import medicineReminderModel from "../models/medicineReminderModel.js";

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET);

// API to register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details !" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email !" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password !" });
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist !" });
    }

    const isMatch = await bycrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials !" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user details
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user details
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender, language } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Data missing !" });
    }

    const updateData = {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    };

    if (language) {
      updateData.language = language;
    }

    await userModel.findByIdAndUpdate(userId, updateData);

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image',
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile updated successfully !" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointments
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select('-password');

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available !" });
    }

    let slots_booked = docData.slots_booked;
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot is not available !" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select('-password');
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment booked successfully !" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to list appointments
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized Action !" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled successfully !" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for payment using Stripe
const paymentStripe = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment not found or cancelled!" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      payment_method_types: ['card', 'link', 'klarna', 'afterpay_clearpay', 'wechat_pay', 'us_bank_account'],
      metadata: { appointmentId },
    });

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error in paymentStripe:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to confirm Stripe payment
const confirmPayment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found!" });
    }

    if (appointmentData.cancelled) {
      return res.json({ success: false, message: "Cannot mark a cancelled appointment as paid!" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { paid: true });

    res.json({ success: true, message: "Payment confirmed and appointment marked as paid!" });
  } catch (error) {
    console.error("Error in confirmPayment:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Add medicine reminder
const addMedicineReminder = async (req, res) => {
  try {
    const { userId, medicine, dosage, time, frequency, startDate, endDate, notes } = req.body;

    if (!medicine || !time || !frequency || !startDate || !endDate) {
      return res.json({ success: false, message: "Please fill all required fields." });
    }

    const reminder = new medicineReminderModel({
      userId,
      medicine,
      dosage,
      time,
      frequency,
      startDate,
      endDate,
      notes,
    });

    await reminder.save();
    res.json({ success: true, message: "Medicine reminder added." });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

// Get medicine reminders
const getMedicineReminders = async (req, res) => {
  try {
    const { userId } = req.body;
    const reminders = await medicineReminderModel.find({ userId });
    res.json({ success: true, reminders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Delete medicine reminder
const deleteMedicineReminder = async (req, res) => {
  try {
    const { reminderId } = req.body;
    await medicineReminderModel.findByIdAndDelete(reminderId);
    res.json({ success: true, message: "Reminder deleted." });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentStripe,
  confirmPayment,
  addMedicineReminder,
  getMedicineReminders,
  deleteMedicineReminder
};
