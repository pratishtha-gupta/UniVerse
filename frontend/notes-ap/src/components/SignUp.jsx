import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    age: '',
    gender: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      console.log(formData); 
      const response = await axios.post('http://localhost:5000/signup', formData);
      // Assuming the response includes a success message
      // Reset the form after successful registration
      setFormData({
        name: '',
        rollNo: '',
        email: '',
        age: '',
        gender: '',
        password: '',
      });
       navigate('/login');
    } catch (error) {
      console.error('Error registering student:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90%] bg-gray-100">
      <div className="max-w-md w-full mt-8 p-8 bg-white rounded shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Sign up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold ">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="daisy-input w-full bg-gray-200 border-gray-300 rounded-sm p-2"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="rollNo" className="block text-gray-700 font-semibold">Roll Number</label>
            <input
              id="rollNo"
              name="rollNo"
              type="text"
              autoComplete="rollNo"
              required
              className="daisy-input w-full bg-gray-200 border-gray-300 rounded-sm p-2"
              placeholder="Enter your roll number"
              value={formData.rollNo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="daisy-input w-full bg-gray-200 border-gray-300 rounded-sm p-2"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-700 font-semibold">Age</label>
            <input
              id="age"
              name="age"
              type="number"
              autoComplete="age"
              required
              className="daisy-input w-full bg-gray-200 border-gray-300 rounded-sm p-2"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-gray-700 font-semibold">Gender</label>
            <select
              id="gender"
              name="gender"
              required
              className="daisy-select w-full"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="daisy-input w-full bg-gray-200 border-gray-300 rounded-sm p-2"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className=" text-white font-bold daisy-btn daisy-btn-primary bg-blue-700 border rounded-lg w-full pt-2 pb-2"
          >
            Sign up
          </button>
          <Link to="/login" className="daisy-btn w-full pt-4 mt-4 text-gray-800 justify-center items-center align-center ">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
