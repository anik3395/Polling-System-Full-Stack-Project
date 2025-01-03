
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VoteQuestion.css";
import { useUser } from "../../context/AuthContext/AuthProvider";

const VoteQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const location = useLocation();
  // const adminEmail = location.state?.adminEmail || "emon@gmail.com"; // Admin email to fetch questions
  const navigate = useNavigate()

  const { user } = useUser();

  const username = user ? user.username : "";
  useEffect(() => {
    const fetchQuestions = async () => {
      console.log("userrrrrrrrrrr"+username);
      try {
        const response = await fetch(
          `/api/questions/all`
        );

        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          setError("Failed to fetch questions.");
        }
      } catch (err) {
        setError("Error connecting to the server. Please try again later.");
      }
    };

    fetchQuestions();
  }, []);

  // Handle option selection
  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // Handle vote submission
  const handleVoteSubmit = async (questionId) => {
    const selectedOption = selectedOptions[questionId];

    if (!selectedOption) {
      setError("Please select an option before voting.");
      return;
    }

    try {
      console.log(username + selectedOption);
      // Make the API call to submit the vote
      const response = await fetch(
        `/api/answer/questions/${questionId}?userName=${encodeURIComponent(
          username
        )}&answer=${encodeURIComponent(selectedOption)}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        setSuccess("Vote submitted successfully!");
        navigate('/admin/voting-details');
        setError(null); // Clear any previous errors
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to submit the vote.");
      }
    } catch (err) {
      setError("Error while submitting your vote. Please try again.");
    }
  };

  return (
    <div className="vote-question-container">
      <h1>Questions Posted by Admin</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      {/* Questions List */}
      {questions.length > 0 ? (
        <div className="questions-list">
          {questions.map((item) => (
            <div key={item.id} className="question-card">
              <h3>{item.questionText}</h3>
              <form>
                {item.answerOptions.map((option, index) => (
                  <div key={index} className="option">
                    <label>
                      <input
                        type="radio"
                        name={`question-${item.id}`}
                        value={option}
                        checked={selectedOptions[item.id] === option}
                        onChange={() => handleOptionChange(item.id, option)}
                      />
                      {option}
                    </label>
                  </div>
                ))}
                <button
                  type="button"
                  className="vote-btn"
                  onClick={() => handleVoteSubmit(item.id)}
                >
                  Submit Vote
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p>No questions found for this admin.</p>
      )}
    </div>
  );
};

export default VoteQuestion;












