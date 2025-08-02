// import React, { useState } from 'react';
// import { createCustomShortUrl } from '../api/shortUrl.api';

// const ProtectedUrls = () => {

//     const [isProtected, setIsProtected] = useState(false);
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');


//   return (

//     <div className="mb-4">
//         <div className="flex items-center">
//             <label className="text-sm font-medium text-gray-700">
//                 🔒 Password Protect(optional)
//             </label>
//             <input
//                 id="isProtected"
//                 name="isProtected"
//                 type="checkbox"
//                 checked={isProtected}
//                 onChange={() => setIsProtected(!isProtected)}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             {isProtected && (
//                 <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="ml-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Enter password"
//                 />
//             )}
//         </div>
//     </div>

//   )

// }

// export default ProtectedUrls;



import React, { useState } from 'react';

const ProtectedUrls = ({ onProtectionChange }) => {
    const [isProtected, setIsProtected] = useState(false);
    const [password, setPassword] = useState('');

    const handleProtectionToggle = () => {
        const newProtectedState = !isProtected;
        setIsProtected(newProtectedState);
        
        // Reset password when disabling protection

        if (!newProtectedState) {
            setPassword('');
            onProtectionChange({ isProtected: false, password: '' });
        } else {
            onProtectionChange({ isProtected: true, password });
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        onProtectionChange({ isProtected, password: newPassword });
    };

    return (
        <div className="mb-4">
            <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        id="isProtected"
                        name="isProtected"
                        type="checkbox"
                        checked={isProtected}
                        onChange={handleProtectionToggle}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        🔒 Password Protect (optional)
                    </span>
                </label>
            </div>
            
            {isProtected && (
                <div className="mt-3 ml-6">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter password"
                        required
                    />
                </div>
            )}
        </div>
    );
};

export default ProtectedUrls;