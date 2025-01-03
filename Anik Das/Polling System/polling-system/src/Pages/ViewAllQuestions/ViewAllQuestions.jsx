import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewAllQuestions.css';

const ViewAllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/question/all');
        if (response.ok) {
          const data = await response.json();
          setQuestions(data); // Assuming the response is an array of questions
        } else {
          setError('Failed to fetch questions');
        }
      } catch (err) {
        setError('An error occurred while fetching questions');
      }
    };

    fetchQuestions();
  }, []);

  // Handle click on a question to navigate to the question detail page
  const handleViewQuestion = (id) => {
    navigate(`/view-admin-question/${id}`);
  };

  return (
    <div className="view-all-questions-container">
      <h1>View All Questions</h1>
      {error && <p className="error-message">{error}</p>}
      <ul>
        {questions.length > 0 ? (
          questions.map((question) => (
            <li key={question.id}>
              <div className="question-item">
                <h3>{question.questionText}</h3>
                <p><strong>Posted By:</strong> {question.postedBy || 'Anonymous'}</p>
                <ul>
                  {question.answerOptions.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
                {/* <button onClick={() => handleViewQuestion(question.id)}>
                  View Details
                </button> */}
              </div>
            </li>
          ))
        ) : (
          <p>No questions available</p>
        )}
      </ul>
    </div>
  );
};

export default ViewAllQuestions;
