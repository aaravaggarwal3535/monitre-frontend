import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./Components/Pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Pages/Login.jsx";
import Dashboard from "./Components/Pages/Dashboard.jsx";
import Signup from "./Components/Pages/Signup.jsx";
import PersonalDetails from "./Components/Pages/PersonalDetails.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import PersonalDetailsSumbit from "./Components/Pages/PersonalDetailsSumbit.jsx";
import Investment from "./Components/Pages/Investment.jsx";
import Savings from "./Components/Pages/Savings.jsx";
import NotFound from "./Components/Pages/notFound.jsx";
import YourGoals from "./Components/Pages/YourGoals.jsx";

// Router setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "https://monitre-frontend-q5mwcmp9d-aarav-aggarwals-projects.vercel.app/login", element: <Login /> },
      { path: "https://monitre-frontend-q5mwcmp9d-aarav-aggarwals-projects.vercel.app/savings", element: <Savings /> },
      { path: "https://monitre-frontend-q5mwcmp9d-aarav-aggarwals-projects.vercel.app/signup", element: <Signup /> },
      { path: "https://monitre-frontend-q5mwcmp9d-aarav-aggarwals-projects.vercel.app/dashboard", element: <Dashboard /> },
      { path: "https://monitre-frontend-q5mwcmp9d-aarav-aggarwals-projects.vercel.app/personal-details", element: <PersonalDetails /> },
      { path: "https://monitre-frontend-q5mwcmp9d-aarav-aggarwals-projects.vercel.app/personal-details-sumbit", element: <PersonalDetailsSumbit /> },
      { path: "https://monitre-frontend-q5mwcmp9d-aarav-aggarwals-projects.vercel.app/investment", element: <Investment /> },
      { path: "https://monitre-frontend-q5mwcmp9d-aarav-aggarwals-projects.vercel.app/goals", element: <YourGoals /> },
      { path: "https://monitre-frontend-q5mwcmp9d-aarav-aggarwals-projects.vercel.app/savings", element: <Savings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

// Rendering the app with routing
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
