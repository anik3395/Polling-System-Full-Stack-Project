// ViewAdminQuestion.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ViewAdminQuestion = () => {
  const { id } = useParams();  // Get the question ID from the URL
  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    // Fetch the question data from the API using the question ID
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`/api/question/${id}`);
        if (response.ok) {
          const data = await response.json();
          setQuestionData(data);  // Set the fetched question data
        } else {
          console.error("Failed to fetch question data");
        }
      } catch (err) {
        console.error("Error fetching question:", err);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!questionData) return <div>Loading...</div>;

  return (
    <div className="view-question-container">
      <h1>{questionData.questionText}</h1>
      <h3>Answer Options</h3>
      <ul>
        {questionData.answerOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAdminQuestion;
