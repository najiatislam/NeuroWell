import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'; // Import i18n hook
import PersonalizedHealthPlan from '../components/PersonalizedHealthPlan';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const { t } = useTranslation(); // Initialize translation
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState('weight_loss');
  const [exercises, setExercises] = useState([]);

  const [familyRecords, setFamilyRecords] = useState([
    { member: 'Father', issues: ['Diabetes'] },
    { member: 'Mother', issues: ['Thyroid'] },
  ]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/exercises/${selectedGoal}`)
      .then((res) => setExercises(res.data))
      .catch((err) => {
        console.error('Error fetching exercises', err);
        setExercises([]);
      });
  }, [selectedGoal]);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      image && formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleRecordChange = (index, field, value) => {
    const updated = [...familyRecords];
    updated[index][field] = field === 'issues' ? value.split(',').map(i => i.trim()) : value;
    setFamilyRecords(updated);
  };

  const handleAddRecord = () => {
    setFamilyRecords([...familyRecords, { member: '', issues: [] }]);
  };

  const handleRemoveRecord = (index) => {
    const updated = familyRecords.filter((_, i) => i !== index);
    setFamilyRecords(updated);
  };

  return (
    userData && (
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT: PROFILE SECTION */}
        <div className="flex-1 max-w-lg flex flex-col gap-2 text-sm">
          {isEdit ? (
            <label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                <img className="w-10 absolute bottom-12 right-12" src={image ? '' : assets.upload_icon} alt="" />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
          ) : (
            <img className="w-36 rounded" src={userData.image} alt="" />
          )}

          {isEdit ? (
            <input className="bg-gray-100 text-3xl font-medium max-w-60 mt-4" type="text" value={userData.name} onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))} />
          ) : (
            <p className="font-medium text-3xl text-neutral-900 mt-4">{userData.name}</p>
          )}

          <hr className="bg-zinc-500 h-[1px] border-none" />

          {/* Contact Information */}
          <div>
            <p className="text-neutral-700 underline mt-3">{t('profile.contactInfo')}</p>
            <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-800">
              <p className="font-medium">Email id:</p>
              <p className="text-teal-600">{userData.email}</p>
              <p className="font-medium">Phone:</p>
              {isEdit ? (
                <input className="bg-gray-200 max-w-52" type="text" value={userData.phone} onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} />
              ) : (
                <p className="text-teal-600">{userData.phone}</p>
              )}
              <p className="font-medium">Address:</p>
              {isEdit ? (
                <p>
                  <input className="bg-gray-200" onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} type="text" />
                  <br />
                  <input className="bg-gray-200" onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} type="text" />
                </p>
              ) : (
                <p className="text-gray-600">{userData.address.line1}<br />{userData.address.line2}</p>
              )}
            </div>
          </div>

          {/* Family Health Records */}
          <div className="mt-8">
            <p className="text-neutral-700 underline mb-2">{t('profile.familyHealthRecord')}</p>
            {familyRecords.map((record, index) => (
              <div key={index} className="mb-4">
                {isEdit ? (
                  <div className="flex flex-col gap-2">
                    <input type="text" value={record.member} placeholder="Family Member" className="bg-gray-200 p-1" onChange={(e) => handleRecordChange(index, 'member', e.target.value)} />
                    <input type="text" value={record.issues.join(', ')} placeholder="Health Issues (comma separated)" className="bg-gray-200 p-1" onChange={(e) => handleRecordChange(index, 'issues', e.target.value)} />
                    <button onClick={() => handleRemoveRecord(index)} className="text-red-600 text-sm">Remove</button>
                  </div>
                ) : (
                  <p className="text-sm">{record.member}: {record.issues.join(', ')}</p>
                )}
              </div>
            ))}
            {isEdit && <button onClick={handleAddRecord} className="text-blue-600 text-sm">{t('profile.addFamilyMember')}</button>}
          </div>

          <div className="mt-10">
            {isEdit ? (
              <button className="border border-slate-700 px-8 py-2 rounded-full hover:bg-slate-700 hover:text-white transition-all duration-300" onClick={updateUserProfileData}>{t('profile.saveButton')}</button>
            ) : (
              <button className="border border-slate-700 px-8 py-2 rounded-full hover:bg-slate-700 hover:text-white transition-all duration-300" onClick={() => setIsEdit(true)}>{t('profile.editButton')}</button>
            )}
          </div>
        </div>

        {/* RIGHT: SIDEBAR */}
        <div className="w-full md:w-1/3 lg:w-96 space-y-6">
          {/* Exercise Suggestions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-800 mb-4">🎯 {t('profile.exerciseSuggestions')}</h2>
            <select value={selectedGoal} onChange={(e) => setSelectedGoal(e.target.value)} className="w-full p-2 border rounded mb-4">
              <option value="weight_loss">Weight Loss</option>
              <option value="stress">Stress Relief</option>
              <option value="anger_management">Anger Management</option>
              <option value="increased_flexibility">Increased Flexibility</option>
            </select>
            {exercises.length > 0 ? (
              <ul className="space-y-3 text-sm text-gray-700">
                {exercises.map((ex) => (
                  <li key={ex._id} className="border p-3 rounded shadow-sm">
                    <p className="font-semibold">{ex.name}</p>
                    <p className="text-xs italic">{ex.description}</p>
                    <ul className="list-disc ml-5 mt-1">
                      {ex.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">{t('profile.noExercises')}</p>
            )}
          </div>

          {/* ✅ Personalized Mental Wellness Plan */}
          {userData && userData._id && <PersonalizedHealthPlan userId={userData._id} />}
        </div>
      </div>
    )
  );
};

export default MyProfile;
