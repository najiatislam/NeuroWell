import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllApointmets from './pages/Admin/AllApointmets';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

const App = () => {

  const {aToken} = useContext(AdminContext)

  return aToken ?  (
    <div className='bg-[#dde1eb]' >
      
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element = {<></>}/>
          <Route path='/admin-dashboard' element = {<Dashboard/>}/>
          <Route path='/all-appointments' element = {<AllApointmets/>}/>
          <Route path='/add-doctor' element = {<AddDoctor/>}/>
          <Route path='/doctor-list' element = {<DoctorsList/>}/>



        </Routes>
      </div>

    </div>
  ): (
    <>
    <Login />
    <ToastContainer/>
    </>
  )
}

export default App