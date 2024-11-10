import React from 'react'
import Header from '../header'
import Footer from '../footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
        <Header/>

        <div className='main-content' style={{
          padding: '10px',
          minHeight: '60vh',
        }}>
          <Outlet />
        </div>

        <Footer/>
    </div>
  )
}

export default Layout