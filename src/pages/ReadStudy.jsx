import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const ReadStudy = () => {
  const { backendUrl } = useContext(AppContext);
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/journal/studies`);
      
      if (data.success && data.studies.length > 0) {
        setStudies(data.studies);
        console.log("Studies fetched from backend:", data.studies);
      } else {
        // If no studies in database or API fails, fetch from external source
        fetchExternalStudies();
      }
    } catch (error) {
      console.log("Error fetching studies from backend:", error);
      // Fallback to external studies
      fetchExternalStudies();
    } finally {
      setLoading(false);
    }
  };

  const fetchExternalStudies = async () => {
    // This is a mock function to simulate fetching from external API
    console.log("Fetching studies from external source");
    
    // Sample data based on clinical studies
    const externalStudies = [
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
        ],
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/17437199.2022.2052740"
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
        ],
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/07315724.2021.1962483"
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
        ],
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/15402002.2020.1845666"
      },
      {
        id: 4,
        title: "Novel Treatments for Chronic Pain",
        institution: "University of California Pain Center",
        status: "Recruiting",
        phase: "Phase 2",
        participants: 450,
        leadResearcher: "Dr. Michael Rodriguez",
        startDate: "May 2024",
        endDate: "April 2025",
        category: "Pain Management",
        description: "Investigating non-opioid approaches to chronic pain management including nerve stimulation and mindfulness techniques.",
        objectives: [
          "Evaluate pain reduction efficacy",
          "Measure quality of life improvements",
          "Assess long-term sustainability"
        ],
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/24740527.2021.1905209"
      },
      {
        id: 5,
        title: "Immunotherapy Response in Cancer Patients",
        institution: "Memorial Sloan Kettering Cancer Center",
        status: "Ongoing",
        phase: "Phase 3",
        participants: 620,
        leadResearcher: "Dr. Elizabeth Taylor",
        startDate: "October 2023",
        endDate: "September 2025",
        category: "Oncology",
        description: "Examining factors that influence patient response to immunotherapy treatments across different cancer types.",
        objectives: [
          "Identify biomarkers for treatment response",
          "Compare efficacy across cancer types",
          "Develop personalized treatment protocols"
        ],
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/2162402X.2020.1792167"
      },
      {
        id: 6,
        title: "Telehealth Effectiveness in Rural Communities",
        institution: "Rural Health Research Institute",
        status: "Completed",
        phase: "Phase 4",
        participants: 850,
        leadResearcher: "Dr. Robert Johnson",
        startDate: "January 2023",
        endDate: "December 2023",
        category: "Healthcare Access",
        description: "Evaluating the impact of telehealth services on healthcare access and outcomes in underserved rural communities.",
        objectives: [
          "Measure healthcare utilization changes",
          "Assess patient satisfaction",
          "Evaluate health outcome improvements"
        ],
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/10410236.2020.1859723"
      }
    ];
    
    setStudies(externalStudies);
  };

  const handleViewFullStudy = (study) => {
    console.log("Opening full study details for:", study);
    // Open the study URL in a new tab
    if (study.externalUrl) {
      window.open(study.externalUrl, '_blank');
    }
  };

  const handleLoadMore = () => {
    // Open the Taylor & Francis clinical trials page in a new tab
    window.open('https://www.tandfonline.com/topic/medicine/clinical-trials', '_blank');
  };

  const filteredStudies = studies.filter(study => {
    const matchesSearch = searchTerm === '' || 
                          study.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          study.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || study.category === selectedCategory;
    const matchesStatus = selectedStatus === '' || study.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">All Categories</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Pain Management">Pain Management</option>
          <option value="Oncology">Oncology</option>
          <option value="Healthcare Access">Healthcare Access</option>
        </select>
        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">Study Status</option>
          <option value="Recruiting">Recruiting</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Studies Grid */}
      <div className="space-y-6">
        {filteredStudies.length > 0 ? (
          filteredStudies.map((study) => (
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
                  <button 
                    onClick={() => handleViewFullStudy(study)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    View Full Study Details
                    <img src={assets.arrow_icon} alt="arrow" className="w-3 h-3 filter invert" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No studies found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-10">
        <button 
          onClick={handleLoadMore}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300"
        >
          Load More Studies
        </button>
      </div>
    </div>
  );
};

export default ReadStudy;
