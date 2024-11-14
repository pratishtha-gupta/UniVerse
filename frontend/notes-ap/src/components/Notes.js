import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SemesterPage = () => {
  const [selectedSemester, setSelectedSemester] = useState(null); // State to keep track of selected semester

  const semesters = [
    { id: '1', name: 'Semester 1' },
    { id: '2', name: 'Semester 2' },
    { id: '3', name: 'Semester 3' },
    { id: '4', name: 'Semester 4' },
    { id: '5', name: 'Semester 5' },
    { id: '6', name: 'Semester 6' },
    { id: '7', name: 'Semester 7' },
    { id: '8', name: 'Semester 8' }
  ];

  const handleSemesterClick = (semesterId) => {
    setSelectedSemester(semesterId);
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Select Semester/Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {semesters.map((semester) => (
          <Link
            key={semester.id}
            to={`/notes/${semester.id}`}
            onClick={() => handleSemesterClick(semester.id)} // Pass selected semester id
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105 flex items-center justify-center ${
              selectedSemester === semester.id ? 'bg-gray-300' : ''
            }`}
          >
            {semester.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SemesterPage;
