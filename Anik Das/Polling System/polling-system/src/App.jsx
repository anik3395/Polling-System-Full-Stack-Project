import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import { UserContext, useUser } from "./context/AuthContext/AuthProvider";

function App() {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  console.log('user', user);

  
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleLogout = async () => {
    const storedData = localStorage.getItem("loggedInUser");
  
    console.log("Stored data:", storedData);
  
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
  
        console.log("Parsed data:", parsedData);
  
        const { username } = parsedData;
  
        // Debugging: Check if userName or email is present
        console.log("username:", username);
      
  
        if (!username) {
          console.error("Username is missing.");
          return; // Exit if both are missing
        }
  
        const queryParam = username;
        const response = await fetch(`/api/logout?userName=${queryParam}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          console.log("Logout successful");
          localStorage.removeItem("loggedInUser");
          logout();
            navigate("/users/login"); // Redirect to login page
        } else {
          const errorData = await response.json();
          console.error("Logout failed:", errorData.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error parsing loggedInUser:", error);
      }
    } else {
      console.error("No loggedInUser found in localStorage");
    }
  };
  
  

  const handleLogin = () => {
    navigate("/users/login");
  };

  // useEffect(() => {
  //   const storedData = localStorage.getItem("loggedInUser");
  //   if (storedData) {
  //     setUserData(JSON.parse(storedData));
  //   }
  // }, []);

  return (
    <div>
      <nav>
        <a href="#" className="logo">
          Polling System
        </a>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {validateEmail(user.username) ? <li>
            <a href="/admin">Admin</a>
            <ul>
              <li>
                <a href="/admin/register">Admin Register</a>
              </li>
              <li>
                <a href="/admin/questions">Manage Questions</a>
              </li>
              <li>
                <a href="/admin/login">Admin Login</a>
              </li>
              <li>
                <a href="/admin/#">Admin Logout</a>
              </li>
            </ul>
          </li> : <li>
            <a href="/admin">Admin</a>
            <ul>
              <li>
                <a href="/admin/register">Admin Register</a>
              </li>
              <li>
                <a href="/admin/questions">Manage Questions</a>
              </li>
              <li>
                <a href="/admin/login">Admin Login</a>
              </li>
              {/* <li>
                <a href="/admin/#">Admin Logout</a>
              </li> */}
            </ul>
          </li> }
          

          <li>
            <a>Users</a>
            <ul>
              <li>
                <a href="/users/login">User Login</a>
              </li>
              <li>
                <a href="/users/register">Register User</a>
              </li>
            </ul>
          </li>

          <li>
            <a href="/questions">Questions</a>
            <ul>
              <li>
                <a href="/questions/view">View All Questions</a>
              </li>
              <li>
                <a href="/questions/answer">Post Answer</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/answers">Answers</a>
            <ul>
              <li>
                <a href="/answers/view">View Submitted Answers</a>
              </li>
            </ul>
          </li>
          <ul>
{ user?.username ? (
    <li>
      <a onClick={handleLogout}>Log Out</a>
    </li>
  ) : (
    <li>
      <a onClick={handleLogin}>
        {user?.email ? "Admin Login" : "Log In"}
      </a>
    </li>
  )}
</ul>

        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
