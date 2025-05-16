import React from 'react'

const GroupTherapy = () => {
  const sessions = [
    {
      id: 1,
      title: "Anxiety Support Group",
      time: "10:00 AM - 11:30 AM",
      date: "Every Monday",
      participants: "8-10",
      therapist: "Dr. Sarah Johnson"
    },
    {
      id: 2,
      title: "Depression Management",
      time: "2:00 PM - 3:30 PM",
      date: "Every Wednesday",
      participants: "6-8",
      therapist: "Dr. Michael Chen"
    },
    {
      id: 3,
      title: "Stress Relief Workshop",
      time: "5:00 PM - 6:30 PM",
      date: "Every Friday",
      participants: "10-12",
      therapist: "Dr. Emily Parker"
    }
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-medium text-gray-800 mb-6">Group Therapy Sessions</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <div 
            key={session.id} 
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-medium text-gray-800 mb-3">{session.title}</h2>
            <div className="space-y-2 text-gray-600">
              <p>🕒 Time: {session.time}</p>
              <p>📅 Date: {session.date}</p>
              <p>👥 Participants: {session.participants}</p>
              <p>👨‍⚕️ Therapist: {session.therapist}</p>
            </div>
            <button 
              className="mt-4 w-full bg-slate-700 text-white py-2 rounded-full hover:bg-slate-800 transition-colors"
            >
              Join Session
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-medium text-gray-800 mb-3">About Group Therapy</h2>
        <p className="text-gray-600">
          Group therapy provides a supportive environment where individuals can share experiences, 
          learn from others, and develop coping strategies together. Our sessions are led by 
          experienced therapists and maintain a safe, confidential space for all participants.
        </p>
      </div>
    </div>
  )
}

export default GroupTherapy