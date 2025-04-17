import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { aToken,setAToken } = useContext(AdminContext)
    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')

    }
    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-slate-400'>
            <div className='flex flex-col items-center text-xs'>
                {/* Logo */}
                <img className='w-36 sm:w-40 cursor-pointer' src={assets.logo} alt="" />

                {/* Dashboard Panel */}
                <p className='bg-primary text-center text-xs text-white rounded-full w-36 sm:w-40 py-2'>
                    Dashboard Panel
                </p>


            </div>
            {/* Admin/Doctor Indicator */}
            <div className='text-lg border px-2.5 py-0.5 rounded-full  bg-slate-700'>
                <p className=' text-white'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>

            {/* Logout Button */}
            <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
        </div>


        // <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>

        //     <div className='flex items-center gap-2 text-xs'>
        //         <img className='w-36 sm:w-40 cursor-pointer' src={assets.logo} alt="" srcset="" />

        //         <p>{atoken ? 'Admin' : 'Doctor'}</p>
        //     </div>
        //     {/* <p className='bg-primary  text-center text-xs text-white rounded-full'>Dashboard Panel</p> */}
        //     <button>Logout</button>
        // </div>
    )
}

export default Navbar