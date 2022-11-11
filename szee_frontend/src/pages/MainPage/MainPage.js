import React from 'react';

const MainPage = ({ user }) => {
  return(
    <>
      id: {user.id}<br />
      name: {user.name}<br />
      surname: {user.surname}<br />
    </>
  )
}

export default MainPage