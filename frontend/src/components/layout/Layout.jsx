import React, { useContext } from 'react'
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom'
import { UserContext } from '../context/UserContexProvider';
import Loading from '../loading/Loading';

function Layout() {
  const { ready } = useContext(UserContext);
  if (!ready) {
    return (
      <Loading />
    )
  }

  return (
    <div>
      <Navbar />
      <div className="pt-16 h-full">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout