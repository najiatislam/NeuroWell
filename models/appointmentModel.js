import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({

    userId : {type: String, required: true},
    docId : {type: String, required: true},
    slotDate : {type: String, required: true},
    slotTime : {type: String, required: true},
    userData : {type: Object, required: true},
    docData : {type: Object, required: true},
    amount : {type: Number, required: true}, //amount of booked appointment
    date : {type: Number, required: true},
    cancelled : {type: Boolean, default: false}, 
    payment: {type: Boolean, default: false},
    isCompleted: {type: Boolean, default: false}, 
    paid: { type: Boolean, default: false },  
    meetingId: {type: String, default: ""},
    meetingPassword: {type: String, default: ""},
    meetingLink: {type: String, default: ""},



})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);
// const appointmentModel = mongoose.model.appointment || mongoose.model('appointment', appointmentSchema);
export default appointmentModel