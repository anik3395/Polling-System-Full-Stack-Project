import React, { useEffect, useState } from 'react';
import './ViewAnswers.css'; // Optional CSS for styling

const ViewAnswers = () => {
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the answers data
    const fetchAnswers = async () => {
      try {
        const response = await fetch('/api/answer/get-all-answer');
        if (!response.ok) {
          throw new Error('Failed to fetch answers.');
        }
        const data = await response.json();
        setAnswers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAnswers();
  }, []);

  return (
    <div className="view-answers-container">
      <h1 className="page-title">Submitted Answers</h1>

      {error && <p className="error-message">{error}</p>}

      {!error && answers.length === 0 && <p>No answers available.</p>}

      {answers.length > 0 && (
        <table className="answers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Answer</th>
              <th>Question</th>
              <th>Posted By</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((answer) => (
              <tr key={answer.id}>
                <td>{answer.id}</td>
                <td>{answer.userName}</td>
                <td>{answer.answerText}</td>
                <td>{answer.question.questionText}</td>
                <td>{answer.question.postedBy || 'Anonymous'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAnswers;
