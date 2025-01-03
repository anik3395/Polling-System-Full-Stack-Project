import React, { useState, useEffect } from "react";

const AdminQuestionDetails = () => {
  const [adminEmail, setAdminEmail] = useState(""); // State to hold admin email
  const [questionDetails, setQuestionDetails] = useState([]); // State to hold question details
  const [error, setError] = useState(null); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleEmailChange = (e) => {
    setAdminEmail(e.target.value);
  };

  const fetchQuestionDetails = async () => {
    if (!adminEmail) {
      setError("Please enter an admin email.");
      return;
    }

    setError(null); // Clear previous errors
    setLoading(true); // Start loading indicator

    try {
      console.log(adminEmail);
      const response = await fetch(
        `/api/answer/by-admin-email/${encodeURIComponent(adminEmail)}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Received Data:', data); // Log data to check its structure
        setQuestionDetails(data); // Set the questionDetails state
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch question details.");
      }
    } catch (err) {
      console.log(err);
      setError("Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  useEffect(() => {
    console.log('Updated questionDetails:', questionDetails);
  }, [questionDetails]); // This will run whenever questionDetails changes

  return (
    <div className="admin-question-details-container">
      <h1>Admin Question Details</h1>

      {/* Email Input Section */}
      <div className="email-input-container">
        <label htmlFor="adminEmail">Enter Admin Email:</label>
        <input
          type="email"
          id="adminEmail"
          value={adminEmail}
          onChange={handleEmailChange}
          placeholder="admin@example.com"
        />
        <button onClick={fetchQuestionDetails} disabled={loading}>
          {loading ? "Fetching..." : "Get Question Details"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Question Details Display */}
      {Array.isArray(questionDetails) && questionDetails.length > 0 ? (
        <div className="question-details-list">
          {questionDetails.map((questionDetail) => {
            const question = questionDetail.question;  // Extract the question object
            const options = question.answerOptions || [];  // Extract answer options
            const userAnswer = questionDetail.answerText; // Extract the user's answer

            return (
              <div key={question.id} className="question-card">
                <h3>Question: {question.questionText}</h3>
                <p>Posted by: {question.postedBy}</p>
                <p>Your Answer: {userAnswer}</p>
                <ul>
                  {options.length > 0 ? (
                    options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))
                  ) : (
                    <p>No options available for this question.</p>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        !error && !loading && <p>No questions found for this admin.</p>
      )}
    </div>
  );
};

export default AdminQuestionDetails;