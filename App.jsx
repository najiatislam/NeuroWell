import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Pharmacy from './pages/Pharmacy';
import LocalPharmacy from './pages/LocalPharmacy';
import GlobalPharmacy from './pages/GlobalPharmacy';
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import NAvbar from './components/NAvbar'
import Footer from './components/Footer'
import Wrapper from './components/Wraper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentSuccess from './pages/PaymentSuccess'
import CommunityForum from './pages/CommunityForum'
import GroupTherapy from './pages/GroupTherapy'
import Medicine from './pages/Medicine'
import HealthGoalsPage from './pages/HealthGoalsPage'




const App = () => {
  return (
    <div className='mx-4 sm:mx[10%]'>
      <ToastContainer/>
      <NAvbar/>
      <Wrapper>
      
      

      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/doctors' element= {<Doctors/>} />
        <Route path='/doctors/:speciality' element= {<Doctors/>} />
        <Route path='/login' element= {<Login/>} />
        <Route path='/about' element= {<About/>} />
        <Route path='/contact' element= {<Contact/>} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/pharmacy/local" element={<LocalPharmacy />} />
        <Route path="/pharmacy/global" element={<GlobalPharmacy />} />
        <Route path='/my-profile' element= {<MyProfile/>} />
        <Route path="/health-goals" element={<HealthGoalsPage />} />
        <Route path='/my-appointments' element= {<MyAppointments/>} />
        <Route path='/appointment/:docId' element= {<Appointment/>} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path='/community-forum' element={<CommunityForum/>} />
        <Route path='/group-therapy' element={<GroupTherapy/>} />
        <Route path='/medicine' element={<Medicine/>} />








        


        
      </Routes>
      </Wrapper>
      <Footer/>

    
      
    </div>
  )
}

export default App