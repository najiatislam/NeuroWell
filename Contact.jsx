import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-600'>
        <p>CONTACT<span className='text-gray-700 font-semibold'> US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6 '>
          <p className='font-semibold text-lg text-gray-700'>OUR OFFICE</p>
          <p className='text-gray-600'>Kha 224 Bir Uttam Rafiqul Islam Avenue, <br/> Merul Badda, Dhaka, 1212, Bangladesh</p>
          <p className='text-gray-600'>Tel: (+880) 1755021783 <br/> Email: zenify22@gmail.com</p>
          <p className='font-semibold text-lg text-gray-700'>Careers @ ZENIFY Care </p>
          <p className='text-gray-600'> Learn more about our terms and job openings.</p>
          <button className='border border-teal-700 px-8 py-4 text-sm hover:bg-slate-600 hover:text-white transition-all duration-500'>Explor Jobs</button>
        </div>
      </div>
        
    </div>
  )
}

export default Contact