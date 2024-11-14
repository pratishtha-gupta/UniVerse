import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    rollNo: '',
    password: '',
  });
 // axios.defaults.withCredentials = true
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
     
      const response = await axios.post('http://localhost:5000/signup/login', formData);
      console.log(response.data);
      // Assuming successful login, navigate to homepage
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In To Your Account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className='p-2'>
              <label htmlFor="rollNo" className="block text-gray-700">Roll Number</label>
              <input
                id="rollNo"
                name="rollNo"
                type="text"
                autoComplete="rollNo"
                required
                className="daisy-input w-full bg-gray-200 border-gray-300 rounded-sm p-2 "
                placeholder="Enter your roll number"
                value={formData.rollNo}
                onChange={handleChange}
              />
            </div>
            <div className='p-2'>
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="daisy-input w-full bg-gray-200 border-gray-300 rounded-sm p-2 "
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="text-white font-bold daisy-btn daisy-btn-primary bg-blue-700 hover:bg-blue-600 border rounded-lg w-full pt-2 pb-2"
            >
              Log in
            </button>
            <Link to="/signup" className="daisy-btn w-full pt-4 mt-4 text-gray-800 justify-center items-center align-center ">
            Don't have an account? Sign Up
          </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
