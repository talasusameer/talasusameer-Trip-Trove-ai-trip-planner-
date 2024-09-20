// src/components/Signup.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import pb from '../pocketbase/pocketbase.js';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await pb.collection('users').create({
          username: data.name.toLocaleLowerCase().replaceAll(' ', '_'),
          name: data.name,
          email: data.email,
          emailVisibility: true,
          password: data.password,
          passwordConfirm: data.password,
      });
      toast.success('Signup successful! Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error('Signup failed! Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left half with image */}
      <div className="w-1/2">
        <img
          src="https://images.unsplash.com/photo-1567608346847-6d9817e63e8f?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Signup"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right half with signup form */}
      <div className="w-1/2 flex flex-col justify-center bg-gray-100 px-16">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">Join AI Trip Planner</h1>
          <p className="text-lg text-gray-600 mt-4">Create an account to start planning your adventures.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`w-full p-2 mt-2 border rounded-lg ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={`w-full p-2 mt-2 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className={`w-full p-2 mt-2 border rounded-lg ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-blue-500 hover:underline"
            >
              Log in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
