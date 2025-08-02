import React, { useState } from 'react';
import { useParams } from '@tanstack/react-router'; // Import useParams hook
import { axiosInstance } from '../utils/axiosInstance.js';

const VerifyPassword = () => {
    const { id } = useParams({select: (params)=>({id:params.id})});
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await axiosInstance.post(`/verify-password/${id}`, { password });
            // Redirect to the original URL
            window.location.href = data.redirectUrl;
        } catch (err) {
            setError(err.response?.data?.error || 'Incorrect password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-center">🔒 Protected URL</h2>
                    <p className="text-center text-gray-600 mt-2">
                        This URL is password protected. Please enter the password to continue.
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    {error && (
                        <div className="text-red-600 text-sm text-center">{error}</div>
                    )}
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Verifying...' : 'Access URL'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyPassword;