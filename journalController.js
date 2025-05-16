import Journal from '../models/journalModel.js';
import axios from 'axios';

// Get all journals
export const journalList = async (req, res) => {
  try {
    const journals = await Journal.find({ type: 'journal' });
    
    // If we have journals in our database, return them
    if (journals && journals.length > 0) {
      return res.json({ success: true, journals });
    }
    
    // If no journals in database, try to fetch from external source
    try {
      // This would be your implementation to fetch from external API
      // For example, using axios to fetch from IJMS or similar source
      // const externalData = await fetchExternalJournals();
      // return res.json({ success: true, journals: externalData });
      
      // For now, just return empty array since frontend will handle fallback
      return res.json({ success: true, journals: [] });
    } catch (externalError) {
      console.log("Error fetching external journals:", externalError);
      return res.json({ success: false, message: "Failed to fetch journals", error: externalError.message });
    }
  } catch (error) {
    console.log("Database error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Helper function to fetch from external source (implementation would depend on the API)
const fetchExternalJournals = async () => {
  // This is a placeholder. In a real implementation, you would:
  // 1. Make an API call to the external journal source
  // 2. Parse the response
  // 3. Transform it to match your data model
  // 4. Return the formatted data
  
  // Example (not functional as IJMS doesn't have a public API):
  // const response = await axios.get('https://api.example.com/journals');
  // return response.data.map(item => ({
  //   _id: item.id,
  //   title: item.title,
  //   journal: "International Journal of Medical Sciences",
  //   authors: item.authors.split(','),
  //   publishDate: item.date,
  //   impact: item.impactFactor,
  //   keywords: item.keywords.split(','),
  //   abstract: item.abstract,
  //   externalUrl: item.url
  // }));
  
  throw new Error("External journal fetching not implemented");
};

// Get all articles
export const articleList = async (req, res) => {
  try {
    const articles = await Journal.find({ type: 'article' });
    
    // If we have articles in our database, return them
    if (articles && articles.length > 0) {
      return res.json({ success: true, articles });
    }
    
    // If no articles in database, try to fetch from external source
    try {
      // This would be your implementation to fetch from external API
      // For example, using axios to fetch from Taylor & Francis or similar source
      // const externalData = await fetchExternalArticles();
      // return res.json({ success: true, articles: externalData });
      
      // For now, just return empty array since frontend will handle fallback
      return res.json({ success: true, articles: [] });
    } catch (externalError) {
      console.log("Error fetching external articles:", externalError);
      return res.json({ success: false, message: "Failed to fetch articles", error: externalError.message });
    }
  } catch (error) {
    console.log("Database error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Helper function to fetch articles from external source (implementation would depend on the API)
const fetchExternalArticles = async () => {
  // This is a placeholder. In a real implementation, you would:
  // 1. Make an API call to the external article source
  // 2. Parse the response
  // 3. Transform it to match your data model
  // 4. Return the formatted data
  
  throw new Error("External article fetching not implemented");
};

// Get all studies
export const studyList = async (req, res) => {
  try {
    const studies = await Journal.find({ type: 'study' });
    res.json({ success: true, studies });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get journal detail by ID
export const getJournalDetail = async (req, res) => {
  try {
    console.log("Fetching journal with ID:", req.params.id);
    const journal = await Journal.findById(req.params.id);
    
    if (!journal) {
      console.log("Journal not found");
      return res.json({ success: false, message: 'Journal not found' });
    }
    
    console.log("Journal found:", journal.title);
    res.json({ success: true, journal });
  } catch (error) {
    console.error("Error in getJournalDetail:", error);
    res.json({ success: false, message: error.message });
  }
};
