import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import pb from '../pocketbase/pocketbase.js';
import { useEffect } from "react";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if(pb.authStore.isValid){
      navigate('/dashboard');
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      await pb.collection('users').authWithPassword(data.email, data.password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed! Please check your credentials.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="flex h-screen">
      {/* Left half with image */}
      <div className="w-1/2">
        <img
          src="https://plus.unsplash.com/premium_photo-1677343210638-5d3ce6ddbf85?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Travel"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right half with login form and navigation */}
      <div className="w-1/2 flex flex-col justify-center bg-gray-100 px-16">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">AI Trip Planner</h1>
          <p className="text-lg text-gray-600 mt-4">Plan your trips with ease and explore new destinations.</p>
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
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-500 hover:underline"
            >
              Sign up here
            </button>
          </p>
          <button
            onClick={handleForgotPassword}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
