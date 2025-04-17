import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigate = useNavigate()



  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

// from blackbox ai
//   const getAvailableSlots = async () => {
//     let allSlots = [];
//     let today = new Date();

//     for (let i = 0; i < 7; i++) {
//         let currentDate = new Date(today);
//         currentDate.setDate(today.getDate() + i);

//         let endTime = new Date();
//         endTime.setDate(today.getDate() + i);
//         endTime.setHours(21, 0, 0, 0);

//         // Set the starting time for the first day
//         if (i === 0) {
//             // If the current time is before 10 AM, start at 10 AM
//             if (currentDate.getHours() < 10) {
//                 currentDate.setHours(10, 0, 0, 0);
//             } else {
//                 // If it's after 10 AM, round to the next half hour
//                 currentDate.setMinutes(Math.ceil(currentDate.getMinutes() / 30) * 30);
//             }
//         } else {
//             currentDate.setHours(10, 0, 0, 0); // For other days, start at 10 AM
//         }

//         let timeSlots = [];

//         while (currentDate < endTime) {
//             let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//             timeSlots.push({
//                 datetime: new Date(currentDate),
//                 time: formattedTime
//             });

//             // Increment current time by 30 minutes
//             currentDate.setMinutes(currentDate.getMinutes() + 30);
//         }

//         allSlots.push(timeSlots);
//     }

//     setDocSlots(allSlots);
// };

  const getAvailableSlots = async () => {
    let allSlots = [];

    // get current date
    let today = new Date();

    // get next 7 days
    for (let i = 0; i < 7; i++) {
      // get the date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the day with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (i === 0) {
        currentDate.setHours(currentDate.getHours() >= 10 ? currentDate.getHours() : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        //checking if slot is available if yes then it will be added to the array othewise it will be skipped
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
        // add api slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        }
         

        // increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };


  const bookAppointment = async () => {

    if (!token) {

      toast.warn('Login to book appointment!')
      return navigate('/login')
      
    }

    try {

      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1 
      let year = date.getFullYear() 

      const slotDate = day + "_" + month + "_" + year
      // console.log(slotDate)

      //API call 
      const {data} = await axios.post(backendUrl + "/api/user/book-appointment" , {docId, slotDate, slotTime},{headers:{token}})

      if(data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      }else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error)
      console.log(error.message)
      
    }
    
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  const handleSlotClick = (index, time) => {
    setSlotIndex(index);
    setSlotTime(time);
  };

  


// doc info showcase

  return  docInfo && (
    <div>

        {/* ----Doc details */}

        <div className='flex flex-col sm:flex-row gap-4'>
          <div>
            <img className='bg-slate-700 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-slate-300 mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

            {/* -----Doc info */}

            <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
              {docInfo.name} 
              <img className='w-5' src={assets.verified_icon} alt="" />
              </p>
              <div className='flex items-center gap-2 text-sm mt-1 text-gray-700'>
                <p>{docInfo.degree} - {docInfo.speciality}</p>
                <button className='py-0.5 px-2 border text-xs rounded-full bg-slate-400 text-gray-900'>{docInfo.experience}</button>
              </div>

              {/* -----doc about */}

              <div>
                <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" />
                </p>
                <p className='text-sm text-gray-800 max-w-[720px] mt-1'>{docInfo.about}</p>
              </div>
              <p className='text-gray-700 font-medium mt-4'>
                Appointment Fee : <span className='text-gray-700'>{currencySymbol}{docInfo.fees}</span>
              </p>
          </div>
        </div>

        {/* ----------booking slots--------- */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-black'>
          <p>Booking Slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {
            
            docSlots.length && docSlots.map((item,index)=>(
              <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-slate-700 text-white' : 'border border-teal-800'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>

              </div>
            ))
            
            }
          </div>

        
          <div className='flex flex-items-center gap-3 w-fll overflow-x-scroll mt-4'>
            {docSlots.length && docSlots[slotIndex].map((item,index)=> (
              <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-slate-700 text-white' : 'text-black border border-teal-800'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
              ))}

          </div>
          <button onClick={bookAppointment} className='bg-slate-700 text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>

        </div>
        {/* Listing related docs */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
};


export default Appointment