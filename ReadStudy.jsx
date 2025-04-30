import React from 'react';
import { assets } from '../assets/assets';

const ReadStudy = () => {
  // Sample studies data - in a real app, this would come from an API
  const studies = [
    {
      id: 1,
      title: "Effects of Exercise on Mental Health",
      institution: "Stanford Medical Research Center",
      status: "Ongoing",
      phase: "Phase 3",
      participants: 500,
      leadResearcher: "Dr. Amanda Chen",
      startDate: "January 2024",
      endDate: "December 2024",
      category: "Mental Health",
      description: "A comprehensive study examining the impact of regular physical exercise on mental health outcomes, focusing on anxiety and depression.",
      objectives: [
        "Measure impact of exercise on anxiety levels",
        "Evaluate depression symptom changes",
        "Assess long-term mental health benefits"
      ]
    },
    {
      id: 2,
      title: "Diabetes Management Through Diet",
      institution: "Mayo Clinic",
      status: "Completed",
      phase: "Phase 4",
      participants: 750,
      leadResearcher: "Dr. James Wilson",
      startDate: "March 2023",
      endDate: "February 2024",
      category: "Nutrition",
      description: "Investigation into the effectiveness of specialized dietary interventions in managing Type 2 Diabetes without medication.",
      objectives: [
        "Evaluate blood sugar control",
        "Monitor weight management",
        "Assess quality of life improvements"
      ]
    },
    {
      id: 3,
      title: "Sleep Patterns in Adolescents",
      institution: "Children's Research Hospital",
      status: "Recruiting",
      phase: "Phase 2",
      participants: 300,
      leadResearcher: "Dr. Sarah Brooks",
      startDate: "April 2024",
      endDate: "March 2025",
      category: "Pediatrics",
      description: "Research study focusing on the impact of digital device usage on sleep patterns among teenagers aged 13-18.",
      objectives: [
        "Analyze sleep quality metrics",
        "Study device usage patterns",
        "Evaluate cognitive performance"
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Clinical Studies & Research</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-center">
          Explore ongoing and completed clinical studies advancing medical knowledge
        </p>
      </div>

      {/* Filters Section */}
      <div className="mb-8 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search studies..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">
          <option value="">All Categories</option>
          <option value="mental-health">Mental Health</option>
          <option value="nutrition">Nutrition</option>
          <option value="pediatrics">Pediatrics</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400">
          <option value="">Study Status</option>
          <option value="recruiting">Recruiting</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Studies Grid */}
      <div className="space-y-6">
        {studies.map((study) => (
          <div 
            key={study.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{study.title}</h2>
                  <p className="text-green-600 font-medium">{study.institution}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${study.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                      study.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {study.status}
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {study.phase}
                  </span>
                </div>
              </div>

              {/* Study Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600 text-sm mb-4">{study.description}</p>
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-800">Key Objectives:</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 pl-2">
                      {study.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Study Information</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-gray-600">Lead Researcher:</span>
                      <span className="font-medium">{study.leadResearcher}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-medium">{study.participants}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium">{study.startDate}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">End Date:</span>
                      <span className="font-medium">{study.endDate}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{study.category}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                  View Full Study Details
                  <img src={assets.arrow_icon} alt="arrow" className="w-3 h-3 filter invert" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-10">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300">
          Load More Studies
        </button>
      </div>
    </div>
  );
};

export default ReadStudy;
