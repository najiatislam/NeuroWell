import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {

    const { aToken } = useContext(AdminContext)


    return (
        <div className='min-h-screen bg-slate-400'>
            {
                aToken && <ul className='text-gray-900 mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#dde1eb] border-r-4 border-primary ' : ''}`} to={'/admin-dashboard'}>
                        <img src={assets.home_icon} alt="" srcSet="" />
                        <p>Dashboard</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#dde1eb] border-r-4 border-primary ' : ''}`} to={'/all-appointments'}>
                        <img src={assets.appointment_icon} alt="" srcSet="" />
                        <p>Appointments</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#dde1eb] border-r-4 border-primary ' : ''}`} to={'/add-doctor'}>
                        <img src={assets.add_icon} alt="" srcSet="" />
                        <p>Add Doctor</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#dde1eb] border-r-4 border-primary ' : ''}`} to={'/doctor-list'}>
                        <img src={assets.people_icon} alt="" srcSet="" />
                        <p>Doctors List</p>
                    </NavLink>

                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive? 'bg-[#dde1eb] border-r-4 border-primary ' : ''}`} to={'/add-family-record'}>
                        <img src={assets.add_icon} alt="" srcSet="" />
                        <p>Add Family Record</p>
                    </NavLink>

                    {/* //nihat's part  edited -_- */}


                    {/* New Exercise Suggestions Link */}
            
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#dde1eb] border-r-4 border-primary ' : ''}`}  to={"/exercise-suggestions"} >
                        <img src={assets.add_icon} alt="" srcSet="" />
                        <p>Exercise Suggestions</p>
                    </NavLink>

                    {/* till this  */}

                </ul>
            }

        </div>
    )
}

export default Sidebar