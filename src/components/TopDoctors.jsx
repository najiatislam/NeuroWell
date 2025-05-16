import React, { useContext } from 'react'
// import { doctors } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'



const TopDoctors = () => {

    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)


  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium' >List of our trusted Psychiatrist and Psychologist. </h1>
        <p className='sm:w-1/3 text-center text-sm' >You can easilly scroll throught the Psychiatrist and Psychologist we provide.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 am:px-0'>
            {doctors.slice(0,10).map((item,index)=>(
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

export default TopDoctors


////////////////////////maisha


// import React from 'react';
// import { assets } from '../assets/assets';

// const TopDoctors = () => {
//   return (
//     <div className='flex flex-col bg-primary rounded-lg px-6 md:px-10 lg:px-20 py-10 md:py-16'>

//       {/* ------------Section Header-------------*/}
//       <div className='flex flex-col items-center text-center mb-10 md:mb-16'>
//         <h2 className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
//           Journals & <br className='hidden md:block' /> Medical News
//         </h2>
//         <p className='text-white text-sm font-light mt-4 max-w-md'>
//           Stay updated with the latest research and healthcare developments
//         </p>
//       </div>

//       {/* ------------Content Cards-------------*/}
//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

//         {/* Journal Card 1 */}
//         <div className='bg-white rounded-xl p-6 flex flex-col hover:shadow-lg transition-all duration-300'>
//           <div className='flex items-center gap-3 mb-4'>
//             <img className='w-10 h-10' src={assets.journal_icon} alt="Journal" />
//             <span className='text-xs font-medium text-gray-500'>RESEARCH JOURNAL</span>
//           </div>
//           <h3 className='text-xl font-semibold text-gray-800 mb-3'>
//             Latest Advances in Cardiology
//           </h3>
//           <p className='text-gray-600 text-sm mb-6'>
//             Exploring innovative treatments for heart diseases and patient care methodologies.
//           </p>
//           <a href="#" className='flex items-center gap-2 text-primary text-sm font-medium mt-auto'>
//             Read Journal <img className='w-3' src={assets.arrow_icon} alt="" />
//           </a>
//         </div>

//         {/* News Card 2 */}
//         <div className='bg-white rounded-xl p-6 flex flex-col hover:shadow-lg transition-all duration-300'>
//           <div className='flex items-center gap-3 mb-4'>
//             <img className='w-10 h-10' src={assets.news_icon} alt="News" />
//             <span className='text-xs font-medium text-gray-500'>MEDICAL NEWS</span>
//           </div>
//           <h3 className='text-xl font-semibold text-gray-800 mb-3'>
//             Hospital Wins Innovation Award
//           </h3>
//           <p className='text-gray-600 text-sm mb-6'>
//             Recognized for groundbreaking work in patient care and medical technology.
//           </p>
//           <a href="#" className='flex items-center gap-2 text-primary text-sm font-medium mt-auto'>
//             Read Article <img className='w-3' src={assets.arrow_icon} alt="" />
//           </a>
//         </div>

//         {/* Journal Card 3 */}
//         <div className='bg-white rounded-xl p-6 flex flex-col hover:shadow-lg transition-all duration-300'>
//           <div className='flex items-center gap-3 mb-4'>
//             <img className='w-10 h-10' src={assets.journal_icon} alt="Journal" />
//             <span className='text-xs font-medium text-gray-500'>CLINICAL STUDY</span>
//           </div>
//           <h3 className='text-xl font-semibold text-gray-800 mb-3'>
//             Pediatric Care Innovations
//           </h3>
//           <p className='text-gray-600 text-sm mb-6'>
//             New findings in child healthcare and developmental medicine practices.
//           </p>
//           <a href="#" className='flex items-center gap-2 text-primary text-sm font-medium mt-auto'>
//             Read Study <img className='w-3' src={assets.arrow_icon} alt="" />
//           </a>
//         </div>

//       </div>

//       {/* ------------Welcome Footer-------------*/}
//       <div className='flex flex-col items-center text-center mt-12 md:mt-16'>
//         <div className='flex items-center gap-3 text-white text-sm font-light mb-4'>
//           <img className='w-28' src={assets.group_profiles} alt="" />
//           <p>You are welcome, please explore our resources</p>
//         </div>
//         <a href="#journals" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300'>
//           View All Journals <img className='w-3' src={assets.arrow_icon} alt="" />
//         </a>
//       </div>

//     </div>
//   );
// };

// export default TopDoctors;