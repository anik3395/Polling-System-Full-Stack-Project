import React, { useState } from 'react';
import './SpecificAdmin.css'; // Importing the CSS file
import { useUser } from '../../context/AuthContext/AuthProvider';


const SpecificAdmin = () => {
  const [adminEmail, setAdminEmail] = useState(""); // State for holding the admin email input
  const [postedQuestion, setPostedQuestion] = useState(null); // Holds the question data
  const [error, setError] = useState(null); // Holds any error messages

  const { user } = useUser();

  // Function to fetch the specific admin's posted question
  const fetchAdminQuestion = async () => {
    setError(null); // Reset error message before fetching
    setPostedQuestion(null); // Reset the result state to show loading

    if (!user.username) {
      setError("Please enter a valid admin email.");
      return;
    }

    try {
      const response = await fetch(`/api/by-admin?adminEmail=${user.username}`);
      if (response.ok) {
        const data = await response.json();
        setPostedQuestion(data); // Save the fetched data
      } else {
        setError("Failed to fetch admin's posted question. Please try again later.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please check your connection.");
    }
  };

  return (
    <div className="specific-admin">
      <h2>Admin's Posted Question: </h2>

      {/* Input for Admin's Email */}
      {/* <div className="email-input">
        <label htmlFor="adminEmail">Admin Email:</label>
        <input
          type="email"
          id="adminEmail"
          value={user.username}
          onChange={(e) => setAdminEmail(e.target.value)} // Update state as the user types
          placeholder="Enter admin email"
          disabled
        />
      </div> */}

      {/* Button to trigger fetching of posted question */}
      <button onClick={fetchAdminQuestion} className="fetch-btn">
        Get Admin's Posted Question
      </button>

      {/* Error message display */}
      {error && <p className="error-message">{error}</p>}

      {/* Display the question if it has been fetched */}
      {postedQuestion ? (
        <div className="results-container">
          {postedQuestion.map((item, index) => (
            <div key={index} className="result-item">
              <h3>Question: {item.questionText}</h3>
              <p><strong>Answer Options:</strong> {item.answerOptions.join(", ")}</p>
              <p><strong>Posted By:</strong> {item.postedBy}</p>
            </div>
          ))}
        </div>
      ) : (
        !error && <p>Loading admin's posted question...</p>
      )}
    </div>
  );
};

export default SpecificAdmin;
