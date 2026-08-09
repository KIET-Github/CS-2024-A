import { useState, useEffect } from "react";
import axios from "axios";
import BlogList from "./BlogList";
import React from "react";

const apiKey = "bdfad0aa6d2d4780b19979fada23eef9";

// Topics you're interested in
const topics = ["C++", "ReactJS", "Node", "MongoDB", "Django", "web development", "ML", "AI"];

const Blog = () => {
  const [articles, setArticles] = useState([]);

  const getData = async (topic: string) => {
    try {
      const url = `https://newsapi.org/v2/everything?q=${topic}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
      const response = await axios.get(url);
      // Combining articles for different topics
      setArticles(response.data.articles);
    } catch (error) {
      console.error(`Error fetching articles for ${topic}:`, error);
    }
  };

  useEffect(() => {
    // Fetching articles for each topic
    topics.forEach(topic => getData(topic));
  }, []);

  return (
    <div>
        <BlogList data={{ articles: articles }} />
    </div>
  );
}

export default Blog;
