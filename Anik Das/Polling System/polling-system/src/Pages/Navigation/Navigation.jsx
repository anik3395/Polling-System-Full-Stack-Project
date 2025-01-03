import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Initial login status
  const userName = "MijanBhai"; // Example logged-in username

  return (
    <ul>
      {isLoggedIn ? (
        <>
          <li>
            <Link to="/users/dashboard">Dashboard</Link>
          </li>
          <Logout userName={userName} setLoginStatus={setIsLoggedIn} />
        </>
      ) : (
        <li>
          <Link to="/users/login">Login</Link>
        </li>
      )}
    </ul>
  );
};

export default Navigation;
