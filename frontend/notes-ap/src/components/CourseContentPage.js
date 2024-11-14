import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CourseContentPage = () => {
  const { course_name } = useParams();

  return (
    <div className="container mx-auto mt-8 text-center">
      <h2 className="text-3xl font-bold mb-8 p-20">Choose Content Type for Course {course_name}</h2>
      <div className="flex justify-center">
        <Link to={`/courses/study_materials/${course_name}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105 mr-4">Study Materials</button>
        </Link>
        <Link to={`/courses/pyqs/${course_name}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105 mr-4">PYQs</button>
        </Link>
        <Link to={`/courses/video_links/${course_name}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105">Video Links</button>
        </Link>
      </div>
    </div>
  );
};

export default CourseContentPage;
