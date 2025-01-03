
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Userlogin.css";
import { useUser } from "../../context/AuthContext/AuthProvider";
import { useAuth } from "../../hooks/useAuth";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    username: "", // Use userName to match form data key
    password: "",
  });
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value correctly
    setFormData({ ...formData, [name]: value }); // Update the correct state key
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before submitting

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Login Response:", response);

      if (response.ok) {
        alert("User login successfully");
        console.log(formData)
        login(formData)
        navigate("/view-admin-question");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid username or password.");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>User Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username" // Match the name in state with the input field
              value={formData.username} // Use formData.userName
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error message */}
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
