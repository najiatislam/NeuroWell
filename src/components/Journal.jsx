import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Journal = () => {
  const navigate = useNavigate();

  const handleReadMore = (type) => {
    console.log('Navigating to:', type);
    switch(type) {
      case 'journal':
        navigate('/read-journal');
        break;
      case 'article':
        navigate('/read-article');
        break;
      case 'study':
        navigate('/read-study');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className='flex flex-col bg-yellow-300 rounded-lg px-6 md:px-10 lg:px-20 py-10 md:py-16'>
      {/* Section Header */}
      <div className='flex flex-col items-center text-center mb-10 md:mb-16'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Journals & <br className='hidden md:block'/> Medical News
        </h2>
        <p className='text-white text-sm font-light mt-4 max-w-md'>
          Stay updated with the latest research and healthcare developments
        </p>
      </div>

      {/* Content Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Journal Card 1 */}
        <div className='bg-white rounded-xl p-6 flex flex-col hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center gap-3 mb-4'>
            <img className='w-10 h-10' src={assets.journal_icon} alt="Journal" />
            <span className='text-xs font-medium text-gray-500'>RESEARCH JOURNAL</span>
          </div>
          <h3 className='text-xl font-semibold text-gray-800 mb-3'>
            Latest Advances in Cardiology
          </h3>
          <p className='text-gray-600 text-sm mb-6'>
            Exploring innovative treatments for heart diseases and patient care methodologies.
          </p>
          <button 
            onClick={() => handleReadMore('journal')}
            className='flex items-center gap-2 text-yellow-600 text-sm font-medium mt-auto hover:text-yellow-700'
          >
            Read Journal <img className='w-3' src={assets.arrow_icon} alt="" />
          </button>
        </div>

        {/* News Card 2 */}
        <div className='bg-white rounded-xl p-6 flex flex-col hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center gap-3 mb-4'>
            <img className='w-10 h-10' src={assets.news_icon} alt="News" />
            <span className='text-xs font-medium text-gray-500'>MEDICAL NEWS</span>
          </div>
          <h3 className='text-xl font-semibold text-gray-800 mb-3'>
            Hospital Wins Innovation Award
          </h3>
          <p className='text-gray-600 text-sm mb-6'>
            Recognized for groundbreaking work in patient care and medical technology.
          </p>
          <button 
            onClick={() => handleReadMore('article')}
            className='flex items-center gap-2 text-yellow-600 text-sm font-medium mt-auto hover:text-yellow-700'
          >
            Read Article <img className='w-3' src={assets.arrow_icon} alt="" />
          </button>
        </div>

        {/* Journal Card 3 */}
        <div className='bg-white rounded-xl p-6 flex flex-col hover:shadow-lg transition-all duration-300'>
          <div className='flex items-center gap-3 mb-4'>
            <img className='w-10 h-10' src={assets.journal_icon} alt="Journal" />
            <span className='text-xs font-medium text-gray-500'>CLINICAL STUDY</span>
          </div>
          <h3 className='text-xl font-semibold text-gray-800 mb-3'>
            Pediatric Care Innovations
          </h3>
          <p className='text-gray-600 text-sm mb-6'>
            New findings in child healthcare and developmental medicine practices.
          </p>
          <button 
            onClick={() => handleReadMore('study')}
            className='flex items-center gap-2 text-yellow-600 text-sm font-medium mt-auto hover:text-yellow-700'
          >
            Read Study <img className='w-3' src={assets.arrow_icon} alt="" />
          </button>
        </div>
      </div>

      {/* Welcome Footer */}
      <div className='flex flex-col items-center text-center mt-12 md:mt-16'>
        <div className='flex items-center gap-3 text-white text-sm font-light mb-4'>
          <img className='w-28' src={assets.arrow_icon} alt="" />
          <p>You are welcome, please explore our resources</p>
        </div>
        <button 
          onClick={() => handleReadMore('journal')}
          className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300'
        >
          View All Journals <img className='w-3' src={assets.arrow_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Journal;
