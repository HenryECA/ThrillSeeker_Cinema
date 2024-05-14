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
import BestLastYearPage from './BestLastYearPage.jsx'
import LogInPage from './LogInPage.jsx'
import RegistrationPage from './RegistrationPage.jsx'
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
    path: "lastYearPage",
    element: <BestLastYearPage/>,
  },

  // Meter elementos de login de Enrique
  {
    path: "login",
    element: <LogInPage/>,
  },

  {
    path: "registration",
    element: <RegistrationPage/>,
  },


],
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
