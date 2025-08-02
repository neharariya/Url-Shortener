import React from 'react';
import DashBoard from '../components/DashBoard';

const DashBoardPage = () => {
  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-5xl w-full mt-10">
          {/* <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">URL Shortener</h1> */}
          <DashBoard/>    
          {/* <div className="mt-8 text-center text-gray-500 text-sm">
          </div> */}
        </div>
      </div>
    )
}

export default DashBoardPage