import React from 'react';
import { assets } from '../assets/assets';

const ReadArticle = () => {
  // Sample article data - in a real app, this would come from an API or props
  const articles = [
    {
      id: 1,
      title: "Hospital Wins Innovation Award",
      category: "Healthcare Innovation",
      author: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: assets.news_icon,
      preview: "Recognized for groundbreaking work in patient care and medical technology implementation across multiple departments."
    },
    {
      id: 2,
      title: "New Treatment Methods in Oncology",
      category: "Medical Research",
      author: "Dr. Michael Chen",
      date: "March 14, 2024",
      readTime: "8 min read",
      image: assets.news_icon,
      preview: "Revolutionary approach to cancer treatment showing promising results in early clinical trials."
    },
    {
      id: 3,
      title: "Mental Health in the Digital Age",
      category: "Mental Health",
      author: "Dr. Emily Brooks",
      date: "March 13, 2024",
      readTime: "6 min read",
      image: assets.news_icon,
      preview: "Understanding the impact of technology on mental health and modern therapeutic approaches."
    },
    {
      id: 4,
      title: "Advances in Telemedicine",
      category: "Digital Healthcare",
      author: "Dr. James Wilson",
      date: "March 12, 2024",
      readTime: "7 min read",
      image: assets.news_icon,
      preview: "How virtual healthcare is transforming patient care and medical accessibility."
    }
  ];

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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>
        <select className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
          <option value="">All Categories</option>
          <option value="healthcare">Healthcare Innovation</option>
          <option value="research">Medical Research</option>
          <option value="mental-health">Mental Health</option>
          <option value="digital">Digital Healthcare</option>
        </select>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
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
                <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center gap-1">
                  Read More
                  <img src={assets.arrow_icon} alt="arrow" className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-10">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-3 rounded-full transition-colors duration-300">
          Load More Articles
        </button>
      </div>
    </div>
  );
};

export default ReadArticle;
