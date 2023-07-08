import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const signUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

      const onSubmit = data => {
        // console.log(data);

        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            // console.log(loggedUser);
            updateUserProfile(data.name)
            .then(()=>{
                console.log('User Profile Updated');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully Sign Up',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  
            navigate('/user');
            })
            .catch(error => {
                setError(error.message);
            })
            
            reset();
        })
      }
    return (
        <>
        <Helmet>
                <title>TechFinna || Sign Up</title>
        </Helmet>
        <div className=''>
        <div className='flex justify-center items-center mx-auto py-10'>
            <div className='border p-10 rounded'>
                <h3 className='font-bold text-xl text-center mb-2'>Sign Up to TechFinna</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                <p className='text-red-600'>{error}</p>
                    <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text">User Name</span>
                    </label>
                    <input type="text" {...register("name",  { required: true })} placeholder="Enter your userName" className="input input-bordered" />
                    {errors.email && <span className='text-red-600'>Name field is required</span>}
                </div>
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
                <input className='btn btn-primary w-full  my-2' type="submit" value="Sign Up" />
                <p>Already have an Account? <Link className='text-blue-700' to='/'>Login</Link></p>
                </form>
            </div>
        </div>
    </div>
        </>
    );
};

export default signUp;