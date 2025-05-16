import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const JournalDetail = () => {
  const { id } = useParams();
  const { backendUrl } = useContext(AppContext);
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJournalDetail();
  }, [id]);

  const fetchJournalDetail = async () => {
    try {
      setLoading(true);
      console.log("Fetching journal with ID:", id);
      const { data } = await axios.get(`${backendUrl}/api/journal/detail/${id}`);
      console.log("API response:", data);
      
      if (data.success) {
        setJournal(data.journal);
      } else {
        toast.error(data.message || "Failed to fetch journal details");
      }
    } catch (error) {
      console.error("Error fetching journal:", error);
      toast.error(error.message || "An error occurred while fetching journal details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Journal not found</h2>
        <button 
          onClick={() => navigate('/read-journal')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Back to Journals
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate('/read-journal')}
        className="flex items-center gap-2 text-blue-600 mb-6 hover:underline"
      >
        <img 
          src={assets.arrow_icon} 
          alt="back" 
          className="w-3 h-3 transform rotate-180" 
        />
        Back to Journals
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={journal.image || assets.journal_icon} 
            alt={journal.title}
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{journal.title}</h1>
            <p className="text-blue-600">{journal.journal}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {journal.impact && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Impact Factor: {journal.impact}
            </span>
          )}
          {journal.publishDate && (
            <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded">
              Published: {journal.publishDate}
            </span>
          )}
        </div>
        
        {journal.authors && (
          <p className="text-sm text-gray-600 mb-4">
            Authors: {journal.authors.join(", ")}
          </p>
        )}
        
        {journal.keywords && journal.keywords.length > 0 && (
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
        )}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Abstract</h2>
        <p className="text-gray-700 mb-6">{journal.abstract}</p>
        
        {journal.content && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Full Text</h2>
            <div className="prose max-w-none">
              {journal.content}
            </div>
          </>
        )}
        
        <div className="flex flex-wrap gap-4 mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            Download PDF
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
          
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            Cite This Paper
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalDetail;
