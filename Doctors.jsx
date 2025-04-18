import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const {speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()

  const {doctors} = useContext(AppContext)


  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc => doc.speciality === speciality)))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  }, [doctors, speciality])
  return (
    <div>
      <p className='text-gray-600'>Browse through the doctros specialist</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>

          <p onClick={()=> speciality === 'Room1' ? navigate('/doctors') : navigate('/doctors/Room1')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Room1" ? "bg-indigo-100 text-black" : ""} `}>Room1</p>
          <p onClick={()=> speciality === 'Room2' ? navigate('/doctors') : navigate('/doctors/Room2')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Room2" ? "bg-indigo-100 text-black" : ""} `}>Room2</p>
          <p onClick={()=> speciality === 'Room3' ? navigate('/doctors') : navigate('/doctors/Room3')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Room3" ? "bg-indigo-100 text-black" : ""} `}>Room3</p>
          <p onClick={()=> speciality === 'Room4' ? navigate('/doctors') : navigate('/doctors/Room4')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Room4" ? "bg-indigo-100 text-black" : ""} `}>Room4</p>
          <p onClick={()=> speciality === 'Room5' ? navigate('/doctors') : navigate('/doctors/Room5')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Room5" ? "bg-indigo-100 text-black" : ""} `}>Room5</p>
          <p onClick={()=> speciality === 'Room6' ? navigate('/doctors') : navigate('/doctors/Room6')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Room6" ? "bg-indigo-100 text-black" : ""} `}>Room6</p>
        </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item,index)=>(
              <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '  key={index}>
                  <img className='bg-blue-50' src={item.image} alt="" />
                  <div className='p-4'>
                      <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                          <p className='w-2 h-2 bg-green-500 rounded-full'><p>Available</p></p>
                      </div>
                      <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                      <p className='text-gray-600 text-sm'>{item.speciality} </p>
                  </div>
              </div>

          ))

          }        
        </div>
      </div>

    </div>
  )
}

export default Doctors