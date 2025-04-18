import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({speciality,docId}) => {

    const {doctors} = useContext(AppContext);
    const navigate = useNavigate();

    const [relDoc,setRelDoc] = useState([]);

    useEffect(()=> {
        if(doctors.length >0 && speciality){
            const doctorsData =  doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId);
            setRelDoc(doctorsData);
        }

    },[doctors,speciality,docId]);

    
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium' >List of our trusted Doctors </h1>
        <p className='sm:w-1/3 text-center text-sm' >You can easilly scroll throught the specialist we provide.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 am:px-0'>
            {relDoc.slice(0,5).map((item,index)=>(
              <div onClick={()=> {navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='border border-teal-900 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-slate-600' src={item.image} alt="" />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-700'>
                        <p className='w-2 h-2 bg-green-700 rounded-full'></p><p>Available</p>
                    </div>
                    <p className='text-slate-800 text-lg font-medium'>{item.name}</p>
                    <p className='text-slate-600 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))}
        </div>
        <button onClick={()=> {navigate('/doctors'); scrollTo(0,0)}} className='bg-slate-700 text-white px-12 py-3 rounded-full mt-10'>More</button>
    </div>
  )
}

export default RelatedDoctors