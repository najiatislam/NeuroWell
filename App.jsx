import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import NAvbar from './components/NAvbar'
import Footer from './components/Footer'
import Wrapper from './components/Wraper'
import CommunityForum from './pages/CommunityForum'
import GroupTherapy from './pages/GroupTherapy'
import Medicine from './pages/Medicine'

import EmergencyContacts from './pages/EmergencyContacts'
import ReadJournal from './pages/ReadJournal'
import ReadArticle from './pages/ReadArticle'
import ReadStudy from './pages/ReadStudy'

const App = () => {
  return (
    <div className='mx-4 sm:mx[10%]'>
      <NAvbar/>
      <Wrapper>
      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/doctors' element= {<Doctors/>} />
        <Route path='/doctors/:speciality' element= {<Doctors/>} />
        <Route path='/login' element= {<Login/>} />
        <Route path='/about' element= {<About/>} />
        <Route path='/contact' element= {<Contact/>} />
        <Route path='/my-profile' element= {<MyProfile/>} />
        <Route path='/my-appointments' element= {<MyAppointments/>} />
        <Route path='/appointment/:docId' element= {<Appointment/>} />
        <Route path='/community-forum' element={<CommunityForum/>} />
        <Route path='/group-therapy' element={<GroupTherapy/>} />
        <Route path='/medicine' element={<Medicine/>} />

        <Route path='/emergency-contacts' element={<EmergencyContacts />} />
        <Route path="/read-journal" element={<ReadJournal />} />
        <Route path="/read-article" element={<ReadArticle />} />
        <Route path="/read-study" element={<ReadStudy />} />
      </Routes>
      </Wrapper>
      <Footer/>
    </div>
  )
}

export default App
