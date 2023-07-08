import React, { createContext, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const [error, setError] = useState('');
    const {signIn} =useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      const onSubmit = data => {
        // console.log(data);

        signIn(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            // console.log(loggedUser);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successfully Login',
                showConfirmButton: false,
                timer: 1500
              })
              navigate('/user');
        })
        .catch(error => {
            setError(error.message);
        })

        reset();
      }
    return (
        <>
        <Helmet>
                <title>TechFinna || Login</title>
        </Helmet>
        <div className=''>
        <div className='flex justify-center items-center mx-auto py-10'>
            <div className='border p-10 rounded'>
                <h3 className='font-bold text-xl text-center mb-2'>Login to TechFinna</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className='text-red-600'>{error}</p>
                <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" {...register("email",  { required: true })} placeholder="Enter your Email" className="input input-bordered" />
                    {errors.email && <span className='text-red-600'>Email field is required</span>}
                </div>
                <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password",  { required: true })} placeholder="Enter Your Password" className="input input-bordered" />
                    {errors.password && <span className='text-red-600'>Password field is required</span>}
                </div>
                <input className='btn btn-primary w-full  my-2' type="submit" value="Login" />
                <p>Don't have an Account? <Link className='text-blue-700' to='/signUp'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    </div>
        </>
    );
};

export default Login;