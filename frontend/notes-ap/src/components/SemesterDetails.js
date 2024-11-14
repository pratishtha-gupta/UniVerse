import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true
const SemesterDetails = () => {
  const navigate = useNavigate();
  const { semesterId } = useParams();
  const departmentIT = 'IT';
  const departmentECE = 'ECE';
  
  const [semesterDetails, setSemesterDetails] = useState({
    id: '',
    name: '',
    courses: {
      [departmentIT]: [],
      [departmentECE]: []
    }
  });

  const [userType, setUserType] = useState('');

  useEffect(() => {
    fetchSemesterDetails();
    fetchUserType();
  }, [semesterId]);

  const fetchSemesterDetails = async () => {
    try {
      const responseIT = await axios.get(`http://localhost:5000/semester?semester=${semesterId}`);
      setSemesterDetails({
        id: `semester${semesterId}`,
        name: `Semester ${semesterId}`,
        courses: {
          [departmentIT]: responseIT.data,
          // Include logic to fetch courses for other departments if needed
        }
      });
    } catch (error) {
      console.error(`Error fetching details for semester ${semesterId}:`, error);
    }
  };

  const fetchUserType = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_info');
      setUserType(response.data.type);
    } catch (error) {
      console.error('Error fetching user type:', error);
    }
  };

  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    semester: '',
    department: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/add_courses', formData);
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to add course:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
    setShowAddCourseDialog(false);
    fetchSemesterDetails();
  };

  const handleCloseDialog = () => {
    setShowAddCourseDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative"> {/* Add relative positioning */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{semesterDetails.name} Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {semesterDetails.courses[departmentIT].map(course => (
            <div key={course._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
              <Link to={`/courses/${course.title}`} className="block cursor-pointer">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-2">Description: {course.description}</p>
                  <p className="text-gray-600">Department: {course.department}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {(userType === 'admin' || userType === 'teacher') && (
        <button className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setShowAddCourseDialog(true)}>
          Add Course
        </button>
      )}

      {showAddCourseDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Add Course</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block font-semibold mb-2">Title</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-semibold mb-2">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded" required></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="semester" className="block font-semibold mb-2">Semester</label>
                <input type="text" id="semester" name="semester" value={formData.semester} onChange={handleInputChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="mb-4">
                <label htmlFor="department" className="block font-semibold mb-2">Department</label>
                <input type="text" id="department" name="department" value={formData.department} onChange={handleInputChange} className="w-full p-2 border rounded" required />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Submit</button>
                <button type="button" onClick={handleCloseDialog} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SemesterDetails;
