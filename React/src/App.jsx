import React from 'react'
import Header from '/src/Header.jsx'
import ListPage from '/src/ListPage.jsx'
import Footer from '/src/Footer.jsx'
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
