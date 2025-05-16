// import React from 'react'


// import { assets } from '../assets/assets'
// import { use } from 'react'
// import { useNavigate } from 'react-router-dom'

// const Banner = () => {
//     const navigate = useNavigate()
 

//   return (
//     <div className='flex flex-col md:flex-row items-center bg-slate-600 rounded-lg px-6 sm:px-10 md:px-14 lg:px-20 py-[-4] md:py-[-2] lg:py-0 my-2 md:my-4 lg:my-6 mx-2 md:mx-8 lg:mx-18'>
//         {/* ------Left side--------- */}

//         <div className='flex-1 py-10 sm:py-12 md:py-18 lg:py-16 lg:pl-5'>
//             <div  className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
//             <p >Book Your Appointments Here...</p>
//             <p className='mt-4 text-3xl'>With 100+ Trusted Doctors !</p>

//         </div>
//         <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-800 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>Create Account</button>
//         </div>

//         {/* --------Right side------ */}

//         {/* <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
//         <img className='w-full h-auto rounded-lg' src={assets.appointment_img} alt="Appointment" />
//         </div> */}

//         <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
//             <img className='w-full h-fit rounded-lg-full right-0 ' src={assets.appointment_img} alt="" />

//         </div>
//     </div>
//   )
// }

// export default Banner



// // flex bg-slate-600 rounded-lg  px-6  sm:px-10 md:px-14 lg:px-12 my-28 md:mx-10




import React from 'react'
import { bannerData } from '../assets/assets1'
import { Link } from 'react-router-dom'

const Banner = () => {
  // Helper function to get the correct route for each banner
  const getRouteForBanner = (bannerType) => {
    switch(bannerType) {
      case 'Consultant':
        return '/doctors'; // Keep consultants in doctors page
      case 'Community Health Forum':
        return '/community-forum';
      case 'Group Therapy Session':
        return '/group-therapy';
      // case 'Medicine':
      //   return '/medicine';
      default:
        return '/';
    }
  }

  
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-slate-800' id='speciality'>
        <h1 className='text-3xl font-medium'>Contact us for Help</h1>
        <p className='sm:w-1/3 text-center text-meidum'>Here you can get help from our consultant also buy medicine and get prescribed</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {bannerData.map((item,index)=>(
                <Link 
                    onClick={()=>scrollTo(0,0)} 
                    className='flex flex-col items-center text-lg cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' 
                    key={index} 
                    to={getRouteForBanner(item.banner1)}
                >
                    <img className='w-32 h-32 sm:w-32 sm:h-32 mb-2' src={item.image} alt="" />
                    <p>{item.banner1}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Banner