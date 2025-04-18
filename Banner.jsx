import React from 'react'
import { bannerData } from '../assets/assets'
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
      case 'Medicine':
        return '/medicine';
      default:
        return '/';
    }
  }

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-slate-800' id='speciality'>
        <h1 className='text-3xl font-medium'>Contact for Help</h1>
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