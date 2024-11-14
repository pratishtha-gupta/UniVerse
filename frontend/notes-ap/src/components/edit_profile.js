import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({
    rollNo: '',
    name: '',
    email: '',
    age: '',
    gender: '',
    type: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_info');
      const { _id, __v, ...userData } = response.data;
      setUserInfo(userData);
      setIsAdmin(userData.type === 'admin'); // Set isAdmin state based on user type
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/get_info', userInfo);
      setSuccessMessage(response.data.message);
      setErrorMessage(''); // Clear error message
    } catch (error) {
      setErrorMessage('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
      setSuccessMessage(''); // Clear success message
    }
  };

  const handleMakeTeacher = async () => {
    try {
      const response = await axios.post('http://localhost:5000/admin/teacher', { rollNo: userInfo.rollNo });
      setSuccessMessage(response.data);
      setErrorMessage(''); // Clear error message
    } catch (error) {
      setErrorMessage('Error making user a teacher. Please try again.');
      console.error('Error making user a teacher:', error);
      setSuccessMessage(''); // Clear success message
    }
  };

  const handleMakeStudent = async () => {
    try {
      const response = await axios.post('http://localhost:5000/admin/student', { rollNo: userInfo.rollNo });
      setSuccessMessage(response.data);
      setErrorMessage(''); // Clear error message
    } catch (error) {
      setErrorMessage('Error making user a student. Please try again.');
      console.error('Error making user a student:', error);
      setSuccessMessage(''); // Clear success message
    }
  };

  const handleMakeAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/admin/admin', { rollNo: userInfo.rollNo });
      setSuccessMessage(response.data);
      setErrorMessage(''); // Clear error message
    } catch (error) {
      setErrorMessage('Error making user an admin. Please try again.');
      console.error('Error making user an admin:', error);
      setSuccessMessage(''); // Clear success message
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-gray-100 p-8 mt-10 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg text-gray-700 font-bold">Name</label>
            <input type="text" id="name" name="name" value={userInfo.name} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg text-gray-700 font-bold">Email</label>
            <input type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-lg text-gray-700 font-bold">Age</label>
            <input type="number" id="age" name="age" value={userInfo.age} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-lg text-gray-700 font-bold">Gender</label>
            <select id="gender" name="gender" value={userInfo.gender} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-1 w-full">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md mr-2">Submit</button>
          <button type="button" onClick={() => window.history.back()} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md">Go Back</button>

          {/* Render options to make user a teacher or a student if user is admin */}
          {isAdmin && (
            <div className="mt-4">
              <label htmlFor="rollNo" className="block text-lg text-gray-700 font-bold">Enter Roll No:</label>
              <input type="text" id="rollNo" name="rollNo" value={userInfo.rollNo} onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-1 w-full" />
              <div className="flex mt-2">
                <button type="button" onClick={handleMakeTeacher} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-3">Make Teacher</button>
                <button type="button" onClick={handleMakeStudent} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-3">Make Student</button>
                <button type="button" onClick={handleMakeAdmin} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Make Admin</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
