import React from 'react';
import { Navigate } from 'react-router-dom';

const StartPage = ({ user }) => {

  return(
    user?.id ? <Navigate to="/main" replace />
    : <Navigate to="/login" replace />
  )
}

export default StartPage