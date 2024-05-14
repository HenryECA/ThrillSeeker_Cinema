import React from 'react'
import Header from './Header.jsx'
import ListPage from './ListPage.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Outlet/>
      <Footer />
    </>
  )
}

export default App
