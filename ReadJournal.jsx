import React from 'react';
import { assets } from '../assets/assets';

const ReadJournal = () => {
  // Sample journal data - in a real app, this would come from an API
  const journals = [
    {
      id: 1,
      title: "Latest Advances in Cardiology",
      journal: "International Journal of Cardiology",
      authors: ["Dr. Robert Smith", "Dr. Maria Garcia"],
      publishDate: "March 2024",
      impact: "4.8",
      keywords: ["Cardiology", "Heart Disease", "Treatment"],
      abstract: "This study explores innovative approaches to treating cardiovascular diseases using new therapeutic methods and advanced technology.",
      image: assets.journal_icon
    },
    {
      id: 2,
      title: "Neuroscience Breakthroughs in 2024",
      journal: "Neurology Research International",
      authors: ["Dr. James Wilson", "Dr. Sarah Chen"],
      publishDate: "February 2024",
      impact: "5.2",
      keywords: ["Neuroscience", "Brain", "Research"],
      abstract: "A comprehensive review of major discoveries in neuroscience, focusing on neural plasticity and cognitive enhancement techniques.",
      image: assets.journal_icon
    },
    {
      id: 3,
      title: "Pediatric Care: New Perspectives",
      journal: "Journal of Pediatric Medicine",
      authors: ["Dr. Emily Brooks"],
      publishDate: "March 2024",
      impact: "3.9",
      keywords: ["Pediatrics", "Child Health", "Care"],
      abstract: "Examining modern approaches to pediatric care, including preventive measures and treatment strategies for common childhood conditions.",
      image: assets.journal_icon
    }
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Medical Research Journals</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-center">
          Access the latest peer-reviewed medical research and scientific publications
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search journals..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Sort by Date</option>
          <option value="impact">Sort by Impact Factor</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      {/* Journals Grid */}
      <div className="space-y-6">
        {journals.map((journal) => (
          <div 
            key={journal.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
              {/* Journal Icon/Image */}
              <div className="flex items-center justify-center bg-blue-50 rounded-xl p-4">
                <img 
                  src={journal.image} 
                  alt={journal.title}
                  className="w-24 h-24 object-contain"
                />
              </div>

              {/* Journal Content */}
              <div className="flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">{journal.title}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    IF: {journal.impact}
                  </span>
                </div>

                <p className="text-blue-600 font-medium mb-2">{journal.journal}</p>
                
                <p className="text-gray-600 text-sm mb-4">{journal.abstract}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {journal.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    <p>Authors: {journal.authors.join(", ")}</p>
                    <p>Published: {journal.publishDate}</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                    Read Full Paper
                    <img src={assets.arrow_icon} alt="arrow" className="w-3 h-3 filter invert" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-10">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300">
          Load More Journals
        </button>
      </div>
    </div>
  );
};

export default ReadJournal;
