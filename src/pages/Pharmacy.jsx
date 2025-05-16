import React from 'react';
import { NavLink } from 'react-router-dom';

const Pharmacy = () => {
  return (
    <div className='p-10'>
      <div className='text-center text-2xl pt-10 text-gray-600'>
        <p>PHARMACY<span className='text-gray-700 font-semibold'> OPTIONS</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <div className='flex flex-col justify-center items-start gap-6'>
          <NavLink to='/pharmacy/local'>
            <button className='border border-teal-700 px-8 py-4 text-sm hover:bg-slate-600 hover:text-white transition-all duration-500'>
              Local Pharmacy
            </button>
          </NavLink>
          <NavLink to='/pharmacy/global'>
            <button className='border border-teal-700 px-8 py-4 text-sm hover:bg-slate-600 hover:text-white transition-all duration-500'>
              Global Pharmacy
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;