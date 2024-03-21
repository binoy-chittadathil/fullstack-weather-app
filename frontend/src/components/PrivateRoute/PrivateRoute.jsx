import React, { useContext } from 'react'
import { UserContext } from '../context/UserContexProvider';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { user, ready } = useContext(UserContext);

  if (ready && user) {
    return children
  };

  return (
    <Navigate to={'/signup'}></Navigate>
  )
}

export default PrivateRoute