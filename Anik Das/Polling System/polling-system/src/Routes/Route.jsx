import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Admin from "../Pages/Admin/Admin";
import Users from "../Pages/Users/Users";
import Question from "../Pages/Questions/Questions";
import Adminlogin from "../Pages/Adminlogin/Adminlogin";
import Userlogin from "../Pages/Userlogin/Userlogin";
import VoteQuestion from "../Pages/VoteQuestion/VoteQuestion";
import ViewAdminQuestion from "../Pages/ViewAdminQuestion/ViewAdminQuestion";
import ViewAllQuestions from "../Pages/ViewAllQuestions/ViewAllQuestions";
import ViewAnswers from "../Pages/ViewAnswers/ViewAnswers";
import PostAnswer from "../Pages/PostAnswer/PostAnswer";
import YourComponent from "../Pages/YourComponent/YourComponent";
import SignUpUser from "../Pages/SignUpUser/SignUpUser";
import UserLogOut from "../Pages/UserLogOut/UserLogOut";
import ViewResult from "../Pages/ViewResults/ViewResults";
import ViewResults from "../Pages/ViewResults/ViewResults";
import VotingDetails from "../Pages/VotingDetails/VotingDetails";
import SpecificAdmin from "../Pages/SpecificAdmin/SpecificAdmin";
import AdminLogout from "../Pages/AdminLogout/AdminLogout";
import AdminQuestionDetails from "../Pages/AdminQuestionDetails/AdminQuestionDetails";

// Define the routes
export const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: '/admin/register',
        element: <Admin />
      },
      {
        path:'/users/register',
        element:<Users></Users>
      },
      {
        path:'/admin/questions',
        element:<Question></Question>
      },
      {
        path:'/admin/login',
        element:<Adminlogin></Adminlogin>
      },
      {
        path:'/admin/#',
        element:<AdminLogout></AdminLogout>
      },
      {
        path:'/users/login',
        element:<Userlogin></Userlogin>
      },
      {
        path:'/manage-question',
        element:<Question></Question>
      },
      // {
      //   path:'/view-admin-question/:id',
      //   element:<ViewAdminQuestion></ViewAdminQuestion>
      // },
      {
        path:'/view-admin-question',
        element:<VoteQuestion></VoteQuestion>
      },
      {
        path:'/questions/view',
        element:<ViewAllQuestions></ViewAllQuestions>
      },
      {
        path: "/answers/view",
        element: <ViewAnswers></ViewAnswers>
      },
      {
        path: "/questions/answer",
        element: <PostAnswer></PostAnswer>
      },
      {
        path: "/startpolling",
        element: <YourComponent></YourComponent>
      },
      {
        path: "/sign-up/user",
        element: <SignUpUser></SignUpUser>
      },
      {
        path: "/users/logged-out",
        element: <UserLogOut></UserLogOut>
      },
      {
        path: "/admin/view-result",
        element: <ViewResults></ViewResults>
      },
      {
        path: "/admin/voting-details",
        element: <VotingDetails></VotingDetails>
      },
      {
        path: "/admin/admin-details-question",
        element: <SpecificAdmin></SpecificAdmin>
      },
      {
        path: "/admin/questions-answer-details",
        element: <AdminQuestionDetails></AdminQuestionDetails>
      }
      
      

      
      
    ],
  },
]);
