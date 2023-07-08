import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);

    if(loading){
        return <div className='flex justify-center my-52'><progress className="progress w-56" value="70" max="100"></progress></div>;
    }

    if(user){
        return children;
    }
    return <Navigate to="/"></Navigate>
};

export default PrivateRoute;