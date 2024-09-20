import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import pb from '../pocketbase/pocketbase.js';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await pb.collection('users').requestPasswordReset(data.email);
      toast.success('Password reset link sent! Please check your email.');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.');
      console.error('Error during password reset request:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <img
          src="https://plus.unsplash.com/premium_photo-1677343210638-5d3ce6ddbf85?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Travel"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center bg-gray-100 px-16">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">Forgot Password</h1>
          <p className="text-lg text-gray-600 mt-4">
            Enter your email address below, and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={`w-full p-2 mt-2 border rounded-lg ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6">
          <p className="text-gray-600">
            Remembered your password?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline"
            >
              Go back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
