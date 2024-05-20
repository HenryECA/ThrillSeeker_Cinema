//import React from 'react'
//import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
//import './index.css'

//ReactDOM.createRoot(document.getElementById('root')).render(
// <React.StrictMode>
//    <App />
    //  </React.StrictMode>,
//)


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ListPage from './ListPage.jsx'
import ContactInfo from './ContactInfo.jsx'
import RatingPage from './RatingPage.jsx'
import BestPerYearPage from './BestPerYearPage.jsx'
import Login from './LoginPage.jsx'
import RegistrationPage from './RegistrationPage.jsx'
import Profile from './ProfilePage.jsx'
import AdminManager from './AdminPage.jsx'

import './css/index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [
    {
    path: "",
    element: <ListPage/>,},
    {
    path: "contactInfo",
    element: <ContactInfo/>,
  },
  {
    path: "ratingPage",
    element: <RatingPage/>,
  },
  {
    path: "bestYearPage",
    element: <BestPerYearPage/>,
  },

  // Meter elementos de login de Enrique
  {
    path: "login",
    element: <Login/>,
  },

  {
    path: "registration",
    element: <RegistrationPage/>,
  },

  {
    path: "profile",
    element: <Profile/>,
  },
  {
    path: "admin", 
    element: <AdminManager/>,
  }


],
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
