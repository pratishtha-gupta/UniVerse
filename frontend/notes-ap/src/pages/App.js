import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import Dashboard from '../components/DashBoard';
import Results from '../components/Results';
import Announcements from '../components/Announcement';
import 'tailwindcss/tailwind.css';
import Notes from '../components/Notes';
import SemesterDetails from '../components/SemesterDetails';
import Layout from '../components/Layout';
import StudyMaterials from '../components/StudyMaterials';
import CourseContentPage from '../components/CourseContentPage';
import PYQS from '../components/Pyqs';
import LinksPage from '../components/LinksPage';
import Loading from '../components/Loading';
import EditProfile from '../components/edit_profile';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call or loading process
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate 2 seconds loading time
    return () => clearTimeout(timeout); // Clear the timeout on component unmount
  }, []);

  return (
    <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/results" element={<Results />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/courses/:course_name" element={<CourseContentPage />} />
            <Route path="/notes/:semesterId" element={<SemesterDetails />} />
            <Route path="/courses/study_materials/:course_name" element={<StudyMaterials />} />
            <Route path="/courses/pyqs/:course_name" element={<PYQS />} />
            <Route path="/courses/video_links/:course_name" element={<LinksPage />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </Layout>
    
    </Router>
  );
};

export default App;
