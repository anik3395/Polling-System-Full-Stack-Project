import React, { useState } from "react";
import './VotingDetails.css'; // Importing the CSS file
import { useAuth } from "../../hooks/useAuth";

const VotingDetails = () => {
  // const [userName, setUsername] = useState(""); // Holds the inputted username
  const [votingDetails, setVotingDetails] = useState(null); // Holds fetched voting details
  const [error, setError] = useState(null); // Holds any errors
  const {user}= useAuth()

  const fetchVotingDetails = async () => {
    setError(null); // Reset errors before making a request
    setVotingDetails(null); // Reset results to show loading state

    if (!user.username) {
      setError("Please provide a username.");
      return;
    }

    try {
      const response = await fetch(`/api/answer/get-answer/${user.username}`);
      if (response.ok) {
        const data = await response.json();
        setVotingDetails(data); // Save the fetched data
      } else {
        setError("Failed to fetch voting details. Please try again later.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please check your connection.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchVotingDetails(); // Trigger the fetch operation
  };

  return (
    <div className="voting-details">
      <h2>Voting Details</h2>
      {/* Input for Username */}
      <form onSubmit={handleSubmit} className="question-form">
        {/* <div className="form-group">
          <label htmlFor="username">Enter Username:</label>
          <input
            type="text"
            id="username"
            value={user.userName}
            // onChange={(e) => setUsername(e.target.value)}
            disabled
            placeholder="Enter username"
            required
          />
        </div> */}
        <button type="submit" className="fetch-btn">
          Get Voting Details
        </button>
      </form>
      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
      {/* Voting Details Display */}
      {votingDetails ? (
        <div className="results-container">
          {votingDetails.map((item, index) => (
            <div key={index} className="result-item">
              <h3>Question: {item.question.questionText}</h3>
              <p><strong>Answer:</strong> {item.answerText}</p>
              <p><strong>Answer Options:</strong> {item.question.answerOptions.join(", ")}</p>
              <p><strong>Posted By:</strong> {item.question.postedBy}</p>
            </div>
          ))}
        </div>
      ) : (
        !error && user.userName && <p>Loading voting details...</p>
      )}
    </div>
  );
};

export default VotingDetails;
