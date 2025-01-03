import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]: value,});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    console.log(" Admin Registration Payload:", formData);

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });


      console.log("data...........!", response);

      if (response.ok) {
        alert("Admin registered successfully");
        navigate("/admin/login"); 
      } else {
        setError(response || "An error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.", err);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Register Page</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
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
        <button type="submit" className="register-btn">
          Register
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Admin;
