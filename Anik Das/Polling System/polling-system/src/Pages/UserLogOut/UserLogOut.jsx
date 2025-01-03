// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const UserLogOut = ({ setLoginStatus }) => {
//   const [credentials, setCredentials] = useState({
//     userName: "",
//     password: "",
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials({ ...credentials, [name]: value });
//   };

//   const handleLogout = async () => {
//     if (!credentials.userName || !credentials.password) {
//       setError("Both username and password are required.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `/api/users/logout?userName=${credentials.userName}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ password: credentials.password }),
//         }
//       );

//       if (response.ok) {
//         alert("Logout successful");
//         setLoginStatus(false); // Update login status to false
//         navigate("/"); // Redirect to login page
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "Invalid credentials. Logout failed.");
//       }
//     } catch (err) {
//       setError(`Error: ${err.message || "Failed to connect to the server."}`);
//     }
//   };

//   return (
//     <div className="logout-container">
//       <h2>Logout</h2>
//       <div className="form-group">
//         <label htmlFor="userName">Username</label>
//         <input
//           type="text"
//           id="userName"
//           name="userName"
//           value={credentials.userName}
//           onChange={handleChange}
//           placeholder="Enter your username"
//           required
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={credentials.password}
//           onChange={handleChange}
//           placeholder="Enter your password"
//           required
//         />
//       </div>
//       {error && <p className="error-message">{error}</p>}
//       <button onClick={handleLogout} className="logout-btn">
//         Log Out
//       </button>
//     </div>
//   );
// };

// export default UserLogOut;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext/AuthProvider";


const UserLogOut = ({ setLoginStatus }) => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useUser();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  // Handle the logout logic
  const handleLogout = async () => {
    if (!credentials.userName || !credentials.password) {
      setError("Both username and password are required.");
      return;
    }

    try {
      const response = await fetch(
        `/api/users/logout?userName=${credentials.userName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: credentials.password }),
        }
      );

      if (response.ok) {
        alert("Logout successful");
        setLoginStatus(false); // Update login status to false
        navigate("/users/login"); // Redirect to the login page
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials. Logout failed.");
      }
    } catch (err) {
      setError(`Error: ${err.message || "Failed to connect to the server."}`);
    }
  };

  return (
    <div className="logout-container">
      <h2>Logout</h2>
      <div className="form-group">
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={credentials.userName}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter your password"
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

// Default props to catch missing setLoginStatus
UserLogOut.defaultProps = {
  setLoginStatus: () => {
    console.warn("setLoginStatus function is not defined!");
  },
};

export default UserLogOut;
