// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle email input change
  const handleChange = (e) => {
    setAdminEmail(e.target.value);
  };

  // Handle logout logic
  const handleLogout = async () => {
    if (!adminEmail) {
      setError("Admin email is required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/admin/logout?email=${encodeURIComponent(
          adminEmail
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Logout successful");
        navigate("/admin/logout-success"); // Redirect to confirmation page
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to log out. Please try again.");
      }
    } catch (err) {
      setError(`Error: ${err.message || "Failed to connect to the server."}`);
    }
  };

  return (
    <div className="admin-logout-container">
      <h2>Admin Logout</h2>
      <div className="form-group">
        <label htmlFor="adminEmail">Admin Email</label>
        <input
          type="email"
          id="adminEmail"
          name="adminEmail"
          value={adminEmail}
          onChange={handleChange}
          placeholder="Enter your admin email"
          required
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleLogout} className="logout-btn">
        Log Out
      </button>
    </div>
  );
};

export default AdminLogout;

