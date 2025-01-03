import React from "react";

const Home = () => {
  return (
    <div className="homepage">
      <div className="welcome-section">
        <h1>Welcome to the Polling System</h1>
        <p>
          Participate in polls and express your opinion on various topics. Your
          vote matters!
        </p>
        <a href="/startpolling" className="btn-start-polling" >
          Start Polling
        </a>
      </div>

      <div className="features-section">
        <h2>Features</h2>
        <div className="features">
          <div className="feature">
            <h3> <a href="/admin/admin-details-question">Specific Admin's Posted Question</a></h3>
            <p>
              Create and participate in polls effortlessly. Your feedback shapes
              decisions.
            </p>
          </div>

          <div className="feature">
            <h3> <a href="/admin/questions-answer-details">Voting Details Of Specific Admin's Question</a></h3>
            <p>
              Every vote is secure, ensuring integrity in the
              polling process.
            </p>
          </div>
          
          <div className="feature">
            <h3> <a href="/admin/voting-details">Voting Details Of Specific User</a></h3>
            <p>
              Every vote is secure, ensuring integrity in the
              polling process.
            </p>
          </div>
          <div className="feature">
            <h3> <a href="/admin/view-result">View Results</a></h3>
            <p>
              After voting, check the results in real-time and see how others
              have voted.
            </p>
          </div>
        </div>
      </div>

      <div className="call-to-action">
        <h2>Join the Community</h2>
        <p>
          Sign up to start voting and contributing your opinions to meaningful
          polls.
        </p>
        <a href="/sign-up/user" className="btn-signup">
          Sign Up Now
        </a>
      </div>
    </div>
  );
};

export default Home;
