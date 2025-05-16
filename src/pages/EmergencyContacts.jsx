import React from 'react'

const EmergencyContacts = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Help notification banner */}
      <div className="bg-pink-100 p-4 mb-8 rounded-lg">
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-600">
            <span className="font-semibold">Help is on the way.</span> A mental health professional has been notified and will contact you shortly.
          </p>
        </div>
      </div>

      {/* Main heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Emergency Contacts</h1>

      {/* Contact buttons */}
      <div className="space-y-4 mb-8">
        {/* Emergency Services */}
        <a href="tel:911" className="block">
          <div className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg flex items-center gap-4">
            <div className="bg-red-500 p-2 rounded-full">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Call 911</h2>
              <p className="text-white/80">Emergency Services</p>
            </div>
          </div>
        </a>

        {/* Crisis Text Line */}
        <div className="bg-blue-600 text-white p-4 rounded-lg">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-blue-500 p-2 rounded-full">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Text HOME to 741741</h2>
              <p className="text-white/80">Crisis Text Line</p>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Chat Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Crisis Chat </h2>
        <h1 className="text-medium font-bold text-gray-800 mb-4">  - it will redirect you to video chat</h1>
        <button 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors duration-200"
          onClick={() => window.open('https://meet.google.com/bpn-pywx-ywi', '_blank')}
        >
          Start Live Session with Counselor
        </button>
        <p className="text-gray-600 mt-2">
          Connect with a trained crisis counselor who can provide immediate support.
        </p>
      </div>

      {/* Grounding Exercise Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Grounding Exercise</h2>
        
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">Breathing Exercise</h3>
          <p className="text-gray-600">
            Follow along with this exercise to help calm your breathing
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <ol className="list-decimal list-inside space-y-2">
            <li>Find a comfortable position and close your eyes</li>
            <li>Take a slow, deep breath in through your nose (count to 4)</li>
            <li>Hold your breath (count to 4)</li>
            <li>Slowly exhale through your mouth (count to 4)</li>
            <li>Repeat this cycle 4 times</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default EmergencyContacts
