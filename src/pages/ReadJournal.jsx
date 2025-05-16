import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const ReadJournal = () => {
  const { backendUrl } = useContext(AppContext);
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/journal/list`);
      
      if (data.success && data.journals.length > 0) {
        setJournals(data.journals);
        console.log("Journals fetched from backend:", data.journals);
      } else {
        // If no journals in database or API fails, fetch from external source
        fetchExternalJournals();
      }
    } catch (error) {
      console.log("Error fetching journals from backend:", error);
      // Fallback to external journals
      fetchExternalJournals();
    } finally {
      setLoading(false);
    }
  };

  const fetchExternalJournals = async () => {
    // This is a mock function to simulate fetching from external API
    // In a real app, you would make an API call to your backend which would then fetch from the external source
    console.log("Fetching journals from external source");
    
    // Sample data based on IJMS journals
    const externalJournals = [
      {
        _id: "ext1",
        title: "Advances in Medical Sciences: Current Perspectives",
        journal: "International Journal of Medical Sciences",
        authors: ["Dr. Sarah Johnson", "Dr. Michael Chen"],
        publishDate: "June 2023",
        impact: "4.2",
        keywords: ["Medical Science", "Healthcare", "Research"],
        abstract: "This paper provides a comprehensive overview of recent advances in medical sciences, focusing on innovative approaches to diagnosis and treatment across various specialties.",
        image: assets.journal_icon,
        externalUrl: "https://www.sciencedirect.com/journal/advances-in-medical-sciences/vol/60/issue/1"
      },
      {
        _id: "ext2",
        title: "Emerging Trends in Cardiovascular Medicine",
        journal: "International Journal of Medical Sciences",
        authors: ["Dr. Robert Williams", "Dr. Emily Zhang"],
        publishDate: "May 2023",
        impact: "4.5",
        keywords: ["Cardiology", "Heart Disease", "Treatment"],
        abstract: "This study explores the latest developments in cardiovascular medicine, including novel therapeutic approaches and diagnostic techniques for heart diseases.",
        image: assets.journal_icon,
        externalUrl: "https://www.sciencedirect.com/journal/trends-in-cardiovascular-medicine"
      },
      {
        _id: "ext3",
        title: "Innovations in Pediatric Care: A Systematic Review",
        journal: "International Journal of Medical Sciences",
        authors: ["Dr. Lisa Brown", "Dr. James Wilson"],
        publishDate: "April 2023",
        impact: "3.9",
        keywords: ["Pediatrics", "Child Health", "Healthcare"],
        abstract: "This systematic review examines recent innovations in pediatric care, highlighting evidence-based approaches to improving health outcomes for children.",
        image: assets.journal_icon,
        externalUrl: "https://iipseries.org/assets/docupload/rsl2024C8D868893AE02ED.pdf"
      },
      {
        _id: "ext4",
        title: "Advancements in Neurological Disorders Treatment",
        journal: "International Journal of Medical Sciences",
        authors: ["Dr. Thomas Lee", "Dr. Anna Martinez"],
        publishDate: "March 2023",
        impact: "4.7",
        keywords: ["Neurology", "Brain", "Treatment"],
        abstract: "This research paper discusses recent advancements in the treatment of neurological disorders, focusing on novel therapeutic approaches and their clinical outcomes.",
        image: assets.journal_icon,
        externalUrl: "https://www.narayanahealth.org/blog/cutting-edge-treatments-for-neurological-conditions-advancements-and-possibilities"
      },
      {
        _id: "ext5",
        title: "Impact of Telemedicine on Rural Healthcare Access",
        journal: "International Journal of Medical Sciences",
        authors: ["Dr. David Clark", "Dr. Susan Wright"],
        publishDate: "February 2023",
        impact: "4.1",
        keywords: ["Telemedicine", "Rural Health", "Healthcare Access"],
        abstract: "This study evaluates the impact of telemedicine interventions on healthcare access in rural communities, examining both benefits and challenges.",
        image: assets.journal_icon,
        externalUrl: "https://www.ruralhealth.us/blogs/2025/02/telehealth-s-impact-on-rural-hospitals-a-literature-review#:~:text=By%20utilizing%20telemedicine%2C%20rural%20hospitals,%2C%20%26%20Mehrotra%2C%202021)."
      },
      {
        _id: "ext6",
        title: "Advances in Oncology: Precision Medicine Approaches",
        journal: "International Journal of Medical Sciences",
        authors: ["Dr. Jennifer Adams", "Dr. Richard Taylor"],
        publishDate: "January 2023",
        impact: "5.0",
        keywords: ["Oncology", "Cancer", "Precision Medicine"],
        abstract: "This paper explores recent advances in precision medicine approaches to cancer treatment, highlighting personalized therapeutic strategies and their outcomes.",
        image: assets.journal_icon,
        externalUrl: "https://advancesinresearch.id/index.php/AHR/article/view/370"
      }
    ];
    
    setJournals(externalJournals);
  };

  const handleReadFullPaper = (journal) => {
    console.log("Handling read full paper for:", journal);
    
    // If journal has external URL, open in new tab
    if (journal.externalUrl) {
      window.open(journal.externalUrl, '_blank');
      return;
    }
    
    // Otherwise navigate to internal detail page
    navigate(`/journal-detail/${journal._id}`);
  };

  const handleLoadMore = () => {
    // Open the IJMS website in a new tab
    window.open('https://en.wikipedia.org/wiki/List_of_medical_journals', '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
        {journals.length > 0 ? (
          journals.map((journal) => (
            <div 
              key={journal._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                {/* Journal Icon/Image */}
                <div className="flex items-center justify-center bg-blue-50 rounded-xl p-4">
                  <img 
                    src={journal.image || assets.journal_icon} 
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
                    {journal.keywords && journal.keywords.map((keyword, index) => (
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
                      <p>Authors: {journal.authors ? journal.authors.join(", ") : "Unknown"}</p>
                      <p>Published: {journal.publishDate || "N/A"}</p>
                    </div>
                    <button 
                      onClick={() => handleReadFullPaper(journal)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                    >
                      Read Full Paper
                      <img src={assets.arrow_icon} alt="arrow" className="w-3 h-3 filter invert" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No journals found</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-10">
        <button 
          onClick={handleLoadMore}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300"
        >
          Load More Journals
        </button>
      </div>
    </div>
  );
};

export default ReadJournal;
