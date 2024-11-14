import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './LinkPage.css'; // Import CSS file for styling

const LinksPage = () => {
  const { course_name } = useParams();
  const [links, setLinks] = useState([]);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkValue, setNewLinkValue] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    fetchLinks();
    fetchUserType();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/course/links?course=${course_name}`);
     // console.log(JSON.parse(response.data[1]).link);
      setLinks(response.data);
    } catch (error) {
      console.error('Error fetching links:', error);
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

  const handleDelete = async (link) => {
    try {
      await axios.delete(`http://localhost:5000/course/links?link_address=${link.link}&course=${course_name}&name_of_video=${link.name_of_video}`);
      fetchLinks();
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };
  
  const handleUpload = async () => {
    try {
      await axios.post('http://localhost:5000/course/links', {
        name_of_video: newLinkName,
        link_address: newLinkValue,
        course: course_name
      });
      fetchLinks();
      // Clear input fields after successful upload
      setNewLinkName('');
      setNewLinkValue('');
    } catch (error) {
      console.error('Error uploading link:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-6">
      <h1 className="text-3xl font-bold mb-6">Links for {course_name}</h1>
      {(userType === 'admin' || userType === 'teacher') && (
        <div className="upload-section">
          {/* Input fields for adding a new link */}
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Link Name"
              value={newLinkName}
              onChange={(e) => setNewLinkName(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1"
            />
            <input
              type="text"
              placeholder="Link Value"
              value={newLinkValue}
              onChange={(e) => setNewLinkValue(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1"
            />
            <button onClick={handleUpload} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Upload Link</button>
          </div>
        </div>
      )}

      {/* Display existing links */}
      <div className="links-container">
        {links.slice(1).map((link, index) => (
          <div key={index} className="link-card">
            <div className="link-content">
              <span className="link-name">{JSON.parse(link).name_of_video}</span>
              <div className="link-buttons">
                {(userType === 'admin' || userType === 'teacher') && (
                  <button onClick={() => handleDelete(JSON.parse(link))} className="delete-button">Delete</button>
                )}
                <button onClick={() => window.open(`https://${JSON.parse(link).link}`, '_blank')} className="go-button">Go to Link</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinksPage;
