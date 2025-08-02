// import React, { useState, useEffect } from 'react';
// import {getUserUrls} from '../api/shortUrl.api.js';
// // import { Link } from '@tanstack/react-router';

// const UserUrls = () => {
//   const [urls, setUrls] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [copiedId, setCopiedId] = useState(null);

//   useEffect(() => {
//   fetchUserUrls();
  
//   const handleFocus = () => {
//     fetchUserUrls();
//   };
  
//   window.addEventListener('focus', handleFocus);
//   return () => window.removeEventListener('focus', handleFocus);
// }, []);

//   const fetchUserUrls = async () => {
//     try {
//       setLoading(true);
//       setError('');
//       const userUrls = await getUserUrls();
//       setUrls(userUrls || []);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch URLs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = async (url, id) => {
//     try {
//       await navigator.clipboard.writeText(url);
//       setCopiedId(id);
//       setTimeout(() => setCopiedId(null), 2000);
//     } catch (err) {
//       console.error('Copy failed:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-8 mt-8 mx-auto max-w-6xl">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-6 w-1/3"></div>
//           <div className="space-y-4">
//             {[1, 2, 3].map(i => (
//               <div key={i} className="h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-8 mt-8 mx-auto max-w-6xl">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
//             </svg>
//           </div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h3>
//           <p className="text-red-600 mb-4">{error}</p>
//           <button 
//             onClick={fetchUserUrls}
//             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-8 mt-8 mx-auto max-w-6xl border border-gray-100">

//       {urls.length === 0 ? (
//         <div className="text-center py-20">
//           <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
//             </svg>
//           </div>
//           <h3 className="text-2xl font-semibold text-gray-700 mb-3">No URLs yet</h3>
//           <p className="text-gray-500 text-lg">Create your first shortened URL to get started!</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {urls.map((url, index) => (
//             <div key={url._id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200">
//               <div className="grid grid-cols-4 gap-8 items-center">
//                 <div className="min-w-0">
//                   <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Original URL</div>
//                   <div className="text-gray-800 font-medium" title={url.fullUrl}>
//                     {url.fullUrl}
//                   </div>
//                 </div>

//                 <div className="text-center">
//                   <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Short URL</div>
//                   <a href={`http://localhost:3000/${url.shortUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-mono text-sm bg-blue-50 px-3 py-1 rounded-lg hover:underline hover:bg-blue-100 transition-all duration-200">localhost:3000/{url.shortUrl}</a>
//                 </div>

//                 <div className="text-center">
//                   <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Clicks</div>
//                   <div className="text-2xl font-bold text-blue-500">{url.clicks}</div>
//                 </div>


//                 <div className="text-center">
//                   <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Action</div>
//                   <button
//                     onClick={() => copyToClipboard(`http://localhost:3000/${url.shortUrl}`, url._id)}
//                     className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 mx-auto ${
//                       copiedId === url._id
//                         ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg'
//                         : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 border border-gray-300 hover:border-blue-300'
//                     }`}
//                   >
//                     {copiedId === url._id ? (
//                       <>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7"></path>
//                         </svg>
//                         Copied!
//                       </>
//                     ) : (
//                       <>
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
//                         </svg>
//                         Copy
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserUrls;


import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserUrls } from '../api/shortUrl.api.js';

const UserUrls = () => {
  const [copiedId, setCopiedId] = useState(null);
  const queryClient = useQueryClient();

  // TanStack Query replaces all your manual state management
  const {
    data: urls = [],
    isLoading: loading,
    error,
    refetch: fetchUserUrls
  } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getUserUrls,
    refetchOnWindowFocus: true, // Automatically refetch when user returns to tab
    staleTime: 10000, // Data stays fresh for 30 seconds
    retry: 2
  });

  const copyToClipboard = async (url, id) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8 mx-auto max-w-6xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-6 w-1/3"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 mt-8 mx-auto max-w-6xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h3>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button 
            onClick={() => fetchUserUrls()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mt-8 mx-auto max-w-6xl border border-gray-100">
      {/* <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200"> */}
        {/* <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">📊 Your URLs</h2>
          <p className="text-gray-500">Manage your shortened links • {urls.length} total</p>
        </div> */}
        {/* <button

          onClick={() => fetchUserUrls()}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Refresh
        </button> */}
      {/* </div> */}

      {urls.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">No URLs yet</h3>
          <p className="text-gray-500 text-lg">Create your first shortened URL to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {urls.reverse().map((url) => (
            <div key={url._id} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200">
              <div className="grid grid-cols-4 gap-5 items-center">
                
                <div className="min-w-0">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Original URL</div>
                  {url.isPasswordProtected && (
                    <div className="text-xs font-medium text-blue-500 uppercase tracking-wide mb-1">🔒 Protected</div>
                  )}
                  <div className="text-gray-800 font-medium truncate" title={url.fullUrl}>
                    {url.fullUrl}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Short URL</div>
                  <a 
                    href={`http://localhost:3000/${url.shortUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-700 font-mono text-sm bg-blue-50 px-3 py-1 rounded-lg hover:underline hover:bg-blue-100 transition-all duration-200"
                  >
                    localhost:3000/{url.shortUrl}
                  </a>
                </div>

                <div className="text-center">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Clicks</div>
                  <div className="text-2xl font-bold text-blue-500">{url.clicks}</div>
                </div>

                <div className="text-center">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Action</div>
                  <button
                    onClick={() => copyToClipboard(`http://localhost:3000/${url.shortUrl}`, url._id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 mx-auto ${
                      copiedId === url._id
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 border border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7"></path>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserUrls;