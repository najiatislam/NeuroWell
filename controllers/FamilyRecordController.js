import validator from "validator"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import familyRecordModel from "../models/FamilyRecordModel.js"
import jwt from "jsonwebtoken"




//API for adding doc
const addFamilyRecord = async (req, res) => {
 
    try {
        const { name, email, password, relationship, bloodGroup, gender, height, weight, about, medicalConditions, address, familyMember } = req.body;
        const imageFile = req.file;

        console.log({ name, email, password, relationship, bloodGroup, gender, height, weight, about, medicalConditions, address, familyMember }, imageFile);

        // Check for missing fields
        if (!name || !email || !password || !relationship || !bloodGroup || !gender || !height || !weight || !about || !medicalConditions || !address || !familyMember) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validate strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Check if email already exists
        const existingFamilyRecord = await familyRecordModel.findOne({ email });
        if (existingFamilyRecord) {
            return res.json({ success: false, message: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Parse address
        let parsedAddress;
        try {
            parsedAddress = JSON.parse(address);
        } catch (error) {
            return res.json({ success: false, message: "Invalid address format" });
        }

        // Create familyRecord data
        const familyRecordData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            relationship,
            bloodGroup,
            gender,
            height,
            weight,
            about,
            medicalConditions,
            address: parsedAddress,
            familyMember,
            date: Date.now()
        };

        // Save to database
        const newFamilyRecord = new familyRecordModel(familyRecordData);
        await newFamilyRecord.save();

        res.json({ success: true, message: "Family Record Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//API for admin login

const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}

//API for getting all doctors FOR ADMIN PANEL


const allDoctors = async (req, res) => {

    try {

        const familyRecords = await familyRecordModel.find({}).select('-password')
        res.json({ success: true, familyRecords })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

export { addFamilyRecord, allDoctors, loginAdmin }