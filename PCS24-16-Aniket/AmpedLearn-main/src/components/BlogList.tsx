
import React from 'react';

type Article = {
  author: string | null;
  content: string | null;
  description: string;
  publishedAt: string;
  source: { id: string | null; name: string };
  title: string;
  url: string;
  urlToImage: string;
};

type BlogProps = {
  data: {
    articles: Article[];
  };
};

const BlogList: React.FC<BlogProps> = ({ data }) => {
    return (
        <div className="min-h-screen p-8">
          <h1 className="text-4xl mb-10 text-center font-bold animate__animated animate__fadeIn">Latest Advancements in Programming</h1>
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {data.articles.map((article, index) => (
              <div key={index} className="bg-slate-700 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 animate__animated animate__fadeInUp">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="group">
                  <img className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105" src={article.urlToImage} alt={article.title} />
                </a>
                <h2 className="text-2xl mt-4 mb-2 font-semibold text-gray-100">{article.title}</h2>
                <p className="text-gray-400">{article.description}</p>
    
                <footer className="mt-4 flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-gray-500 font-medium">Published at:</span> {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500 font-medium">Source:</span> {article.source.name}
                  </div>
                </footer>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default BlogList;