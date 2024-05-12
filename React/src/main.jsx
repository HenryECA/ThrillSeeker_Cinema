import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ListPage from './ListPage.jsx'
import ContactInfo from './ContactInfo.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import './css/index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [{
    path: "",
    element: <ListPage/>,
  },{
    path: "contactInfo",
    element: <ContactInfo/>,
  }, 
  {
    path: "Register",
    element: <Register/>,
  }, 
  {
    path: "Login",
    element: <Login/>,
  },
  {
    path: "Profile",
    element: <Profile/>,
  }
],
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
