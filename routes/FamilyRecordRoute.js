import express from 'express';
import { 
    addFamilyRecord, 
    getAllFamilyRecords, 
    getFamilyRecord, 
    updateFamilyRecord, 
    deleteFamilyRecord, 
    allDoctors, 
    loginAdmin 
} from '../controllers/FamilyRecordController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import authUser from '../middlewares/authUser.js';

const FamilyRecordRouter = express.Router();

// Admin endpoints
FamilyRecordRouter.post('/add-family-record', authAdmin, upload.single('image'), addFamilyRecord);
FamilyRecordRouter.post('/all-family-records', authAdmin, allDoctors);
FamilyRecordRouter.post('/login', loginAdmin);

// User endpoints
FamilyRecordRouter.post('/user/add-family-record', authUser, upload.single('image'), addFamilyRecord);
FamilyRecordRouter.get('/user/family-records', authUser, getAllFamilyRecords);
FamilyRecordRouter.get('/user/family-record/:id', authUser, getFamilyRecord);
FamilyRecordRouter.put('/user/family-record/:id', authUser, updateFamilyRecord);
FamilyRecordRouter.delete('/user/family-record/:id', authUser, deleteFamilyRecord);

export default FamilyRecordRouter;
