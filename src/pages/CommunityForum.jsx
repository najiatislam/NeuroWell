import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CommunityForum = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All Posts')
  
  // Store the original posts data in a constant
  const initialPosts = [
    {
      id: 1,
      title: "How to manage anxiety during work?",
      author: "Sarah M.",
      date: "2 hours ago",
      replies: 12,
      category: "Mental Health",
      preview: "I've been struggling with anxiety at work lately. What are some coping strategies that have worked for you?"
    },
    {
      id: 2,
      title: "Tips for better sleep hygiene",
      author: "Michael R.",
      date: "5 hours ago",
      replies: 8,
      category: "Wellness",
      preview: "Looking for advice on improving sleep quality. What changes have you made to your routine that helped?"
    },
    {
      id: 3,
      title: "Dealing with seasonal depression",
      author: "Emily K.",
      date: "1 day ago",
      replies: 15,
      category: "Mental Health",
      preview: "As winter approaches, I'm starting to feel the effects of seasonal depression. Any suggestions?"
    },
    {
      id: 4,
      title: "Meditation techniques for beginners",
      author: "David L.",
      date: "2 days ago",
      replies: 20,
      category: "Wellness",
      preview: "I want to start meditation but feeling overwhelmed. Can someone share some beginner-friendly techniques?"
    }
  ]

  const [displayedPosts, setDisplayedPosts] = useState(initialPosts)
  const categories = ['All Posts', 'Mental Health', 'Wellness', 'Support', 'Questions']

  const handleCreatePost = () => {
    navigate('/community-forum/create')
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    
    if (category === 'All Posts') {
      setDisplayedPosts(initialPosts)
    } else {
      const filteredPosts = initialPosts.filter(post => post.category === category)
      setDisplayedPosts(filteredPosts)
    }
  }

  const handlePostClick = (postId) => {
    navigate(`/community-forum/post/${postId}`)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-medium text-gray-800">Community Health Forum</h1>
        <button 
          onClick={handleCreatePost}
          className="bg-slate-700 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors"
        >
          Create New Post
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button 
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-1 rounded-full transition-colors whitespace-nowrap ${
              selectedCategory === category 
                ? 'bg-slate-700 text-white' 
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {displayedPosts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No posts found in this category
          </div>
        ) : (
          displayedPosts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => handlePostClick(post.id)}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-medium text-gray-800 hover:text-slate-700">
                  {post.title}
                </h2>
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(post.category);
                  }}
                  className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-slate-200"
                >
                  {post.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{post.preview}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>Posted by {post.author}</span>
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💬 {post.replies} replies</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Community Guidelines */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-medium text-gray-800 mb-3">Community Guidelines</h2>
        <p className="text-gray-600">
          Welcome to our supportive community! Please remember to be respectful, maintain confidentiality, 
          and avoid giving medical advice. This is a safe space for sharing experiences and supporting one another.
        </p>
      </div>
    </div>
  )
}

export default CommunityForum
