// import React from 'react';
// import './ManageQuestions.css';

// const Question = () => {
//     return (
//         <div className="manage-questions-container">
//       <h1 className="page-title">Manage Questions</h1>
      
//       <div className="question-actions">
//         <button className="add-btn">Add New Question</button>
//         <button className="view-all-btn">View All Questions</button>
//       </div>
      
//       <div className="question-list">
//         <h2 className="section-title">Question List</h2>
//         <table className="question-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Question</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Example Question Data */}
//             <tr>
//               <td>1</td>
//               <td>What is your favorite programming language?</td>
//               <td>
//                 <button className="edit-btn">Edit</button>
//                 <button className="delete-btn">Delete</button>
//               </td>
//             </tr>
//             <tr>
//               <td>2</td>
//               <td>Do you prefer frontend or backend development?</td>
//               <td>
//                 <button className="edit-btn">Edit</button>
//                 <button className="delete-btn">Delete</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//     );
// };

// export default Question;


// import React, { useState } from "react";
// import "./ManageQuestions.css";

// const Question = () => {
//   const [formData, setFormData] = useState({
//     question: "",
//     answerOptions: ["", "", "", ""], // Four answerOptions
//   });
//   const [questions, setQuestions] = useState([]); // To display questions
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name.startsWith("option")) {
//       const index = parseInt(name.replace("option", "")) - 1;
//       const newanswerOptions = [...formData.answerOptions];
//       newanswerOptions[index] = value;
//       setFormData({ ...formData, answerOptions: newanswerOptions });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       const response = await fetch("/api/questions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const newQuestion = await response.json();
//         setQuestions([...questions, newQuestion]); // Add new question to the list
//         setFormData({ question: "", answerOptions: ["", "", "", ""] }); // Reset form
//         alert("Question posted successfully!");
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Failed to post question.");
//       }
//     } catch (err) {
//       setError("Failed to connect to the server. Please try again later.");
//     }
//   };

//   return (
//     <div className="manage-questions-container">
//       <h1 className="page-title">Manage Questions</h1>

//       {/* Add Question Form */}
//       <form className="add-question-form" onSubmit={handleSubmit}>
//         <h2 className="section-title">Post a New Question</h2>
//         <div className="form-group">
//           <label htmlFor="question">Question</label>
//           <input
//             type="text"
//             id="question"
//             name="question"
//             value={formData.question}
//             onChange={handleChange}
//             placeholder="Enter your question"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>answerOptions</label>
//           {formData.answerOptions.map((option, index) => (
//             <input
//               key={index}
//               type="text"
//               name={`option${index + 1}`}
//               value={option}
//               onChange={handleChange}
//               placeholder={`Option ${index + 1}`}
//               required
//             />
//           ))}
//         </div>
//         <button type="submit" className="add-btn">
//           Post Question
//         </button>
//         {error && <p className="error-message">{error}</p>}
//       </form>

//       {/* Display Questions */}
//       <div className="question-list">
//         <h2 className="section-title">Question List</h2>
//         <table className="question-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Question</th>
//               <th>answerOptions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {questions.map((q, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{q.question}</td>
//                 <td>{q.answerOptions.join(", ")}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Question;



// import React, { useState } from 'react';
// import './ManageQuestions.css';

// const Question = () => {
//   const [formData, setFormData] = useState({
//     question: '',
//     answerOptions: ['', '', '', ''], // Four answerOptions
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleOptionChange = (index, value) => {
//     const newanswerOptions = [...formData.answerOptions];
//     newanswerOptions[index] = value;
//     setFormData((prevState) => ({
//       ...prevState,
//       answerOptions: newanswerOptions,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch(
//         '/api/question/add?email=hridoy@gmai.com',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         setSuccess('Question posted successfully!');
      
//         setFormData({
//           question: '',
//           answerOptions: ['', '', '', ''],
//         });
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Failed to post question.');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//     }
//   };

//   return (
//     <div className="manage-questions-container">
//       <h1 className="page-title">Manage Questions</h1>
      
//       <div className="question-form">
//         <h2>Add New Question</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="question">Question</label>
//             <input
//               type="text"
//               id="question"
//               name="question"
//               value={formData.question}
//               onChange={handleInputChange}
//               placeholder="Enter your question"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>answerOptions</label>
//             {formData.answerOptions.map((option, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 placeholder={`Option ${index + 1}`}
//                 required
//               />
//             ))}
//           </div>
//           <button type="submit" className="add-btn">
//             Post Question
//           </button>
//         </form>
//         {error && <p className="error-message">{error}</p>}
//         {success && <p className="success-message">{success}</p>}
//       </div>
//     </div>
//   );
// };

// export default Question;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ManageQuestions.css';

// const Question = () => {
//   const [formData, setFormData] = useState({
//     questionText: '',
//     answerOptions: ['', '', '', ''], // Four answerOptions
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleOptionChange = (index, value) => {
//     const newAnswerOptions = [...formData.answerOptions];
//     newAnswerOptions[index] = value;
//     setFormData((prevState) => ({
//       ...prevState,
//       answerOptions: newAnswerOptions,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);
  
//     // In the handleSubmit method
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError(null);
//   setSuccess(null);

//   // Check if all answer options are filled
//   const allAnswerOptionsFilled = formData.answerOptions.every(
//     (option) => option.trim() !== ''
//   );
//   if (!allAnswerOptionsFilled) {
//     setError('All answer options must be filled.');
//     return; // Prevent form submission
//   }

//   try {
//     console.log("Form Data:", formData); // Check the form data structure

//     const response = await fetch('/api/question/add?email=hridoy@gmai.com', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json', // Ensure correct Content-Type
//       },
//       body: JSON.stringify(formData), // Ensure this is properly stringified
//     });

//     if (response.ok) {
//       const data = await response.json(); // Get the posted question data
//       setSuccess('Question posted successfully!');
//       setFormData({
//         questionText: '', // Reset questionText field
//         answerOptions: ['', '', '', ''],
//       });

//       // Navigate to the newly created question view page using the question id
//       navigate(`/view-admin-question/${data.id}`);
//     } else {
//       const errorData = await response.json();
//       setError(errorData.message || 'Failed to post question.');
//       console.log(errorData);
//     }
//   } catch (err) {
//     setError('Failed to connect to the server. Please try again later.');
//     console.log(err);
//   }
// };

  

//   return (
//     <div className="manage-questions-container">
//       <h1 className="page-title">Manage Questions</h1>

//       <div className="question-form">
//         <h2>Add New Question</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//           <label htmlFor="questionText">Question</label> {/* Updated label */}
//             <input
//               type="text"
//               id="questionText"  // Updated id for questionText
//               name="questionText" // Updated name for questionText
//               value={formData.questionText} // Binding questionText here
//               onChange={handleInputChange}
//               placeholder="Enter your question"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Answer Options</label>
//             {formData.answerOptions.map((option, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 placeholder={`Option ${index + 1}`}
//                 required
//               />
//             ))}
//           </div>
//           <button type="submit" className="add-btn">
//             Post Question
//           </button>
//         </form>
//         {error && <p className="error-message">{error}</p>}
//         {success && <p className="success-message">{success}</p>}
//       </div>
//     </div>
//   );
// };

// export default Question;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ManageQuestions.css';

// const Question = () => {
//   const [formData, setFormData] = useState({
//     questionText: '',
//     answerOptions: ['', '', '', ''], // Four answerOptions
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleOptionChange = (index, value) => {
//     const newAnswerOptions = [...formData.answerOptions];
//     newAnswerOptions[index] = value;
//     setFormData((prevState) => ({
//       ...prevState,
//       answerOptions: newAnswerOptions,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     // Check if all answer options are filled
//     const allAnswerOptionsFilled = formData.answerOptions.every(
//       (option) => option.trim() !== ''
//     );
//     if (!allAnswerOptionsFilled) {
//       setError('All answer options must be filled.');
//       return; // Prevent form submission
//     }

//     try {
//       console.log("Form Data:", formData); // Check the form data structure

//       const response = await fetch('/api/question/add?email=hridoy@gmai.com', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json', // Ensure correct Content-Type
//         },
//         body: JSON.stringify(formData), // Ensure this is properly stringified
//       });

//       if (response.ok) {
//         const data = await response.json(); // Get the posted question data
//         setSuccess('Question posted successfully!');
//         setFormData({
//           questionText: '', // Reset questionText field
//           answerOptions: ['', '', '', ''],
//         });

//         // Navigate to the newly created question view page using the question id
//         navigate(`/view-admin-question/${data.id}`);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Failed to post question.');
//         console.log(errorData);
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.log(err);
//     }
//   };

//   return (
//     <div className="manage-questions-container">
//       <h1 className="page-title">Manage Questions</h1>

//       <div className="question-form">
//         <h2>Add New Question</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="questionText">Question</label> {/* Updated label */}
//             <input
//               type="text"
//               id="questionText"  // Updated id for questionText
//               name="questionText" // Updated name for questionText
//               value={formData.questionText} // Binding questionText here
//               onChange={handleInputChange}
//               placeholder="Enter your question"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Answer Options</label>
//             {formData.answerOptions.map((option, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 placeholder={`Option ${index + 1}`}
//                 required
//               />
//             ))}
//           </div>
//           <button type="submit" className="add-btn">
//             Post Question
//           </button>
//         </form>
//         {error && <p className="error-message">{error}</p>}
//         {success && <p className="success-message">{success}</p>}
//       </div>
//     </div>
//   );
// };

// export default Question;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ManageQuestions.css';

// const Question = () => {
//   const [formData, setFormData] = useState({
//     questionText: '',
//     answerOptions: ['', '', '', ''], // Four answer options
//   });
//   const [email, setEmail] = useState(''); // New state for the email input
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   // Handles changes for questionText and answerOptions
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handles changes for each answer option
//   const handleOptionChange = (index, value) => {
//     const newAnswerOptions = [...formData.answerOptions];
//     newAnswerOptions[index] = value;
//     setFormData((prevState) => ({
//       ...prevState,
//       answerOptions: newAnswerOptions,
//     }));
//   };

//   // Handles the submission of the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     // Check if all answer options are filled
//     const allAnswerOptionsFilled = formData.answerOptions.every(
//       (option) => option.trim() !== ''
//     );

//     if (!allAnswerOptionsFilled) {
//       setError('All answer options must be filled.');
//       return; // Prevent form submission
//     }

//     if (!email.trim()) {
//       setError('Admin email is required.');
//       return;
//     }

//     try {
//       console.log('Form Data:', formData);
//       const response = await fetch(
//         `/api/question/add?email=${(email)}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setSuccess('Question posted successfully!');
//         setFormData({
//           questionText: '',
//           answerOptions: ['', '', '', ''],
//         });
//         setEmail(''); // Clear the email input

//         // Navigate to the question view page
//         navigate(`/view-admin-question`);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Failed to post question.');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.log(err);
//     }
//   };

//   return (
//     <div className="manage-questions-container">
//       <h1 className="page-title">Manage Questions</h1>

//       <div className="question-form">
//         <h2>Add New Question</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Email Input */}
//           <div className="form-group">
//             <label htmlFor="email">Admin Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter admin email"
//               required
//             />
//           </div>

//           {/* Question Input */}
//           <div className="form-group">
//             <label htmlFor="questionText">Question</label>
//             <input
//               type="text"
//               id="questionText"
//               name="questionText"
//               value={formData.questionText}
//               onChange={handleInputChange}
//               placeholder="Enter your question"
//               required
//             />
//           </div>

//           {/* Answer Options */}
//           <div className="form-group">
//             <label>Answer Options</label>
//             {formData.answerOptions.map((option, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={option}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//                 placeholder={`Option ${index + 1}`}
//                 required
//               />
//             ))}
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="add-btn">
//             Post Question
//           </button>
//         </form>
//         {error && <p className="error-message">{error}</p>}
//         {success && <p className="success-message">{success}</p>}
//       </div>
//     </div>
//   );
// };

// export default Question;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ManageQuestions.css';

// const Question = () => {
//   const [formData, setFormData] = useState({
//     questionText: '',
//     answerOptions: ['', '', '', ''], // Initialize with four empty answer options
//   });
//   const [email, setEmail] = useState(''); // State for admin email
//   const [error, setError] = useState(null); // Error message state
//   const [success, setSuccess] = useState(null); // Success message state
//   const navigate = useNavigate();

//   // Handle input change for questionText and email
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle changes for individual answer options
//   const handleOptionChange = (index, value) => {
//     const newAnswerOptions = [...formData.answerOptions];
//     newAnswerOptions[index] = value;
//     setFormData((prevState) => ({
//       ...prevState,
//       answerOptions: newAnswerOptions,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     // Validate that all answer options are filled
//     const allAnswerOptionsFilled = formData.answerOptions.every(
//       (option) => option.trim() !== ''
//     );

//     if (!allAnswerOptionsFilled) {
//       setError('All answer options must be filled.');
//       return;
//     }

//     if (!email.trim()) {
//       setError('Admin email is required.');
//       return;
//     }

//     try {
//       // Debug log for form data
//       console.log('Submitting Form Data:', formData);

//       const response = await fetch(
//         `/api/question/add?email=${encodeURIComponent(email)}`, // Ensure email is URL-encoded
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setSuccess('Question posted successfully!');
//         setFormData({
//           questionText: '',
//           answerOptions: ['', '', '', ''], // Reset form
//         });
//         setEmail(''); // Clear email field

//         // Navigate to the question management page
//         navigate('/view-admin-question');
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'Failed to post question.');
//       }
//     } catch (err) {
//       setError('Failed to connect to the server. Please try again later.');
//       console.error('Error posting question:', err);
//     }
//   };

//   return (
//     <div className="manage-questions-container">
//       <h1 className="page-title">Manage Questions</h1>

//       <div className="question-form">
//         <h2>Add New Question</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Admin Email Input */}
//           <div className="form-group">
//             <label htmlFor="email">Admin Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter admin email"
//               required
//             />
//           </div>

//           {/* Question Input */}
//           <div className="form-group">
//             <label htmlFor="questionText">Question</label>
//             <input
//               type="text"
//               id="questionText"
//               name="questionText"
//               value={formData.questionText}
//               onChange={handleInputChange}
//               placeholder="Enter your question"
//               required
//             />
//           </div>

//           {/* Answer Options */}
//           <div className="form-group">
//             <label>Answer Options</label>
//             {formData.answerOptions.map((option, index) => (
//               <div key={index} className="answer-option">
//                 <input
//                   type="text"
//                   value={option}
//                   onChange={(e) => handleOptionChange(index, e.target.value)}
//                   placeholder={`Option ${index + 1}`}
//                   required
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="add-btn">
//             Post Question
//           </button>
//         </form>

//         {/* Error or Success Messages */}
//         {error && <p className="error-message">{error}</p>}
//         {success && <p className="success-message">{success}</p>}
//       </div>
//     </div>
//   );
// };

// export default Question;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageQuestions.css';

const Question = () => {
  const [formData, setFormData] = useState({
    questionText: '',
    answerOptions: ['', '', '', ''], // Four empty answer options
  });
  const [email, setEmail] = useState(''); // Admin email input
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error message state
  const [success, setSuccess] = useState(null); // Success message state
  const navigate = useNavigate();

  // Handle input change for question text and admin email
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle changes for individual answer options
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.answerOptions];
    updatedOptions[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      answerOptions: updatedOptions,
    }));
  };

  // Validate form inputs
  const validateForm = () => {
    if (!email.trim()) {
      setError('Admin email is required.');
      return false;
    }
    if (!formData.questionText.trim()) {
      setError('Question text cannot be empty.');
      return false;
    }
    if (!formData.answerOptions.every((option) => option.trim() !== '')) {
      setError('All answer options must be filled.');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/question/add?email=${encodeURIComponent(email)}`, // Ensure email is URL-encoded
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setSuccess('Question posted successfully!');
        setFormData({ questionText: '', answerOptions: ['', '', '', ''] });
        setEmail('');
        navigate('/admin/admin-details-question'); // Navigate after successful submission
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to post the question.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manage-questions-container">
      <h1 className="page-title">Manage Questions</h1>

      <div className="question-form">
        <h2>Add New Question</h2>

        <form onSubmit={handleSubmit}>
          {/* Admin Email Input */}
          <div className="form-group">
            <label htmlFor="email">Admin Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />
          </div>

          {/* Question Input */}
          <div className="form-group">
            <label htmlFor="questionText">Question:</label>
            <input
              type="text"
              id="questionText"
              name="questionText"
              value={formData.questionText}
              onChange={handleInputChange}
              placeholder="Enter your question here"
              required
            />
          </div>

          {/* Answer Options */}
          <div className="form-group">
            <label>Answer Options:</label>
            {formData.answerOptions.map((option, index) => (
              <div key={index} className="answer-option">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? 'Posting...' : 'Post Question'}
          </button>
        </form>

        {/* Success and Error Messages */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default Question;



