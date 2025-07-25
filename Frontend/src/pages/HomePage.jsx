import React from 'react';
import UrlForm from '../components/UrlForm';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">URL Shortener</h1> */}
        <UrlForm/>    
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Create shortUrls in seconds</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage;