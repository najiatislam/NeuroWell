import React, { useState, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const AddFamilyRecord = () => {
  const { aToken, addFamilyRecord } = useContext(AdminContext);
  const navigate = useNavigate();
  
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    relationship: 'Parent',
    gender: 'Male',
    dob: '',
    bloodGroup: 'A+',
    height: '',
    weight: '',
    address: {
      line1: '',
      line2: ''
    },
    medicalConditions: '',
    about: ''
  });
  
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'line1' || name === 'line2') {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!aToken) {
        toast.error('You must be logged in as admin');
        navigate('/');
        return;
      }
      
      // Validate required fields
      const requiredFields = ['name', 'email', 'password', 'relationship', 'bloodGroup', 'gender'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setLoading(false);
        return;
      }
      
      // Validate email
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        toast.error('Please enter a valid email address');
        setLoading(false);
        return;
      }
      
      // Validate password
      if (formData.password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        setLoading(false);
        return;
      }
      
      // Check image
      if (!image) {
        toast.error('Please upload an image');
        setLoading(false);
        return;
      }
      
      const data = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'address') {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      });
      
      // Append image
      data.append('image', image);
      
      const success = await addFamilyRecord(data);
      
      if (success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          relationship: 'Parent',
          gender: 'Male',
          dob: '',
          bloodGroup: 'A+',
          height: '',
          weight: '',
          address: {
            line1: '',
            line2: ''
          },
          medicalConditions: '',
          about: ''
        });
        setImage(null);
        setImagePreview(null);
        
        // Navigate to family records list
        navigate('/family-records');
      }
    } catch (error) {
      console.error('Error adding family member:', error);
      toast.error('Error adding family member');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 overflow-y-auto h-[calc(100vh-64px)]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Family Member</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={assets.upload_area} alt="Upload" className="w-12 h-12" />
              )}
            </div>
            <label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </label>
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
              minLength="8"
            />
            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
            <select
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Parent">Parent</option>
              <option value="Spouse">Spouse</option>
              <option value="Child">Child</option>
              <option value="Sibling">Sibling</option>
              <option value="Grandparent">Grandparent</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Height in cm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Weight in kg"
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
            <input
              type="text"
              name="line1"
              value={formData.address.line1}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
            <input
              type="text"
              name="line2"
              value={formData.address.line2}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
            <textarea
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              rows="3"
              placeholder="List any medical conditions, allergies, or ongoing treatments"
            ></textarea>
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              rows="3"
              placeholder="Any additional information about this family member"
            ></textarea>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/family-records')}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md mr-2 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Family Member'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFamilyRecord;
