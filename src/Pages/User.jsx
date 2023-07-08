import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { FaUser } from 'react-icons/fa';

const User = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='flex justify-center items-center mx-auto py-10'>
        <div className='border p-10 rounded text-center space-y-2'>
        <FaUser className='rounded-full bg-gray-400 w-10 h-10 p-2 text-center mx-auto'></FaUser>
                <h1 className='text-xl'>User Name: {user.displayName}</h1>
                <h1 className='text-xl'>User Email: {user.email}</h1>
            </div>
        </div>
    );
};

export default User;