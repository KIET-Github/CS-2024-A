import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YOUTUBE_SEARCH_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';
const YOUTUBE_API_KEY = 'AIzaSyDBsbm6xig8tz7xv9VHKNuaVoVDnbtRvi0'; // Replace with your actual API key

const topics = ["JavaScript", "Python", "Java", "C++", "React", "Vue", "Angular", "Ruby", "Go", "Rust"];
const orderOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "viewCount", label: "Most Viewed" },
    { value: "rating", label: "Highest Rated" },
    { value: "date", label: "Newest" },
    { value: "title", label: "Title" },
    { value: "videoCount", label: "Most Videos" },
    { value: "commentCount", label: "Most Comments" }
];

const Videos: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState<string>(topics[0]);
    const [order, setOrder] = useState<string>('relevance');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        handleSearch(selectedTopic, order);
    }, [selectedTopic, order]);

    const handleSearch = async (searchTopic: string, orderType: string) => {
        setLoading(true);
        try {
            const response = await axios.get(YOUTUBE_SEARCH_ENDPOINT, {
                params: {
                    part: 'snippet',
                    maxResults: 10,
                    order: orderType,
                    key: YOUTUBE_API_KEY,
                    q: searchTopic  // search based on the topic
                }
            });
            setResults(response.data.items);
        } catch (error) {
            console.error("Error fetching search results", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 min-h-screen">
            <div className='my-10 font-bold text-gray-700 text-5xl'>Trending Videos</div>
            <div className="mb-5 flex justify-between">
                <div className="w-1/2 pr-2">
                    <label htmlFor="topicSelector" className="block text-gray-700 font-bold mb-2">Select a topic:</label>
                    <select
                id="topicSelector"
                className="w-full p-2 rounded border bg-white text-black"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
            >
                {topics.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
                </div>
                <div className="w-1/2 pl-2">
                    <label htmlFor="orderSelector" className="block text-gray-700 font-bold mb-2">Sort by:</label>
                    <select
                        id="orderSelector"
                        className="w-full p-2 rounded border bg-white text-black"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        {orderOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                </div>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {results.map((result, idx) => (
                        <li key={idx} className="mb-6 bg-white p-4 rounded shadow-md">
                            <div className="flex">
                                <div className="flex-1 pr-4">
                                    <h3 className="text-xl font-semibold mb-2">
                                        <a href={`https://www.youtube.com/watch?v=${result.id.videoId}`} target="_blank" rel="noopener noreferrer">{result.snippet.title}</a>
                                    </h3>
                                    <p className="text-gray-700">{result.snippet.description}</p>
                                </div>
                                <div>
                                    <a href={`https://www.youtube.com/watch?v=${result.id.videoId}`} target="_blank" rel="noopener noreferrer">
                                        <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} className="rounded shadow-lg" />
                                    </a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Videos;
