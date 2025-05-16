import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const ReadArticle = () => {
  const { backendUrl } = useContext(AppContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/journal/articles`);
      
      if (data.success && data.articles.length > 0) {
        setArticles(data.articles);
        console.log("Articles fetched from backend:", data.articles);
      } else {
        // If no articles in database or API fails, fetch from external source
        fetchExternalArticles();
      }
    } catch (error) {
      console.log("Error fetching articles from backend:", error);
      // Fallback to external articles
      fetchExternalArticles();
    } finally {
      setLoading(false);
    }
  };

  const fetchExternalArticles = async () => {
    // This is a mock function to simulate fetching from external API
    console.log("Fetching articles from external source");
    
    // Sample data based on medical news articles
    const externalArticles = [
      {
        id: 1,
        title: "Hospital Wins Innovation Award",
        category: "Healthcare Innovation",
        author: "Dr. Sarah Johnson",
        date: "March 15, 2024",
        readTime: "5 min read",
        image: assets.news_icon,
        preview: "Recognized for groundbreaking work in patient care and medical technology implementation across multiple departments.",
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/13561820.2020.1713064"
      },
      {
        id: 2,
        title: "New Treatment Methods in Oncology",
        category: "Medical Research",
        author: "Dr. Michael Chen",
        date: "March 14, 2024",
        readTime: "8 min read",
        image: assets.news_icon,
        preview: "Revolutionary approach to cancer treatment showing promising results in early clinical trials.",
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/02841860902779915"
      },
      {
        id: 3,
        title: "Mental Health in the Digital Age",
        category: "Mental Health",
        author: "Dr. Emily Brooks",
        date: "March 13, 2024",
        readTime: "6 min read",
        image: assets.news_icon,
        preview: "Understanding the impact of technology on mental health and modern therapeutic approaches.",
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/09638237.2021.1922642"
      },
      {
        id: 4,
        title: "Advances in Telemedicine",
        category: "Digital Healthcare",
        author: "Dr. James Wilson",
        date: "March 12, 2024",
        readTime: "7 min read",
        image: assets.news_icon,
        preview: "How virtual healthcare is transforming patient care and medical accessibility.",
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/17538157.2020.1755974"
      },
      {
        id: 5,
        title: "Breakthrough in Alzheimer's Research",
        category: "Neurology",
        author: "Dr. Robert Thompson",
        date: "March 10, 2024",
        readTime: "9 min read",
        image: assets.news_icon,
        preview: "New study reveals promising biomarkers for early detection of Alzheimer's disease, potentially enabling earlier intervention.",
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/13854046.2020.1711967"
      },
      {
        id: 6,
        title: "Pediatric Care Innovations",
        category: "Pediatrics",
        author: "Dr. Lisa Chen",
        date: "March 8, 2024",
        readTime: "6 min read",
        image: assets.news_icon,
        preview: "New approaches to pediatric care focusing on holistic treatment methods and family-centered practices.",
        externalUrl: "https://www.tandfonline.com/doi/full/10.1080/09593985.2020.1720946"
      }
    ];
    
    setArticles(externalArticles);
  };

  const handleReadMore = (article) => {
    console.log("Opening article:", article);
    // Open the article URL in a new tab
    if (article.externalUrl) {
      window.open(article.externalUrl, '_blank');
    }
  };

  const handleLoadMore = () => {
    // Open the Taylor & Francis Online website in a new tab
    window.open('https://www.tandfonline.com/topic/allsubjects/me', '_blank');
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Medical Articles & News</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay informed with the latest medical news, breakthrough research, and healthcare innovations
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">All Categories</option>
          <option value="Healthcare Innovation">Healthcare Innovation</option>
          <option value="Medical Research">Medical Research</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Digital Healthcare">Digital Healthcare</option>
          <option value="Neurology">Neurology</option>
          <option value="Pediatrics">Pediatrics</option>
        </select>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div 
              key={article.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Article Image */}
              <div className="h-48 bg-yellow-50 flex items-center justify-center">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-20 h-20 object-cover"
                />
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm">{article.readTime}</span>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {article.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4">
                  {article.preview}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{article.author}</p>
                    <p className="text-gray-500">{article.date}</p>
                  </div>
                  <button 
                    onClick={() => handleReadMore(article)}
                    className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center gap-1"
                  >
                    Read More
                    <img src={assets.arrow_icon} alt="arrow" className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500">No articles found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-10">
        <button 
          onClick={handleLoadMore}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300"
        >
          Load More Articles
        </button>
      </div>
    </div>
  );
};

export default ReadArticle;
