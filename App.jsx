import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import NAvbar from './components/NAvbar';
import Footer from './components/Footer';
import Wrapper from './components/Wraper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentSuccess from './pages/PaymentSuccess';
import CommunityForum from './pages/CommunityForum';
import GroupTherapy from './pages/GroupTherapy';
import Medicine from './pages/Medicine';
import HealthGoalsPage from './pages/HealthGoalsPage';
import ExerciseSuggestionPage from './pages/ExerciseSuggestionPage';
import MedicineReminder from './pages/MedicineReminder';

// Temporary hardcoded userId for testing.
// Replace with real userId from context or login data.
const userId = "1234567890abcdef"; 
const backendUrl = "http://localhost:4000";

const App = () => {
  return (
    <div className='mx-4 sm:mx[10%]'>
      <ToastContainer />
      <NAvbar />
      <Wrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path='/community-forum' element={<CommunityForum />} />
          <Route path='/group-therapy' element={<GroupTherapy />} />
          <Route path='/medicine' element={<Medicine />} />
          <Route path="/health-goals" element={<HealthGoalsPage />} />
          <Route path="/exercise-suggestions" element={<ExerciseSuggestionPage />} />
          <Route path='/medicine-reminder' element={<MedicineReminder backendUrl={backendUrl} userId={userId} />} />
        </Routes>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default App;
