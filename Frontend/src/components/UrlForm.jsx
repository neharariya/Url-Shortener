import React, { useState } from "react";
import axios from "axios";
import {createShortUrl} from "../api/shortUrl.api.js";

const UrlForm = () => {
     const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);

    try {
    const shortUrl = await createShortUrl(url);

    // Backend returns the full shortened URL as a plain string
    setShortUrl(shortUrl);
    console.log("Shortened URL:", shortUrl);
    } catch (err) {
    setError(err.message);
    } finally {
    setLoading(false);
    }
};




const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
};

return (
    <>
        
        <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-3">
                Enter your URL
            </label>
            <input
                id="url"
                type="url"
                placeholder="https://example.com/54aqx435?5fhytg/url"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            </div>
            <button onClick = {handleSubmit}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
            >
            {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
        </form>
        {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
            </div>
        )}

        {shortUrl && (
            <div className="mt-6">
            <h3 className="font-medium mb-2 text-gray-700">Your shortened URL:</h3>
            <div className="flex items-center">
                <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 p-2 border rounded-l-md focus:outline-none bg-gray-50"
                />
                <button
                onClick={copyToClipboard}
                className={`${copied ? 'bg-gray-600' : 'bg-gray-500 hover:bg-gray-700'} text-white px-4 py-2 rounded-r-md transition-colors`}
                >
                {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            </div>
        )}
        </div>


    </>
)
}

export default UrlForm;