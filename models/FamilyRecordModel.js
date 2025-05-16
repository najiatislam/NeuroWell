import mongoose from "mongoose";

const FamilyRecordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: '' },
    relationship: { type: String, default: 'Other' },
    bloodGroup: { type: String, default: 'A+' },
    gender: { type: String, default: 'Other' },

    height: { type: String, default: '' },
    weight: { type: String, default: '' },
    about: { type: String, default: '' },
    medicalConditions: { type: String, default: '' },
    address: { 
        type: Object, 
        default: { line1: '', line2: '' } 
    },
    familyMember: { type: String, default: '' },
}, { minimize: false });

const FamilyRecordModel = mongoose.models.familyRecord || mongoose.model('familyRecord', FamilyRecordSchema);

export default FamilyRecordModel;
