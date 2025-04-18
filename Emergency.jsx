import React from 'react'

const Emergency = () => {
  const handleEmergencyClick = () => {
    alert('Emergency services will be contacted!')
  }

  const handleAnonymousClick = () => {
    alert('Anonymous help request sent!')
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[300px] p-4 gap-8">
      {/* Emergency Help Block */}
      <div className="w-[800px] h-40 bg-yellow-50 rounded-lg shadow-lg flex flex-col justify-center items-center border-2 border-yellow-500">
        <button 
          onClick={handleEmergencyClick}
          className="bg-red-400 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transform transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md"
        >
          Emergency Help?
        </button>
        <p className="mt-4 text-sm text-red-600 text-center px-4">
          Click for immediate assistance
        </p>
      </div>
  
      {/* Anonymous Help Block */}
      <div className="w-[800px] h-40 bg-blue-50 rounded-lg shadow-lg flex flex-col justify-center items-center border-2 border-blue-500">
        <button 
          onClick={handleAnonymousClick}
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transform transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md"
        >
          Anonymous Help
        </button>
        <p className="mt-4 text-sm text-blue-600 text-center px-4">
          Get help privately and confidentially
        </p>
      </div>
    </div>
  )
  
  
  
}

export default Emergency