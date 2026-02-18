import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate()

    const {signInUser, signinGoogle} = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    // login
    const handleLogin = (data) => {
        console.log("After login", data);
        signInUser(data.email, data.password)
        .then(result => {
            console.log(result.user);
            navigate(location?.state || '/');
        })
        .catch(error => {
            console.log(error);
        })
    }

    // google
    const handleGoogleSignIn = () => {
        signinGoogle()
        .then(result => {
            console.log(result.user);
            navigate(location?.state || '/');
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="w-full max-w-md">
                
                {/* Title */}
                <h1 className="text-5xl font-extrabold mb-2">Welcome Back!</h1>
                <p className="font-semibold mb-6">Login with ZapShift</p>
    
                <form onSubmit={handleSubmit(handleLogin)}>
    
    
                    {/* Email */}
                    <label className="font-semibold">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        placeholder="Email"
                        className="input w-full my-2.5 border border-gray-300"
                    />
                    {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
    
                    {/* Password */}
                    <label className="font-semibold ">Password</label>
                    <input
                        type="password"
                        {...register('password', { required: true, minLength: 6 })}
                        placeholder="Password"
                        className="input w-full my-2.5 border border-gray-300"
                    />
                    {errors.password?.type === 'required' &&
                        <p className="text-red-500 text-sm">Password is required</p>
                    }
                    {errors.password?.type === 'minLength' &&
                        <p className="text-red-500 text-sm">Password must be 6 characters or more</p>
                    }
    
                    {/* Register Button */}
                    <button className="w-full py-2.5 rounded-md mt-4 bg-primary hover:bg-green-500 hover:text-white transition font-bold text-lg">
                        Login
                    </button>
    
                    {/* Already have account */}
                    <p className="mt-4 text-gray-700 text-center">
                        Don't have an account? <Link state={location.state} to='/register' className="text-green-700 font-medium cursor-pointer underline">Register</Link >
                    </p>
    
                    {/* OR */}
                    <div className="flex items-center my-4">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <p className="px-4 text-gray-500">Or</p>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
    
                    {/* Google Button */}
                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="w-full border border-gray-300 py-2.5 rounded-md flex items-center justify-center gap-3 bg-gray-200 hover:bg-gray-400 hover:text-gray-100"
                    >
                        <FcGoogle className="text-2xl" />
                        <span className="text-lg font-bold ">Login with Google</span>
                    </button>
    
                </form>
            </div>
    );
};

export default Login;