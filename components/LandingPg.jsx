import React, { use } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function LandingPg() {

    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className='text-4xl font-bold text-gray-800 mb-5'>Welcome to the Invoice App</h1>
            <button onClick={() => navigate('/app')} className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Invoice</button>
        </div>

    );
}

export default LandingPg;