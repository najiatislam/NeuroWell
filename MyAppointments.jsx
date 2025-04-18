import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

  const {backendUrl, token, getDoctorsData} = useContext(AppContext)


  const [appointments, setAppointments] = useState([])
   /// to show teh day moth year format
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_")
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }



  const getUserAppointments = async () => {

    //api call
    try {

      const {data} = await axios.get(backendUrl + "/api/user/appointments", {headers: {token}})
      
      if (data.success) {
        setAppointments(data.appointments.reverse())   // to not show in revers order
        console.log(data.appointments)
        

        
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)

      
      
    }
  }

  const cancelAppointment = async (appointmentId) => {

    try {

      // console.log(appointmentId);
      const {data} = await axios.post(backendUrl + "/api/user/cancel-appointment", {appointmentId}, {headers: {token}})

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else {
        toast.error(data.message)
      }
      
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }

  }

  useEffect(()=> {
    if (token) {
      getUserAppointments()
      
    }
  },[token])



  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-800 border-b'>My Appointmets</p>
      <div>
        {appointments.map((item,index)=>(
          <div className='grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>

            <div>
              <img className='w-32 bg-slate-300' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-800'>
              <p className='text-neutral-900 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-900 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-900 font-medium'>Date & Time:</span> {slotDateFormate(item.slotDate)} | {item.slotTime} </p>
            </div>
            <div></div>

            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && <button className='text-sm text-stone-800 text-center sm:min-w-48 py-2 border rounded hover:bg-slate-700 hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-800 text-center sm:min-w-48 py-2 border rounded hover:bg-red-700 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
              {item.cancelled && <button className='text-sm text-white text-center sm:min-w-48 py-2 border rounded bg-red-700 hover:text-white transition-all duration-300'>Appointment Cancelled</button>}
            </div>
          </div>
        ))}
      </div>
        
    </div>
  )
}

export default MyAppointments