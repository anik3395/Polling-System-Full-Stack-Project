// import React, { useState, useEffect } from "react";

// const ViewResults = () => {
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch results from the API when the component mounts
//     const fetchResults = async () => {
//       try {
//         const response = await fetch("/api/answer/answer-counts/16");
//         if (response.ok) {
//           const data = await response.json();
//           setResults(data); // Save the response in the state
//         } else {
//           setError("Failed to fetch results. Please try again later.");
//         }
//       } catch (err) {
//         setError("Unable to connect to the server. Please check your connection.");
//       }
//     };

//     fetchResults();
//   }, []); // Empty dependency array ensures this runs only once

//   return (
//     <div className="view-results">
//       <h2>Poll Results</h2>
//       {error && <p className="error-message">{error}</p>}
//       {results ? (
//         <div className="results-container">
//           {Object.entries(results).map(([question, answers], index) => (
//             <div key={index} className="result-item">
//               <h3>{question}</h3>
//               <ul>
//                 {Object.entries(answers).map(([key, value], i) => (
//                   <li key={i}>
//                     <strong>{key}:</strong> {value}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       ) : (
//         !error && <p>Loading results...</p>
//       )}
//     </div>
//   );
// };

// export default ViewResults;


import React, { useState } from "react";

const ViewResults = () => {
  const [questionId, setQuestionId] = useState(""); // Holds the inputted question ID
  const [results, setResults] = useState(null); // Holds fetched results
  const [error, setError] = useState(null); // Holds any errors

  const fetchResults = async () => {
    setError(null); // Reset errors before making a request
    setResults(null); // Reset results to show loading state

    if (!questionId) {
      setError("Please provide a question ID.");
      return;
    }

    try {
      const response = await fetch(`/api/answer/answer-counts/${questionId}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data); // Save the fetched data
      } else {
        setError("Failed to fetch results. Please try again later.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please check your connection.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetchResults(); // Trigger the fetch operation
  };

  return (
    <div className="view-results">
      <h2>Poll Results</h2>
      {/* Input for Question ID */}
      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-group">
          <label htmlFor="questionId">Enter Question ID:</label>
          <input
            type="number"
            id="questionId"
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
            placeholder="Enter question ID"
            required
          />
        </div>
        <button type="submit" className="fetch-btn">
          Get Results
        </button>
      </form>
      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
      {/* Results Display */}
      {results ? (
        <div className="results-container">
          {Object.entries(results).map(([question, answers], index) => (
            <div key={index} className="result-item">
              <h3>{question}</h3>
              <ul>
                {Object.entries(answers).map(([key, value], i) => (
                  <li key={i}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        !error && questionId && <p>Loading results...</p>
      )}
    </div>
  );
};

export default ViewResults;


