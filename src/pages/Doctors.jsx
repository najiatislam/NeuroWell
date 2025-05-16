////WHITOUT FILTER  


import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div>
      <p className='text-gray-600 text-lg'>This is our list of the Psychiatrist and Psychologist.</p>
      <div className='w-full grid grid-cols-auto gap-4 gap-y-6 mt-5'>
        {doctors.map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            className='border border-teal-900 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
            key={index}
          >
            <img className='bg-slate-600 w-full h-48 object-cover' src={item.image} alt={item.name} />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-700'>
                <p className='w-2 h-2 bg-green-700 rounded-full'></p>
                <p>Available</p>
              </div>
              <p className='text-slate-800 text-lg font-medium'>{item.name}</p>
              <p className='text-slate-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;




///IT'S WORKING FINE WITH FILTER
// import React, { useEffect, useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const Doctors = () => {
//   const { speciality } = useParams();
//   const navigate = useNavigate();
//   const { doctors } = useContext(AppContext);
//   const [filterDoc, setFilterDoc] = useState([]);
//   const [showFilter,setShowFilter] = useState(false)

//   useEffect(() => {
//     if (speciality) {
//       setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
//     } else {
//       setFilterDoc(doctors);
//     }
//   }, [speciality, doctors]);

//   return (
//     <div> 
//       {/* Filter section */}
//       <p className='text-gray-600 text-lg'>This is our list of the doctors.</p>
//       <div className='flex flex-col md:flex-row gap-5 mt-5'>
//         <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-slate-700 text-white' : ''}`} onClick={()=> setShowFilter(prev => !prev)}>Filters</button>
//         <div className={`flex-col gap-4 text-sm text-black w-full md:w-1/4 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
//           <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') :  navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer   ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}  `}>General physician</p>
//           <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') :  navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer             ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}  `}>Gynecologist</p>
//           <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') :  navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer           ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}  `}>Dermatologist</p>
//           <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') :  navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer           ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}  `}>Pediatricians</p>
//           <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') :  navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer               ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}  `}>Neurologist</p>
//           <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') :  navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}  `}>Gastroenterologist</p>
//         </div>

//         {/* Showcasing section */}
//         <div className='w-full md:w-3/4 grid grid-cols-auto gap-4 gap-y-6'>
//           {filterDoc.map((item, index) => (
//             <div
//               onClick={() => navigate(`/appointment/${item._id}`)}
//               className='border border-teal-900 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
//               key={index}
//             >
//               <img className='bg-slate-600 w-full h-48 object-cover' src={item.image} alt={item.name} />
//               <div className='p-4'>
//                 <div className='flex items-center gap-2 text-sm text-center text-green-700'>
//                   <p className='w-2 h-2 bg-green-700 rounded-full'></p>
//                   <p>Available</p>
//                 </div>
//                 <p className='text-slate-800 text-lg font-medium'>{item.name}</p>
//                 <p className='text-slate-600 text-sm'>{item.speciality}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctors;



// import React, { useContext, useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const Doctors = () => {
//   const {speciality } = useParams()
//   const [filterDoc, setFilterDoc] = useState([])
//   const navigate = useNavigate()

//   const {doctors} = useContext(AppContext)


//   const applyFilter = () => {
//     if (speciality) {
//       setFilterDoc(doctors.filter((doc => doc.speciality === speciality)))
//     } else {
//       setFilterDoc(doctors)
//     }
//   }

//   useEffect(()=>{
//     applyFilter()
//   }, [doctors, speciality])
//   return (
//     <div>
//       <p className='text-gray-800'>Browse through the doctros specialist</p>
//       <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
//         <div className='flex flex-col gap-4 text-sm text-gray-700'>

//           <p onClick={()=> speciality === 'Room1' ? navigate('/doctors') : navigate('/doctors/Room1')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer ${speciality === "Room1" ? "bg-indigo-100 text-black" : ""} `}>Room1</p>
//           <p onClick={()=> speciality === 'Room2' ? navigate('/doctors') : navigate('/doctors/Room2')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer ${speciality === "Room2" ? "bg-indigo-100 text-black" : ""} `}>Room2</p>
//           <p onClick={()=> speciality === 'Room3' ? navigate('/doctors') : navigate('/doctors/Room3')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer ${speciality === "Room3" ? "bg-indigo-100 text-black" : ""} `}>Room3</p>
//           <p onClick={()=> speciality === 'Room4' ? navigate('/doctors') : navigate('/doctors/Room4')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer ${speciality === "Room4" ? "bg-indigo-100 text-black" : ""} `}>Room4</p>
//           <p onClick={()=> speciality === 'Room5' ? navigate('/doctors') : navigate('/doctors/Room5')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer ${speciality === "Room5" ? "bg-indigo-100 text-black" : ""} `}>Room5</p>
//           <p onClick={()=> speciality === 'Room6' ? navigate('/doctors') : navigate('/doctors/Room6')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-slate-600 rounded transition-all cursor-pointer ${speciality === "Room6" ? "bg-indigo-100 text-black" : ""} `}>Room6</p>
//         </div>

//         <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
//           {
//             filterDoc.map((item,index)=>(
//               <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '  key={index}>
//                   <img className='bg-slate-600' src={item.image} alt="" />
//                   <div className='p-4'>
//                       <div className='flex items-center gap-2 text-sm text-center text-green-500'>
//                           <p className='w-2 h-2 bg-green-500 rounded-full'><p>Available</p></p>
//                       </div>
//                       <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
//                       <p className='text-gray-600 text-sm'>{item.speciality} </p>
//                   </div>
//               </div>

//           ))

//           }        
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Doctors








